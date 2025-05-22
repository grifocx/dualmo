import React, { useState } from 'react';
import { BarChart3, ArrowDownRight, ArrowUpRight, Calendar, RefreshCw } from 'lucide-react';
import { RiskStatus } from '../types';

interface HeaderProps {
  riskStatus: RiskStatus;
}

const Header: React.FC<HeaderProps> = ({ riskStatus }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setDebugInfo('Starting refresh...');

      // Ensure URL doesn't have trailing slash
      const baseUrl = import.meta.env.VITE_SUPABASE_URL.replace(/\/$/, '');
      const url = `${baseUrl}/functions/v1/update-etf-data`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        // Add a timeout to prevent hanging requests
        signal: AbortSignal.timeout(30000)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      setDebugInfo(`Refresh completed successfully. Updated ${data.updates?.length || 0} ETFs.`);
      
      // Wait a moment to show the success message
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Force reload the page to get fresh data
      window.location.reload();
    } catch (error) {
      console.error('Refresh error:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setDebugInfo('Network error: Unable to reach the server. Please check your connection and try again.');
      } else {
        setDebugInfo(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setRefreshing(false);
    }
  };

  // Get the last day of the previous month
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  const formattedDate = lastMonth.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-indigo-950 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <BarChart3 className="h-8 w-8 mr-3 text-amber-400" />
          <h1 className="text-2xl font-bold">Dual Momentum</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-col items-center sm:items-end">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
            {debugInfo && (
              <div className="text-xs text-indigo-300 mt-1">
                {debugInfo}
              </div>
            )}
          </div>

          <div className="flex items-center text-sm bg-indigo-900/50 px-3 py-2 rounded-lg">
            <Calendar className="h-4 w-4 mr-2 text-indigo-300" />
            <span className="text-indigo-200">Data through: {formattedDate}</span>
          </div>
          
          <div className="flex items-center space-x-2 bg-indigo-900 px-4 py-2 rounded-lg">
            <div className="mr-2">
              <span className="text-sm font-medium mr-2">Risk Status:</span>
              <span className={`inline-flex items-center font-bold ${
                riskStatus.status === 'on' 
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}>
                {riskStatus.status === 'on' ? (
                  <>
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    RISK-ON
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    RISK-OFF
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;