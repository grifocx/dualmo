export interface ETF {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  is_core_strategy?: boolean;
  returns: {
    oneYear: number;
    nineMonth: number;
    sixMonth: number;
    threeMonth: number;
    lastMonth: number;
  };
}

export interface RiskStatus {
  status: 'on' | 'off';
  message: string;
  lastUpdated: string;
}

export interface SectorPerformance {
  sector: string;
  avgReturn: number;
  etfs: ETF[];
}

export interface StrategyAllocation {
  etf: ETF;
  weight: number;
}