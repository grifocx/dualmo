/*
  # Create ETF and price history tables

  1. New Tables
    - `etfs`: Stores ETF metadata
      - `id` (uuid, primary key)
      - `symbol` (text, unique)
      - `name` (text)
      - `sector` (text)
      - `created_at` (timestamp)
    
    - `price_history`: Stores monthly price data
      - `id` (uuid, primary key)
      - `etf_id` (uuid, foreign key)
      - `date` (date)
      - `price` (decimal)
      - `created_at` (timestamp)
    
    - `returns`: Stores calculated returns
      - `id` (uuid, primary key)
      - `etf_id` (uuid, foreign key)
      - `date` (date)
      - `one_year` (decimal)
      - `nine_month` (decimal)
      - `six_month` (decimal)
      - `three_month` (decimal)
      - `last_month` (decimal)
      - `created_at` (timestamp)
    
    - `risk_status`: Stores historical risk status
      - `id` (uuid, primary key)
      - `date` (date)
      - `status` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated reads
*/

-- Create ETFs table
CREATE TABLE IF NOT EXISTS etfs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text UNIQUE NOT NULL,
  name text NOT NULL,
  sector text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create price history table
CREATE TABLE IF NOT EXISTS price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  etf_id uuid REFERENCES etfs(id) ON DELETE CASCADE,
  date date NOT NULL,
  price decimal NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(etf_id, date)
);

-- Create returns table
CREATE TABLE IF NOT EXISTS returns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  etf_id uuid REFERENCES etfs(id) ON DELETE CASCADE,
  date date NOT NULL,
  one_year decimal NOT NULL,
  nine_month decimal NOT NULL,
  six_month decimal NOT NULL,
  three_month decimal NOT NULL,
  last_month decimal NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(etf_id, date)
);

-- Create risk status table
CREATE TABLE IF NOT EXISTS risk_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  status text NOT NULL CHECK (status IN ('on', 'off')),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE etfs ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_status ENABLE ROW LEVEL SECURITY;

-- Add read policies
CREATE POLICY "Allow authenticated reads on etfs"
  ON etfs FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated reads on price_history"
  ON price_history FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated reads on returns"
  ON returns FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated reads on risk_status"
  ON risk_status FOR SELECT TO authenticated USING (true);