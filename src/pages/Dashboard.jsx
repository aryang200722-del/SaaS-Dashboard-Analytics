import React, { useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  UserMinus,
  Wallet,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Filter
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

  const dateOptions = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last 90 days' },
    { id: 'year', label: 'This year' }
  ];

  // Active metrics based on dateFilter
  const activeMetrics = useMemo(() => {
    return DASHBOARD_METRICS[dateFilter] || DASHBOARD_METRICS['30d'];
  }, [dateFilter]);

  const handleDateFilterChange = (id) => {
    setDateFilter(id);
    addToast({
      title: 'Filter Applied',
      message: `Analytics updated for ${dateOptions.find((d) => d.id === id)?.label}.`,
      type: 'info',
      duration: 2000
    });
  };

  // Chart theme colors
  const strokeColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="recharts-custom-tooltip">
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color, display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
              <span>{entry.name}:</span>
              <strong>
                {typeof entry.value === 'number' && entry.name.toLowerCase().includes('revenue')
                  ? formatCurrency(entry.value)
                  : entry.value.toLocaleString()}
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
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Overview</span>
        </div>
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Analytics Overview</h1>
            <p className="page-description">
              Welcome back, {user.name}. Real-time platform performance and subscription metrics.
            </p>
          </div>

          <div className="page-actions">
            {/* Date filter button group */}
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
                  onClick={() => handleDateFilterChange(opt.id)}
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

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}
      >
        <StatCard
          title="Total Revenue"
          value={formatCurrency(activeMetrics.kpis.totalRevenue.value)}
          change={activeMetrics.kpis.totalRevenue.change}
          isPositive={activeMetrics.kpis.totalRevenue.isPositive}
          icon={DollarSign}
        />
        <StatCard
          title="Monthly Recurring Revenue"
          value={formatCurrency(activeMetrics.kpis.mrr.value)}
          change={activeMetrics.kpis.mrr.change}
          isPositive={activeMetrics.kpis.mrr.isPositive}
          icon={TrendingUp}
        />
        <StatCard
          title="Total Customers"
          value={activeMetrics.kpis.totalCustomers.value.toLocaleString()}
          change={activeMetrics.kpis.totalCustomers.change}
          isPositive={activeMetrics.kpis.totalCustomers.isPositive}
          icon={Users}
        />
        <StatCard
          title="Active Subscriptions"
          value={activeMetrics.kpis.activeSubscriptions.value.toLocaleString()}
          change={activeMetrics.kpis.activeSubscriptions.change}
          isPositive={activeMetrics.kpis.activeSubscriptions.isPositive}
          icon={CreditCard}
        />
        <StatCard
          title="Churn Rate"
          value={`${activeMetrics.kpis.churnRate.value}%`}
          change={activeMetrics.kpis.churnRate.change}
          isPositive={activeMetrics.kpis.churnRate.isPositive}
          icon={UserMinus}
          subtitle="monthly churn delta"
        />
        <StatCard
          title="Avg. Revenue Per User"
          value={formatCurrency(activeMetrics.kpis.arpu.value)}
          change={activeMetrics.kpis.arpu.change}
          isPositive={activeMetrics.kpis.arpu.isPositive}
          icon={Wallet}
        />
      </div>

      {/* Charts Section: Row 1 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}
      >
        {/* Revenue Over Time Line/Area Chart */}
        <ChartCard
          title="Revenue Over Time"
          subtitle="Gross recurring revenue vs baseline target"
          badge="Live Model"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeMetrics.revenueOverTime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0} />
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
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="var(--brand-primary)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Line
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="var(--text-muted)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Monthly Sales Bar Chart */}
        <ChartCard
          title="Sales Velocity & Deal Volume"
          subtitle="Closed subscriptions and contract volume"
          badge="Quarterly"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeMetrics.monthlySales} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
              <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sales" name="Sales Deals" fill="var(--chart-primary)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="deals" name="Enterprise Inbound" fill="var(--chart-secondary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Section: Row 2 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        {/* Customer Acquisition Area Chart */}
        <ChartCard
          title="Customer Acquisition"
          subtitle="Inbound organic signups vs targeted paid campaigns"
          badge="Funnel"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeMetrics.customerAcquisition} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} vertical={false} />
              <XAxis dataKey="period" stroke={textColor} fontSize={12} tickLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="organic"
                name="Organic"
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
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Subscription Distribution Donut Chart */}
        <ChartCard
          title="Subscription Distribution"
          subtitle="Active client accounts segmented by tier"
          badge="Tiers"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SUBSCRIPTION_DISTRIBUTION}
                cx="50%"
                cy="46%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {SUBSCRIPTION_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(val) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{val}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Activity Section */}
      <div style={{ marginBottom: '2rem' }}>
        <RecentActivity />
      </div>
    </div>
  );
}
