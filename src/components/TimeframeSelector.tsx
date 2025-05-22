import React from 'react';
import { CalendarClock } from 'lucide-react';

interface TimeframeSelectorProps {
  selectedPeriod: 'oneYear' | 'sixMonth' | 'threeMonth';
  onPeriodChange: (period: 'oneYear' | 'sixMonth' | 'threeMonth') => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <CalendarClock className="h-5 w-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-bold text-gray-800">Select Timeframe</h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onPeriodChange('threeMonth')}
          className={`py-3 px-4 rounded-lg transition-all duration-200 ${
            selectedPeriod === 'threeMonth'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="block text-sm font-semibold">3 Months</span>
          <span className={`text-xs ${selectedPeriod === 'threeMonth' ? 'text-indigo-100' : 'text-gray-500'}`}>
            Short-term
          </span>
        </button>

        <button
          onClick={() => onPeriodChange('sixMonth')}
          className={`py-3 px-4 rounded-lg transition-all duration-200 ${
            selectedPeriod === 'sixMonth'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="block text-sm font-semibold">6 Months</span>
          <span className={`text-xs ${selectedPeriod === 'sixMonth' ? 'text-indigo-100' : 'text-gray-500'}`}>
            Medium-term
          </span>
        </button>

        <button
          onClick={() => onPeriodChange('oneYear')}
          className={`py-3 px-4 rounded-lg transition-all duration-200 ${
            selectedPeriod === 'oneYear'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="block text-sm font-semibold">1 Year</span>
          <span className={`text-xs ${selectedPeriod === 'oneYear' ? 'text-indigo-100' : 'text-gray-500'}`}>
            Long-term
          </span>
        </button>
      </div>
    </div>
  );
};

export default TimeframeSelector;