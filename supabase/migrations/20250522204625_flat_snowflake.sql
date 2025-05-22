/*
  # Add last_updated timestamp to ETFs table

  1. Changes
    - Add last_updated timestamp column to etfs table
    - Add index on last_updated for efficient queries
*/

ALTER TABLE etfs 
ADD COLUMN last_updated timestamptz DEFAULT now();

CREATE INDEX idx_etfs_last_updated ON etfs(last_updated);