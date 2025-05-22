/*
  # Add strategy ETFs and update schema

  1. New Data
    - Add core strategy ETFs (SPY, VXUS, TLT)
    
  2. Schema Updates
    - Add is_core_strategy boolean to etfs table
    - Add index on is_core_strategy column
*/

-- Add is_core_strategy column
ALTER TABLE etfs 
ADD COLUMN is_core_strategy boolean DEFAULT false;

CREATE INDEX idx_etfs_core_strategy ON etfs(is_core_strategy);

-- Insert core strategy ETFs if they don't exist
INSERT INTO etfs (symbol, name, sector, is_core_strategy)
VALUES 
  ('SPY', 'SPDR S&P 500 ETF Trust', 'US Large Cap', true),
  ('VXUS', 'Vanguard Total International Stock ETF', 'International', true),
  ('TLT', 'iShares 20+ Year Treasury Bond ETF', 'Government Bonds', true)
ON CONFLICT (symbol) 
DO UPDATE SET 
  is_core_strategy = true,
  name = EXCLUDED.name,
  sector = EXCLUDED.sector;