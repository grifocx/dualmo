import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ETF } from '../types';

export function useETFs() {
  const [etfs, setETFs] = useState<ETF[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchETFs() {
      try {
        const { data: etfsData, error: etfsError } = await supabase
          .from('etfs')
          .select(`
            id,
            symbol,
            name,
            sector,
            returns!inner (
              one_year,
              nine_month,
              six_month,
              three_month,
              last_month,
              date
            )
          `)
          .order('date', { foreignTable: 'returns', ascending: false });

        if (etfsError) throw etfsError;

        const formattedETFs: ETF[] = etfsData.map(etf => ({
          id: etf.id,
          symbol: etf.symbol,
          name: etf.name,
          sector: etf.sector,
          returns: {
            oneYear: etf.returns[0].one_year,
            nineMonth: etf.returns[0].nine_month,
            sixMonth: etf.returns[0].six_month,
            threeMonth: etf.returns[0].three_month,
            lastMonth: etf.returns[0].last_month,
          }
        }));

        setETFs(formattedETFs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch ETFs');
      } finally {
        setLoading(false);
      }
    }

    fetchETFs();
  }, []);

  return { etfs, loading, error };
}