import { ETF, RiskStatus } from '../types';

// Mock risk status data
export const mockRiskStatus: RiskStatus = {
  status: 'on',
  message: 'Market momentum is positive',
  lastUpdated: new Date().toISOString()
};

// Mock ETF data
export const mockBenchmark: ETF = {
  id: 'benchmark',
  symbol: 'VOO',
  name: 'Vanguard S&P 500 ETF',
  sector: 'US Large Cap',
  returns: {
    oneYear: 24.5,
    nineMonth: 18.4,
    sixMonth: 12.3,
    threeMonth: 5.7,
    lastMonth: 1.2,
  },
};

export const mockBond: ETF = {
  id: 'bond',
  symbol: 'BND',
  name: 'Vanguard Total Bond Market ETF',
  sector: 'Bonds',
  returns: {
    oneYear: -2.1,
    nineMonth: -1.8,
    sixMonth: -1.2,
    threeMonth: -0.8,
    lastMonth: -0.3,
  },
};

export const mockETFs: ETF[] = [
  {
    id: '1',
    symbol: 'VGT',
    name: 'Vanguard Information Technology ETF',
    sector: 'Information Technology',
    returns: {
      oneYear: 35.2,
      nineMonth: 26.4,
      sixMonth: 17.8,
      threeMonth: 8.4,
      lastMonth: 2.1,
    },
  },
  {
    id: '2',
    symbol: 'VHT',
    name: 'Vanguard Health Care ETF',
    sector: 'Health Care',
    returns: {
      oneYear: 12.8,
      nineMonth: 9.6,
      sixMonth: 6.4,
      threeMonth: 3.2,
      lastMonth: 0.8,
    },
  },
  {
    id: '3',
    symbol: 'VFH',
    name: 'Vanguard Financials ETF',
    sector: 'Financials',
    returns: {
      oneYear: 18.9,
      nineMonth: 14.2,
      sixMonth: 9.5,
      threeMonth: 4.2,
      lastMonth: 1.1,
    },
  },
  {
    id: '4',
    symbol: 'VCR',
    name: 'Vanguard Consumer Discretionary ETF',
    sector: 'Consumer Discretionary',
    returns: {
      oneYear: 22.3,
      nineMonth: 16.7,
      sixMonth: 11.5,
      threeMonth: 5.8,
      lastMonth: 1.5,
    },
  },
  {
    id: '5',
    symbol: 'VDE',
    name: 'Vanguard Energy ETF',
    sector: 'Energy',
    returns: {
      oneYear: 28.4,
      nineMonth: 21.3,
      sixMonth: 14.7,
      threeMonth: 6.9,
      lastMonth: 1.8,
    },
  },
];