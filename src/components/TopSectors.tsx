import React from 'react';
import { TrendingUp, Layers } from 'lucide-react';
import { SectorPerformance } from '../types';

interface TopSectorsProps {
  sectors: SectorPerformance[];
}

const TopSectors: React.FC<TopSectorsProps> = ({ sectors }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Top Performing Sectors</h2>
        <div className="flex items-center text-sm text-indigo-700 font-medium">
          <Layers className="h-4 w-4 mr-1" />
          <span>Composite Momentum</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {sectors.map((sector, index) => (
          <div 
            key={sector.sector} 
            className="bg-indigo-50 rounded-lg p-4 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full h-6 w-6 flex items-center justify-center mr-2">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-gray-800">{sector.sector}</h3>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                <span className="font-bold text-green-600">
                  {sector.avgReturn.toFixed(2)}%
                </span>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <span className="font-medium">Composite Score:</span> Average of 3M, 6M, 9M, and 12M returns (excluding last month)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSectors;