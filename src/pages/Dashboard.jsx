import React from 'react';
import {
  Sparkles,
  Calendar,
  Layers,
  Database,
  Search,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import StageIndicator from '../components/common/StageIndicator';

export default function Dashboard() {
  const { dateFilter, setDateFilter, setIsSearchOpen, user, customers, subscriptions, projects } = useApp();
  const { addToast } = useToast();
  const { isDark, toggleTheme } = useTheme();

  const dateOptions = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last 90 days' },
    { id: 'year', label: 'This year' }
  ];

  const handleDateChange = (val) => {
    setDateFilter(val);
    addToast({
      title: 'Date Range Updated',
      message: `Analytics filter adjusted to ${dateOptions.find((d) => d.id === val)?.label}.`,
      type: 'info',
      duration: 2000
    });
  };

  const triggerSampleToast = () => {
    addToast({
      title: 'Interactive Test Successful',
      message: 'Toast notification system and state hooks are responding as expected!',
      type: 'success'
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span>Nexora Cloud</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Overview</span>
        </div>
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Executive Overview</h1>
            <p className="page-description">
              Welcome back, {user.name}. Here is your platform architecture and operational status.
            </p>
          </div>

          <div className="page-actions">
            {/* Date Range Filter Selector */}
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
                  onClick={() => handleDateChange(opt.id)}
                  style={{
                    border: 'none',
                    background: dateFilter === opt.id ? 'var(--brand-primary)' : 'transparent',
                    color: dateFilter === opt.id ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: dateFilter === opt.id ? 600 : 500,
                    fontSize: '0.8125rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button className="btn btn-primary" onClick={triggerSampleToast}>
              <Sparkles size={16} />
              <span>Test Toast Notification</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage 1 Progress Banner */}
      <StageIndicator />

      {/* Grid of Architecture Verification Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        {/* Card 1: Shell & Layout Engine */}
        <div className="nex-card nex-card-hover">
          <div className="nex-card-header">
            <span className="nex-card-title">
              <Layers size={18} style={{ color: 'var(--brand-primary)' }} />
              <span>Layout & Shell Engine</span>
            </span>
            <span className="badge badge-success">Verified</span>
          </div>
          <div className="nex-card-body">
            <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
              Collapsible sidebar navigation, fixed backdrop glass navbar, mobile responsive drawer, and
              multi-route navigation powered by React Router v6.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>Responsive Sidebar with memory state</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>Quick Search command palette (Ctrl+K)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>Notification center with unread counters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Design System & Themes */}
        <div className="nex-card nex-card-hover">
          <div className="nex-card-header">
            <span className="nex-card-title">
              <Zap size={18} style={{ color: 'var(--warning-text)' }} />
              <span>Stripe & Linear Inspired Theme</span>
            </span>
            <span className="badge badge-info">{isDark ? 'Dark Theme' : 'Light Theme'}</span>
          </div>
          <div className="nex-card-body">
            <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
              Custom CSS tokens controlling surface elevations, borders, soft lighting glows, and glassmorphic
              layers with zero-flicker LocalStorage persistence.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={toggleTheme}>
                Switch to {isDark ? 'Light' : 'Dark'} Mode
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setIsSearchOpen(true)}>
                <Search size={14} /> Open Search (Ctrl+K)
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: LocalStorage State Sync */}
        <div className="nex-card nex-card-hover">
          <div className="nex-card-header">
            <span className="nex-card-title">
              <Database size={18} style={{ color: 'var(--info-text)' }} />
              <span>Browser State Persistence</span>
            </span>
            <span className="badge badge-primary">Active</span>
          </div>
          <div className="nex-card-body">
            <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
              Zero-backend browser persistence initializing and persisting customers, subscriptions, projects, and
              user preferences safely without overwriting updates.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                textAlign: 'center',
                padding: '0.75rem',
                background: 'var(--bg-muted)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {customers.length}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Customers</div>
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {subscriptions.length}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Subscriptions</div>
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {projects.length}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage 2 Preparation Preview */}
      <div className="nex-card" style={{ borderStyle: 'dashed' }}>
        <div className="nex-card-header">
          <span className="nex-card-title">
            <TrendingUp size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>Ready for Stage 2: Overview KPI Cards & Recharts Visualizations</span>
          </span>
          <span className="badge badge-neutral">Up Next</span>
        </div>
        <div className="nex-card-body">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            In Stage 2, the Overview page will be populated with all 6 KPI cards (Total Revenue, MRR, Total
            Customers, Active Subscriptions, Churn Rate, ARPU), interactive Recharts (Revenue trend line,
            Monthly sales bar, Acquisition area, Subscription distribution pie), and the live activity stream.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--brand-primary)', fontSize: '0.875rem', fontWeight: 600 }}>
            <span>Stage 1 foundation ready for Stage 2 integration</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
