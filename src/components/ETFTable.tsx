import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { ETF } from '../types';

interface ETFTableProps {
  etfs: ETF[];
}

const ETFTable: React.FC<ETFTableProps> = ({ etfs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof ETF | 'returns'>('returns');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedPeriod, setSelectedPeriod] = useState<'oneYear' | 'nineMonth' | 'sixMonth' | 'threeMonth' | 'lastMonth'>('oneYear');

  const handleSort = (field: keyof ETF | 'returns') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredEtfs = etfs.filter(etf => 
    etf.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    etf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    etf.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEtfs = [...filteredEtfs].sort((a, b) => {
    if (sortField === 'returns') {
      const aValue = a.returns?.[selectedPeriod] ?? 0;
      const bValue = b.returns?.[selectedPeriod] ?? 0;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      const aValue = String(a[sortField]).toLowerCase();
      const bValue = String(b[sortField]).toLowerCase();
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  });

  const periodText = {
    oneYear: '1 Year',
    nineMonth: '9 Month',
    sixMonth: '6 Month',
    threeMonth: '3 Month',
    lastMonth: 'Last Month'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-xl font-bold text-gray-800">ETF Performance</h2>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search ETFs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setSelectedPeriod('lastMonth')}
                className={`px-3 py-2 text-sm font-medium rounded-l-md ${
                  selectedPeriod === 'lastMonth'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
              >
                1M
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod('threeMonth')}
                className={`px-3 py-2 text-sm font-medium ${
                  selectedPeriod === 'threeMonth'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-300`}
              >
                3M
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod('sixMonth')}
                className={`px-3 py-2 text-sm font-medium ${
                  selectedPeriod === 'sixMonth'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-300`}
              >
                6M
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod('nineMonth')}
                className={`px-3 py-2 text-sm font-medium ${
                  selectedPeriod === 'nineMonth'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-300`}
              >
                9M
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod('oneYear')}
                className={`px-3 py-2 text-sm font-medium rounded-r-md ${
                  selectedPeriod === 'oneYear'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
              >
                1Y
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('symbol')}
              >
                <div className="flex items-center">
                  Symbol
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('sector')}
              >
                <div className="flex items-center">
                  Sector
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('returns')}
              >
                <div className="flex items-center">
                  {periodText[selectedPeriod]} Return
                  {sortField === 'returns' && (
                    sortDirection === 'asc' 
                      ? <ChevronUp className="ml-1 h-4 w-4" /> 
                      : <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedEtfs.map((etf) => {
              const returnValue = etf.returns?.[selectedPeriod] ?? 0;
              return (
                <tr key={etf.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-700">
                    {etf.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {etf.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {etf.sector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full font-medium ${
                      returnValue > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {returnValue > 0 ? '+' : ''}
                      {returnValue.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ETFTable;