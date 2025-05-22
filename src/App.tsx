import React from 'react';
import Header from './components/Header';
import RiskStatusCard from './components/RiskStatusCard';
import TopSectors from './components/TopSectors';
import ETFTable from './components/ETFTable';
import PerformanceSummary from './components/PerformanceSummary';
import { calculateTopSectors, getTopPerformingETFs } from './utils/momentumCalculations';
import { useETFs } from './hooks/useETFs';
import { useRiskStatus } from './hooks/useRiskStatus';
import { SectorPerformance } from './types';

function App() {
  const { etfs, loading: etfsLoading, error: etfsError } = useETFs();
  const { riskStatus, loading: riskLoading, error: riskError } = useRiskStatus();
  
  if (etfsLoading || riskLoading) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-indigo-900">Loading...</div>
      </div>
    );
  }

  if (etfsError || riskError || !riskStatus) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">
          {etfsError || riskError || 'Failed to load data'}
        </div>
      </div>
    );
  }

  const topSectors = calculateTopSectors(etfs, 'oneYear');
  const topETFs = getTopPerformingETFs(etfs, 'oneYear');
  
  return (
    <div className="min-h-screen bg-indigo-50">
      <Header riskStatus={riskStatus} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <RiskStatusCard riskStatus={riskStatus} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <TopSectors sectors={topSectors} />
          </div>
          <div className="lg:col-span-2">
            <ETFTable etfs={etfs} />
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performers by Composite Momentum</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topETFs.map(etf => (
              <PerformanceSummary key={etf.id} etf={etf} />
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-indigo-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Dual Momentum Investing Strategy Dashboard • {new Date().getFullYear()}
          </p>
          <p className="text-xs text-indigo-300 mt-2">
            This app is for informational purposes only. Not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;