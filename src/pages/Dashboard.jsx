import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  UserMinus,
  Wallet,
  Calendar,
  RotateCw,
  ShieldCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import { DASHBOARD_METRICS, SUBSCRIPTION_DISTRIBUTION } from '../data/mockData';
import { formatCurrency, formatCompactNumber } from '../utils/formatters';
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import RecentActivity from '../components/dashboard/RecentActivity';

export default function Dashboard() {
  const { dateFilter, setDateFilter, user } = useApp();
  const { addToast } = useToast();
  const { isDark } = useTheme();

  // Revenue chart view mode: 'comparison' (Revenue vs Target) or 'gross' (Gross Only)
  const [revenueViewMode, setRevenueViewMode] = useState('comparison');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dateOptions = [
    { id: '7d', label: 'Last 7 days', range: 'Nov 12 – Nov 18, 2026' },
    { id: '30d', label: 'Last 30 days', range: 'Oct 20 – Nov 18, 2026' },
    { id: '90d', label: 'Last 90 days', range: 'Aug 21 – Nov 18, 2026' },
    { id: 'year', label: 'This year', range: 'Jan 01 – Nov 18, 2026' }
  ];

  // Active metrics based on dateFilter
  const activeMetrics = useMemo(() => {
    return DASHBOARD_METRICS[dateFilter] || DASHBOARD_METRICS['30d'];
  }, [dateFilter]);

  // Dynamic time-of-day greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const handleDateFilterChange = (id) => {
    setDateFilter(id);
    const selected = dateOptions.find((d) => d.id === id);
    addToast({
      title: 'Date Range Updated',
      message: `Displaying metrics for ${selected?.range || selected?.label}.`,
      type: 'info',
      duration: 2000
    });
  };

  const handleRefreshTelemetry = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast({
        title: 'Telemetry Synced',
        message: 'Metrics re-calculated against client-side transaction ledger.',
        type: 'success',
        duration: 2500
      });
    }, 400);
  };

  // Chart theme colors
  const strokeColor = isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9';
  const textColor = isDark ? '#71717a' : '#64748b';

  // Enhanced Revenue Chart Tooltip
  const RevenueTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0]?.payload;
      const revenue = dataPoint?.revenue || 0;
      const target = dataPoint?.target || 0;
      const diff = revenue - target;
      const isAhead = diff >= 0;

      return (
        <div className="recharts-custom-tooltip">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.4rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.35rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.8125rem' }}>
              {dataPoint?.fullDate || label}
            </span>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: isAhead ? 'var(--success-text)' : 'var(--danger-text)',
                background: isAhead ? 'var(--success-bg)' : 'var(--danger-bg)',
                padding: '0.1rem 0.35rem',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              {isAhead ? `+${dataPoint?.variance || 'Ahead'}` : 'Below target'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.78125rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.25rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Gross Revenue:</span>
              <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{formatCurrency(revenue)}</strong>
            </div>

            {revenueViewMode === 'comparison' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.25rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Target Projection:</span>
                  <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{formatCurrency(target)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.25rem', paddingTop: '0.25rem', borderTop: '1px dashed var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Net Variance:</span>
                  <strong style={{ color: isAhead ? 'var(--success-text)' : 'var(--danger-text)', fontFamily: 'var(--font-mono)' }}>
                    {isAhead ? `+${formatCurrency(diff)}` : `-${formatCurrency(Math.abs(diff))}`}
                  </strong>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Standard Custom Tooltip for other charts
  const GenericTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="recharts-custom-tooltip">
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', fontSize: '0.8125rem' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color, display: 'flex', gap: '0.75rem', justifyContent: 'space-between', fontSize: '0.78125rem' }}>
              <span>{entry.name}:</span>
              <strong>{entry.value.toLocaleString()}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalPeriodRevenue = activeMetrics.kpis.totalRevenue.value;
  const targetPeriodBaseline = activeMetrics.context.targetPlan;
  const varianceAmount = totalPeriodRevenue - targetPeriodBaseline;

  return (
    <div className="animate-fade-in">
      {/* =========================================================
          PERSONALIZED WELCOME & CONTEXTUAL HEADER SECTION
          ========================================================= */}
      <div className="page-header" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div className="breadcrumbs">
            <span>Nexora Platform</span>
            <span className="breadcrumb-separator">/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Overview</span>
          </div>

          {/* Sample Data vs Real Data Distinction Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-default)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--brand-primary)' }} />
            <span>Stripe Sandbox Mode (Demo Data)</span>
          </div>
        </div>

        <div className="page-header-row">
          <div>
            <h1 className="page-title">
              {greeting}, {user.name.split(' ')[0]}
            </h1>
            <p className="page-description">
              Real-time subscription metrics across 1,429 customer accounts.
            </p>
          </div>

          <div className="page-actions">
            {/* Functional Date Range Selector */}
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '2px',
                gap: '2px'
              }}
            >
              {dateOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleDateFilterChange(opt.id)}
                  style={{
                    border: 'none',
                    background: dateFilter === opt.id ? 'var(--bg-card)' : 'transparent',
                    color: dateFilter === opt.id ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: dateFilter === opt.id ? 600 : 500,
                    fontSize: '0.78125rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    boxShadow: dateFilter === opt.id ? 'var(--shadow-sm)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                  title={opt.range}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Telemetry Refresh Button */}
            <button
              className="btn btn-secondary btn-icon"
              onClick={handleRefreshTelemetry}
              title="Refresh platform telemetry"
              aria-label="Refresh telemetry"
              style={{ width: '34px', height: '34px' }}
            >
              <RotateCw size={14} style={{ animation: isRefreshing ? 'spin 0.6s linear infinite' : 'none' }} />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          TIER 1: PRIMARY FINANCIAL METRICS (2 COLUMNS)
          ========================================================= */}
      <div className="kpi-hero-grid">
        <StatCard
          title="Total Gross Revenue"
          value={formatCurrency(activeMetrics.kpis.totalRevenue.value)}
          change={activeMetrics.kpis.totalRevenue.change}
          isPositive={activeMetrics.kpis.totalRevenue.isPositive}
          icon={DollarSign}
          isHero={true}
          comparison={activeMetrics.kpis.totalRevenue.comparison}
          secondaryContext={`${activeMetrics.context.runRate} ARR Run Rate • ${activeMetrics.kpis.totalRevenue.secondaryContext}`}
        />
        <StatCard
          title="Monthly Recurring Revenue (MRR)"
          value={formatCurrency(activeMetrics.kpis.mrr.value)}
          change={activeMetrics.kpis.mrr.change}
          isPositive={activeMetrics.kpis.mrr.isPositive}
          icon={TrendingUp}
          isHero={true}
          comparison={activeMetrics.kpis.mrr.comparison}
          secondaryContext={`${activeMetrics.context.expansionRate} • ${activeMetrics.kpis.mrr.secondaryContext}`}
        />
      </div>

      {/* =========================================================
          TIER 2: SUPPORTING OPERATIONAL METRICS (4 BALANCED COLUMNS)
          ========================================================= */}
      <div className="kpi-supporting-grid">
        <StatCard
          title="Active Subscriptions"
          value={activeMetrics.kpis.activeSubscriptions.value.toLocaleString()}
          change={activeMetrics.kpis.activeSubscriptions.change}
          isPositive={activeMetrics.kpis.activeSubscriptions.isPositive}
          icon={CreditCard}
          comparison={activeMetrics.kpis.activeSubscriptions.comparison}
          secondaryContext={activeMetrics.kpis.activeSubscriptions.secondaryContext}
        />
        <StatCard
          title="Total Customers"
          value={activeMetrics.kpis.totalCustomers.value.toLocaleString()}
          change={activeMetrics.kpis.totalCustomers.change}
          isPositive={activeMetrics.kpis.totalCustomers.isPositive}
          icon={Users}
          comparison={activeMetrics.kpis.totalCustomers.comparison}
          secondaryContext={activeMetrics.kpis.totalCustomers.secondaryContext}
        />
        <StatCard
          title="Net Churn Rate"
          value={`${activeMetrics.kpis.churnRate.value}%`}
          change={activeMetrics.kpis.churnRate.change}
          isPositive={activeMetrics.kpis.churnRate.isPositive}
          icon={UserMinus}
          comparison={activeMetrics.kpis.churnRate.comparison}
          secondaryContext={activeMetrics.kpis.churnRate.secondaryContext}
        />
        <StatCard
          title="Avg. Revenue Per User"
          value={formatCurrency(activeMetrics.kpis.arpu.value)}
          change={activeMetrics.kpis.arpu.change}
          isPositive={activeMetrics.kpis.arpu.isPositive}
          icon={Wallet}
          comparison={activeMetrics.kpis.arpu.comparison}
          secondaryContext={activeMetrics.kpis.arpu.secondaryContext}
        />
      </div>

      {/* =========================================================
          CHARTS ROW 1: REVENUE TIMELINE & DEAL VOLUME
          ========================================================= */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.25rem'
        }}
      >
        {/* Revenue Over Time with Contextual Top Bar */}
        <ChartCard
          title="Revenue Growth & Run-Rate"
          subtitle={`Recognized revenue trajectory (${activeMetrics.dateRangeLabel})`}
          action={
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px',
                gap: '2px'
              }}
            >
              <button
                onClick={() => setRevenueViewMode('comparison')}
                style={{
                  border: 'none',
                  background: revenueViewMode === 'comparison' ? 'var(--bg-card)' : 'transparent',
                  color: revenueViewMode === 'comparison' ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer'
                }}
              >
                vs. Target
              </button>
              <button
                onClick={() => setRevenueViewMode('gross')}
                style={{
                  border: 'none',
                  background: revenueViewMode === 'gross' ? 'var(--bg-card)' : 'transparent',
                  color: revenueViewMode === 'gross' ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer'
                }}
              >
                Gross Only
              </button>
            </div>
          }
          contextBar={
            <div className="chart-context-bar">
              <div className="chart-context-metric">
                <span className="chart-context-label">Period Realized</span>
                <span className="chart-context-val">{formatCurrency(totalPeriodRevenue)}</span>
              </div>
              <div className="chart-context-metric">
                <span className="chart-context-label">Target Baseline</span>
                <span className="chart-context-val" style={{ color: 'var(--text-secondary)' }}>
                  {formatCurrency(targetPeriodBaseline)}
                </span>
              </div>
              <div className="chart-context-metric">
                <span className="chart-context-label">Net Variance</span>
                <span className="chart-context-val" style={{ color: 'var(--success-text)' }}>
                  +{formatCurrency(varianceAmount)} (+{((varianceAmount / targetPeriodBaseline) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="chart-context-metric">
                <span className="chart-context-label">Daily Run Rate</span>
                <span className="chart-context-val">{activeMetrics.context.avgDaily}</span>
              </div>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeMetrics.revenueOverTime} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
              <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} />
              <YAxis
                stroke={textColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${formatCompactNumber(v)}`}
              />
              <Tooltip content={<RevenueTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Gross Volume"
                stroke="var(--brand-primary)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              {revenueViewMode === 'comparison' && (
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Projected Target"
                  stroke="#71717a"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Monthly Sales & Inbound Volume */}
        <ChartCard
          title="Sales Volume & Closed Deals"
          subtitle="New subscriptions and contract expansions"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeMetrics.monthlySales} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
              <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<GenericTooltip />} />
              <Bar dataKey="sales" name="Paid Subscriptions" fill="var(--chart-primary)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="deals" name="Enterprise Deals" fill="var(--chart-secondary)" radius={[3, 3, 0, 0]} />
              <Legend
                verticalAlign="top"
                align="right"
                height={28}
                formatter={(val) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>{val}</span>}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* =========================================================
          CHARTS ROW 2: ACQUISITION & PLAN BREAKDOWN
          ========================================================= */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.75rem'
        }}
      >
        {/* Customer Acquisition Channels */}
        <ChartCard
          title="Customer Acquisition Dynamics"
          subtitle="Organic signups vs. paid acquisition channels"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeMetrics.customerAcquisition} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
              <XAxis dataKey="period" stroke={textColor} fontSize={12} tickLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<GenericTooltip />} />
              <Area
                type="monotone"
                dataKey="organic"
                name="Organic Inbound"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOrganic)"
              />
              <Area
                type="monotone"
                dataKey="paid"
                name="Paid Channels"
                stroke="#06b6d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPaid)"
              />
              <Legend
                verticalAlign="top"
                align="right"
                height={28}
                formatter={(val) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>{val}</span>}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Subscription Tier Breakdown */}
        <ChartCard
          title="Active Subscription Distribution"
          subtitle="Tenant distribution across pricing plans"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SUBSCRIPTION_DISTRIBUTION}
                cx="50%"
                cy="46%"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={3}
                dataKey="value"
              >
                {SUBSCRIPTION_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<GenericTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={32}
                formatter={(val) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{val}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* =========================================================
          RECENT INVOICES & PLATFORM ACTIVITY LEDGER
          ========================================================= */}
      <div style={{ marginBottom: '2rem' }}>
        <RecentActivity />
      </div>
    </div>
  );
}
