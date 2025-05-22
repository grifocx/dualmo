# Dual Momentum Strategy Dashboard - Feature Plan

## 1. Data Visualization Enhancements
- **Momentum Score Chart** ✅
  - Line chart showing composite momentum scores over time
  - Visual comparison between sectors
  - Highlight risk-on/risk-off transitions

- **Portfolio Allocation View** ⏳ (In Progress)
  - Interactive pie chart showing current allocations
  - Visual comparison between current and target allocations
  - Animated transitions during allocation changes

- **Performance Dashboard** ✅
  - VOO benchmark comparison chart
  - Sector relative strength indicators
  - Risk-adjusted return metrics

## 2. Risk Management Tools
- **Risk Status Dashboard** ✅
  - Countdown to next rebalance date
  - VOO 12-month return tracker
  - Historical risk status changes log
  - Early warning indicators for potential status changes

- **Portfolio Analytics** ⏳ (In Progress)
  - Position sizing calculator
  - Transaction cost estimator
  - Rebalancing threshold monitors
  - Drift analysis from target allocations

## 3. Documentation & Reporting
- **Monthly Decision Journal**
  - Automated trade log generation
  - Price history documentation
  - Sector ranking records
  - Allocation change history

- **Performance Reports**
  - Monthly performance summaries
  - Attribution analysis
  - Risk metrics dashboard
  - Exportable PDF reports

## 4. Analysis Tools
- **Sector Analysis**
  - Inter-sector correlation matrix
  - Rolling correlation charts
  - Sector rotation analysis
  - Momentum trend strength indicators

- **Risk Analytics**
  - Drawdown analysis
  - Volatility metrics
  - Risk-adjusted return ratios
  - Maximum favorable/unfavorable excursion

## 5. Alert System
- **Rebalancing Alerts**
  - Monthly rebalance reminders
  - Drift threshold notifications
  - Significant ranking changes
  - Risk status change alerts

## 6. Backtesting Module
- **Strategy Testing**
  - Historical performance simulation
  - Parameter sensitivity analysis
  - Transaction cost impact
  - Alternative allocation modeling

## Implementation Priority
1. ✅ Risk Status Enhancement (Critical for SOP compliance)
2. ✅ Documentation Features (Essential for tracking)
3. ⏳ Portfolio Management Tools (Core functionality)
4. ✅ Data Visualization (User experience)
5. Analysis Tools (Strategy optimization)
6. Alerts and Notifications (Quality of life)
7. Backtesting (Strategy validation)

## Technical Requirements
- ✅ Chart.js or D3.js for visualizations
- PDF generation for reports
- ✅ Local storage for historical data
- Service workers for notifications
- Web workers for calculations

## Data Infrastructure
- ✅ Supabase Database Schema
  - ETFs table
  - Price history
  - Returns
  - Risk status

- ✅ Edge Functions
  - Monthly data updates
  - Return calculations
  - Risk status updates

## Notes
- All features should align with the SOP guidelines
- Focus on maintainable, testable code
- Prioritize user experience and data accuracy
- Ensure clear documentation for all features