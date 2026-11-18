import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  Check,
  Zap,
  ShieldCheck,
  AlertCircle,
  Clock,
  RefreshCw,
  Ban,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import SubscriptionModal from '../components/subscriptions/SubscriptionModal';

export default function Subscriptions() {
  const { subscriptions, addSubscription, updateSubscriptionPlan, cancelSubscription } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);

  // Plan Tiers Definition
  const planTiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Discovery & exploratory platform sandbox testing',
      features: ['Up to 1,000 API events/mo', 'Single user seat', 'Community Discord support'],
      badge: 'Starter',
      color: 'var(--text-muted)'
    },
    {
      name: 'Starter',
      price: '$49',
      period: 'per month',
      description: 'Core toolchain designed for nimble development teams',
      features: ['Up to 50,000 API events/mo', '5 team member seats', 'Standard email support (24h SLA)'],
      badge: 'Popular',
      color: '#38bdf8'
    },
    {
      name: 'Professional',
      price: '$299',
      period: 'per month',
      description: 'High throughput analytics with team webhooks & cohorts',
      features: ['Up to 500,000 API events/mo', 'Unlimited member seats', 'Priority Slack support (2h SLA)', 'Custom cohort exports'],
      badge: 'Growth',
      color: '#6366f1'
    },
    {
      name: 'Enterprise',
      price: '$999',
      period: 'per month',
      description: 'Mission-critical infrastructure with custom SLAs & compliance',
      features: ['Unlimited throughput burst', 'Dedicated cluster isolation', 'SOC-2 certified audit logs', 'Dedicated Technical Account Mgr'],
      badge: 'Scale',
      color: '#10b981'
    }
  ];

  // Filter subscriptions
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
      const matchesPlan = selectedPlanFilter === 'All' || sub.plan === selectedPlanFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [subscriptions, searchTerm, statusFilter, selectedPlanFilter]);

  const handleOpenAdd = () => {
    setEditingSub(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sub) => {
    setEditingSub(sub);
    setIsModalOpen(true);
  };

  const handleCancelSub = (subId, custName) => {
    if (window.confirm(`Cancel recurring subscription for ${custName}?`)) {
      cancelSubscription(subId);
    }
  };

  const handleModalSubmit = (formData) => {
    if (editingSub) {
      updateSubscriptionPlan(editingSub.id, formData.plan, formData.price, formData.billingCycle);
    } else {
      addSubscription(formData);
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="badge badge-success">Active</span>;
      case 'Trial':
        return <span className="badge badge-primary">Trial</span>;
      case 'Cancelled':
      default:
        return <span className="badge badge-danger">Cancelled</span>;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
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
              Manage SaaS tiers, recurring billing cycles, plan upgrades, and automated renewals.
            </p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary" onClick={handleOpenAdd}>
              <Plus size={16} />
              <span>Create Subscription</span>
            </button>
          </div>
        </div>
      </div>

      {/* Plan Tier Showcase Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}
      >
        {planTiers.map((tier) => {
          const subscriberCount = subscriptions.filter((s) => s.plan === tier.name && s.status === 'Active').length;
          const isSelected = selectedPlanFilter === tier.name;

          return (
            <div
              key={tier.name}
              className={`nex-card nex-card-hover ${isSelected ? 'selected-plan-border' : ''}`}
              style={{
                padding: '1.5rem',
                border: isSelected ? '2px solid var(--brand-primary)' : undefined,
                cursor: 'pointer'
              }}
              onClick={() => setSelectedPlanFilter(isSelected ? 'All' : tier.name)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: tier.color }}>{tier.name} Plan</span>
                <span className="badge badge-primary">{subscriberCount} active</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{tier.price}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/{tier.period}</span>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', minHeight: '38px' }}>
                {tier.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                {tier.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                    <Check size={14} style={{ color: 'var(--success)', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscriptions Data Table */}
      <div className="nex-card" style={{ marginBottom: '2rem', overflow: 'hidden' }}>
        {/* Table Filter Controls */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '0.45rem 0.85rem',
                width: '100%',
                maxWidth: '360px'
              }}
            >
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search subscriptions by customer or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  width: '100%'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <Filter size={14} />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.8125rem',
                  outline: 'none'
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Trial">Trial</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {selectedPlanFilter !== 'All' && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setSelectedPlanFilter('All')}
                style={{ fontSize: '0.75rem' }}
              >
                Clear Plan Filter ({selectedPlanFilter})
              </button>
            )}
          </div>
        </div>

        {/* Table Contents */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-default)' }}>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>Customer & Company</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>Plan Tier</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>Billing Cycle</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>Price</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>Renewal Date</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Subscription Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <CreditCard size={36} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
                    <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>No subscriptions found</p>
                    <p style={{ fontSize: '0.8rem' }}>Try clearing filters or adding a new subscription.</p>
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background-color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sub.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sub.company}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className="badge badge-primary">{sub.plan}</span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                      {sub.billingCycle}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {formatCurrency(sub.price)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      {renderStatusBadge(sub.status)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                      {formatDate(sub.renewalDate)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenEdit(sub)}
                          title="Change Plan"
                        >
                          Change Plan
                        </button>
                        {sub.status !== 'Cancelled' && (
                          <button
                            className="btn btn-ghost btn-sm"
                            style={{ color: 'var(--danger-text)' }}
                            onClick={() => handleCancelSub(sub.id, sub.customerName)}
                            title="Cancel Subscription"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        editingSub={editingSub}
      />
    </div>
  );
}
