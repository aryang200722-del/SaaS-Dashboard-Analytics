import React, { useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Percent,
  Activity,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap
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
import { useTheme } from '../context/ThemeContext';
import { DASHBOARD_METRICS, SUBSCRIPTION_DISTRIBUTION } from '../data/mockData';
import { formatCurrency, formatCompactNumber } from '../utils/formatters';
import ChartCard from '../components/dashboard/ChartCard';

export default function Analytics() {
  const { dateFilter, setDateFilter } = useApp();
  const { isDark } = useTheme();

  const strokeColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  const dateOptions = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last 90 days' },
    { id: 'year', label: 'This year' }
  ];

  const activeMetrics = useMemo(() => {
    return DASHBOARD_METRICS[dateFilter] || DASHBOARD_METRICS['30d'];
  }, [dateFilter]);

  // Revenue by Plan calculation data
  const revenueByPlan = [
    { plan: 'Free', mrr: 0, customers: 420, fill: '#94a3b8' },
    { plan: 'Starter', mrr: 24990, customers: 510, fill: '#38bdf8' },
    { plan: 'Professional', mrr: 71760, customers: 240, fill: '#6366f1' },
    { plan: 'Enterprise', mrr: 109890, customers: 110, fill: '#10b981' }
  ];

  // Monthly Growth data
  const monthlyGrowthTrends = [
    { month: 'Jun', expansion: 12.4, contraction: -2.1, net: 10.3 },
    { month: 'Jul', expansion: 14.1, contraction: -1.8, net: 12.3 },
    { month: 'Aug', expansion: 15.8, contraction: -2.4, net: 13.4 },
    { month: 'Sep', expansion: 16.5, contraction: -1.9, net: 14.6 },
    { month: 'Oct', expansion: 18.2, contraction: -1.7, net: 16.5 },
    { month: 'Nov', expansion: 19.4, contraction: -1.4, net: 18.0 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="recharts-custom-tooltip">
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color, display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
              <span>{entry.name}:</span>
              <strong>
                {typeof entry.value === 'number' && (entry.name.toLowerCase().includes('mrr') || entry.name.toLowerCase().includes('revenue'))
                  ? formatCurrency(entry.value)
                  : entry.value}
              </strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span>Nexora Cloud</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Analytics</span>
        </div>
        <div className="page-header-row">
          <div>
            <h1 className="page-title">SaaS Intelligence & Growth Analytics</h1>
            <p className="page-description">
              Cohort expansion rates, unit economics, tier distributions, and enterprise retention curves.
            </p>
          </div>

          <div className="page-actions">
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '3px'
              }}
            >
              {dateOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDateFilter(opt.id)}
                  style={{
                    border: 'none',
                    background: dateFilter === opt.id ? 'var(--brand-primary)' : 'transparent',
                    color: dateFilter === opt.id ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: dateFilter === opt.id ? 600 : 500,
                    fontSize: '0.8125rem',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Unit Economics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}
      >
        <div className="nex-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Net Revenue Retention</span>
            <span className="badge badge-success">+4.2%</span>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>118%</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Top decile SaaS benchmark</span>
        </div>

        <div className="nex-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Customer Lifetime Value</span>
            <span className="badge badge-success">+12.5%</span>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>$3,840</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average across paid tiers</span>
        </div>

        <div className="nex-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Customer Acquisition Cost</span>
            <span className="badge badge-success">-6.1%</span>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>$420</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Blended CAC across organic & paid</span>
        </div>

        <div className="nex-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>LTV:CAC Ratio</span>
            <span className="badge badge-primary">Optimal</span>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--brand-primary)' }}>9.1x</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Benchmark is &gt; 3.0x</span>
        </div>

        <div className="nex-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>SaaS Quick Ratio</span>
            <span className="badge badge-success">High Growth</span>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--success-text)' }}>3.4</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Growth to churn efficiency</span>
        </div>
      </div>

      {/* Row 1: Revenue Trends & Monthly Growth Velocity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}
      >
        <ChartCard
          title="Revenue Trends & MRR Expansion"
          subtitle="Realized revenue compared against target projection"
          badge="Cohort"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeMetrics.revenueOverTime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="analyticsRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
              <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${formatCompactNumber(v)}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Realized Revenue" stroke="var(--brand-primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#analyticsRevGrad)" />
              <Line type="monotone" dataKey="target" name="Target Trajectory" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Monthly Growth Velocity"
          subtitle="Net New MRR expansion vs contraction percentage"
          badge="Efficiency"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyGrowthTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
              <XAxis dataKey="month" stroke={textColor} fontSize={12} tickLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="expansion" name="Expansion %" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="contraction" name="Contraction %" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: Customer Acquisition & Revenue by Tier */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        <ChartCard
          title="Customer Acquisition Dynamics"
          subtitle="Organic virality vs targeted acquisition channels"
          badge="Growth Channels"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeMetrics.customerAcquisition} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
              <XAxis dataKey="period" stroke={textColor} fontSize={12} tickLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="organic" name="Organic Signups" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
              <Area type="monotone" dataKey="paid" name="Paid Ads & Outbound" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Revenue by Subscription Plan"
          subtitle="Monthly Recurring Revenue contribution by tier"
          badge="Tier Breakdown"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByPlan} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} horizontal={false} />
              <XAxis type="number" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${formatCompactNumber(v)}`} />
              <YAxis dataKey="plan" type="category" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="mrr" name="Plan MRR" fill="var(--brand-primary)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
