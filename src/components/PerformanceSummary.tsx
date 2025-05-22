import React from 'react';
import { ETF } from '../types';
import ReturnPercentage from './ReturnPercentage';

interface PerformanceSummaryProps {
  etf: ETF;
}

const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({ etf }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-indigo-700 mb-1">{etf.symbol}</h3>
        <p className="text-sm text-gray-600 line-clamp-1 mb-2">{etf.name}</p>
        <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
          {etf.sector}
        </div>
      </div>
      
      <div className="flex-grow space-y-3">
        <ReturnPercentage 
          value={etf.returns.oneYear} 
          label="1 Year" 
          size="md"
        />
        <ReturnPercentage 
          value={etf.returns.nineMonth} 
          label="9 Month" 
          size="md"
        />
        <ReturnPercentage 
          value={etf.returns.sixMonth} 
          label="6 Month" 
          size="md"
        />
        <ReturnPercentage 
          value={etf.returns.threeMonth} 
          label="3 Month" 
          size="md"
        />
      </div>
    </div>
  );
}

export default PerformanceSummary;