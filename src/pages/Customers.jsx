import React from 'react';
import { Users, Plus, Search, Filter, ArrowUpDown, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Customers() {
  const { customers } = useApp();

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="breadcrumbs">
          <span>Nexora Cloud</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Customers</span>
        </div>
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Customer Management</h1>
            <p className="page-description">
              Manage SaaS accounts, contact records, customer subscription plans, and lifetime revenues.
            </p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary" disabled title="Coming in Stage 3">
              <Plus size={16} />
              <span>Add Customer (Stage 3)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage Status Card */}
      <div className="nex-card" style={{ marginBottom: '2rem' }}>
        <div className="nex-card-header">
          <span className="nex-card-title">
            <Users size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>Customer Directory ({customers.length} Seed Accounts Initialized)</span>
          </span>
          <span className="badge badge-info">Stage 3 Focus</span>
        </div>
        <div className="nex-card-body">
          <p style={{ marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            Full customer table with search, status filters, multi-column sorting, pagination, and Add/Edit/Delete
            modals will be activated in <strong>Stage 3</strong>. The sample records are already seeded in LocalStorage.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}
          >
            {customers.slice(0, 4).map((c) => (
              <div
                key={c.id}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{c.name}</strong>
                  <span className="badge badge-primary">{c.subscriptionPlan}</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                  {c.company} • {c.email}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--success-text)', fontWeight: 600 }}>
                  ${c.totalRevenue.toLocaleString()} Revenue
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
