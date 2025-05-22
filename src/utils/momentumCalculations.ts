import { ETF, SectorPerformance } from '../types';

/**
 * Calculate accelerating momentum score
 * Weights: 1-month (40%), 3-month (35%), 6-month (25%)
 */
export const calculateMomentumScore = (etf: ETF): number => {
  const { lastMonth, threeMonth, sixMonth } = etf.returns;
  
  return (
    (lastMonth * 0.40) +  // Higher weight on recent momentum
    (threeMonth * 0.35) + 
    (sixMonth * 0.25)
  );
};

/**
 * Get the appropriate asset based on the Accelerating Dual Momentum strategy
 */
export const getStrategyAllocation = (etfs: ETF[]): ETF[] => {
  // Find our three key ETFs
  const spy = etfs.find(etf => etf.symbol === 'SPY'); // S&P 500
  const vxus = etfs.find(etf => etf.symbol === 'VXUS'); // All-World ex-US
  const tlt = etfs.find(etf => etf.symbol === 'TLT'); // Long-term Treasury

  if (!spy || !vxus || !tlt) {
    throw new Error('Required ETFs not found in universe');
  }

  const spyScore = calculateMomentumScore(spy);
  const vxusScore = calculateMomentumScore(vxus);

  // If either stock index has positive momentum, invest in the stronger one
  if (spyScore > 0 || vxusScore > 0) {
    return [spyScore > vxusScore ? spy : vxus];
  }

  // If both stock indices have negative momentum, invest in treasuries
  return [tlt];
};

/**
 * Calculate top performing sectors based on accelerating momentum
 */
export const calculateTopSectors = (
  etfs: ETF[],
  excludeSymbols: string[] = ['SPY', 'VXUS', 'TLT']
): SectorPerformance[] => {
  // Filter out our strategy ETFs
  const sectorETFs = etfs.filter(etf => !excludeSymbols.includes(etf.symbol));

  // Group ETFs by sector
  const sectorMap = new Map<string, ETF[]>();
  
  sectorETFs.forEach(etf => {
    if (!sectorMap.has(etf.sector)) {
      sectorMap.set(etf.sector, []);
    }
    sectorMap.get(etf.sector)?.push(etf);
  });
  
  // Calculate momentum scores for each sector
  const sectorPerformances: SectorPerformance[] = [];
  
  sectorMap.forEach((sectorEtfs, sector) => {
    const totalScore = sectorEtfs.reduce(
      (sum, etf) => sum + calculateMomentumScore(etf),
      0
    );
    const avgScore = totalScore / sectorEtfs.length;
    
    sectorPerformances.push({
      sector,
      avgReturn: avgScore,
      etfs: sectorEtfs,
    });
  });
  
  // Sort by momentum score (descending)
  return sectorPerformances.sort((a, b) => b.avgReturn - a.avgReturn);
};

/**
 * Get the top performing ETFs based on accelerating momentum
 */
export const getTopPerformingETFs = (
  etfs: ETF[],
  count: number = 4,
  excludeSymbols: string[] = ['SPY', 'VXUS', 'TLT']
): ETF[] => {
  // Filter out strategy ETFs and sort by momentum score
  return etfs
    .filter(etf => !excludeSymbols.includes(etf.symbol))
    .sort((a, b) => calculateMomentumScore(b) - calculateMomentumScore(a))
    .slice(0, count);
};