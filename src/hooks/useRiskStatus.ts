import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { RiskStatus } from '../types';

const DEFAULT_RISK_STATUS: RiskStatus = {
  status: 'off',
  message: 'Initializing risk status...',
  lastUpdated: new Date().toISOString()
};

export function useRiskStatus() {
  const [riskStatus, setRiskStatus] = useState<RiskStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRiskStatus() {
      try {
        const { data, error: riskError } = await supabase
          .from('risk_status')
          .select('*')
          .order('date', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (riskError) throw riskError;

        if (!data) {
          setRiskStatus(DEFAULT_RISK_STATUS);
          return;
        }

        setRiskStatus({
          status: data.status,
          message: data.message,
          lastUpdated: data.date
        });
      } catch (err) {
        console.error('Risk status error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch risk status');
        setRiskStatus(DEFAULT_RISK_STATUS);
      } finally {
        setLoading(false);
      }
    }

    fetchRiskStatus();
  }, []);

  return { riskStatus, loading, error };
}