import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const ALPHA_VANTAGE_API_KEY = Deno.env.get('ALPHA_VANTAGE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// Validate all required environment variables
const requiredEnvVars = {
  ALPHA_VANTAGE_API_KEY,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
};

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

async function fetchETFData(symbol: string) {
  console.log(`Fetching data for ${symbol}...`);
  
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Dual Momentum ETF Tracker/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Alpha Vantage API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(`Alpha Vantage error: ${data['Error Message']}`);
    }
    
    if (!data['Monthly Time Series']) {
      throw new Error(`No monthly time series data available for ${symbol}`);
    }
    
    return data['Monthly Time Series'];
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    throw error;
  }
}

async function updateETFData(req: Request) {
  console.log('Starting ETF data update...');
  
  try {
    // Get ETFs that haven't been updated in the last 24 hours
    const { data: etfs, error: etfError } = await supabase
      .from('etfs')
      .select('*')
      .filter('last_updated', 'lt', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('last_updated', { ascending: true })
      .limit(5); // Process 5 ETFs at a time to avoid timeouts

    if (etfError) {
      console.error('Error fetching ETFs:', etfError);
      throw etfError;
    }

    if (!etfs?.length) {
      return new Response(
        JSON.stringify({ 
          message: 'No ETFs need updating', 
          timestamp: new Date().toISOString() 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${etfs.length} ETFs...`);

    const updates = await Promise.all(etfs.map(async (etf) => {
      try {
        console.log(`Processing ${etf.symbol}...`);
        const priceData = await fetchETFData(etf.symbol);
        const dates = Object.keys(priceData).sort().reverse();
        
        // Store price history
        const pricePromises = dates.slice(0, 13).map(date => 
          supabase
            .from('price_history')
            .upsert({
              etf_id: etf.id,
              date,
              price: parseFloat(priceData[date]['4. close'])
            }, {
              onConflict: 'etf_id,date'
            })
        );
        
        await Promise.all(pricePromises);

        // Calculate returns
        const currentPrice = parseFloat(priceData[dates[0]]['4. close']);
        const returns = {
          etf_id: etf.id,
          date: dates[0],
          last_month: ((currentPrice / parseFloat(priceData[dates[1]]['4. close'])) - 1) * 100,
          three_month: ((currentPrice / parseFloat(priceData[dates[3]]['4. close'])) - 1) * 100,
          six_month: ((currentPrice / parseFloat(priceData[dates[6]]['4. close'])) - 1) * 100,
          nine_month: ((currentPrice / parseFloat(priceData[dates[9]]['4. close'])) - 1) * 100,
          one_year: ((currentPrice / parseFloat(priceData[dates[12]]['4. close'])) - 1) * 100
        };

        await supabase
          .from('returns')
          .upsert(returns, {
            onConflict: 'etf_id,date'
          });

        // Update last_updated timestamp
        await supabase
          .from('etfs')
          .update({ last_updated: new Date().toISOString() })
          .eq('id', etf.id);

        console.log(`Successfully updated ${etf.symbol}`);
        return { symbol: etf.symbol, status: 'success' };
      } catch (error) {
        console.error(`Error processing ${etf.symbol}:`, error);
        return { 
          symbol: etf.symbol, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        };
      }
    }));

    // Update risk status based on VOO's return
    console.log('Updating risk status...');
    
    const { data: vooData } = await supabase
      .from('etfs')
      .select('id')
      .eq('symbol', 'VOO')
      .single();

    if (vooData) {
      const { data: vooReturn } = await supabase
        .from('returns')
        .select('one_year')
        .eq('etf_id', vooData.id)
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (vooReturn) {
        await supabase
          .from('risk_status')
          .upsert({
            date: new Date().toISOString().split('T')[0],
            status: vooReturn.one_year > 0 ? 'on' : 'off',
            message: vooReturn.one_year > 0 
              ? 'Market momentum is positive. Allocate 25% each to top 4 sector ETFs.'
              : 'Market momentum is negative. Allocate 100% to BND (Total Bond Market ETF).'
          }, {
            onConflict: 'date'
          });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        updates,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  if (req.method === 'POST') {
    return await updateETFData(req);
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { 
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
});