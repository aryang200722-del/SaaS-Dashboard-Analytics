import React from 'react';
import { CreditCard, Check, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Subscriptions() {
  const { subscriptions } = useApp();

  const plans = [
    { name: 'Free', price: '$0', desc: 'Core platform discovery & sandbox testing' },
    { name: 'Starter', price: '$49/mo', desc: 'Essential tools for high-velocity teams' },
    { name: 'Professional', price: '$299/mo', desc: 'Advanced analytics, webhooks & high throughput' },
    { name: 'Enterprise', price: '$999+/mo', desc: 'Dedicated SLA, custom integrations & multi-cluster' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="breadcrumbs">
          <span>Nexora Cloud</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Subscriptions</span>
        </div>
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Subscription Management</h1>
            <p className="page-description">
              Manage SaaS tiers, recurring billing intervals, plan upgrades, and renewals.
            </p>
          </div>
        </div>
      </div>

      {/* Plan Tier Showcase */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        {plans.map((p) => (
          <div key={p.name} className="nex-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>{p.name} Plan</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.5rem 0' }}>
              {p.price}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="nex-card">
        <div className="nex-card-header">
          <span className="nex-card-title">
            <CreditCard size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>Subscription Records ({subscriptions.length} Initialized)</span>
          </span>
          <span className="badge badge-info">Stage 3 Focus</span>
        </div>
        <div className="nex-card-body">
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Plan change, cancellation flow, renewal monitoring, and status filtering will be fully interactive in
            <strong> Stage 3</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
