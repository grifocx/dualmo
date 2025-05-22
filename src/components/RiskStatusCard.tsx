import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { RiskStatus } from '../types';

interface RiskStatusCardProps {
  riskStatus: RiskStatus;
}

const RiskStatusCard: React.FC<RiskStatusCardProps> = ({ riskStatus }) => {
  return (
    <div className={`rounded-xl shadow-lg p-6 ${
      riskStatus.status === 'on' 
        ? 'bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500' 
        : 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500'
    } transition-all duration-500`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Market Status</h2>
        {riskStatus.status === 'on' ? (
          <TrendingUp className="h-8 w-8 text-green-600" />
        ) : (
          <TrendingDown className="h-8 w-8 text-red-600" />
        )}
      </div>
      
      <div className="flex items-center mb-4">
        <div className={`text-2xl font-bold mr-2 ${
          riskStatus.status === 'on' ? 'text-green-600' : 'text-red-600'
        }`}>
          {riskStatus.status === 'on' ? 'RISK-ON' : 'RISK-OFF'}
        </div>
        <div className={`text-sm px-2 py-1 rounded-full ${
          riskStatus.status === 'on' 
            ? 'bg-green-200 text-green-800' 
            : 'bg-red-200 text-red-800'
        }`}>
          {riskStatus.status === 'on' ? 'Bullish' : 'Bearish'}
        </div>
      </div>
      
      <p className="text-gray-700 mb-3">{riskStatus.message}</p>
      
      <div className="flex items-center text-xs text-gray-500">
        <AlertCircle className="h-3 w-3 mr-1" />
        <span>Last updated: {new Date(riskStatus.lastUpdated).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default RiskStatusCard;