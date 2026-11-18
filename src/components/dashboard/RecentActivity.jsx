import React, { useState } from 'react';
import {
  CreditCard,
  ArrowUpRight,
  RefreshCw,
  UserPlus,
  CheckCircle2,
  Clock,
  Layers,
  Download,
  Filter,
  Receipt,
  ExternalLink
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { RECENT_TRANSACTIONS, RECENT_ACTIVITIES } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

export default function RecentActivity() {
  const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' | 'activity'
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTransactions = RECENT_TRANSACTIONS.filter((tx) => {
    if (statusFilter === 'All') return true;
    return tx.status === statusFilter;
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'upgrade':
        return <ArrowUpRight size={14} style={{ color: 'var(--brand-primary)' }} />;
      case 'renewal':
        return <RefreshCw size={14} style={{ color: 'var(--success-text)' }} />;
      case 'signup':
        return <UserPlus size={14} style={{ color: 'var(--info-text)' }} />;
      case 'expansion':
        return <Layers size={14} style={{ color: 'var(--brand-primary)' }} />;
      case 'payment':
        return <CreditCard size={14} style={{ color: 'var(--warning-text)' }} />;
      default:
        return <CheckCircle2 size={14} style={{ color: 'var(--success-text)' }} />;
    }
  };

  return (
    <div className="nex-card recent-activity-card">
      {/* Card Header with Tab Switcher */}
      <div className="nex-card-header" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="activity-tabs-container">
            <button
              className={`activity-tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
              onClick={() => setActiveTab('transactions')}
            >
              <Receipt size={14} />
              <span>Recent Invoices & Transactions</span>
              <span className="tab-counter-badge">{RECENT_TRANSACTIONS.length}</span>
            </button>
            <button
              className={`activity-tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <Clock size={14} />
              <span>Live Platform Events</span>
              <span className="tab-counter-badge">{RECENT_ACTIVITIES.length}</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {activeTab === 'transactions' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {['All', 'Paid', 'Refunded'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    border: 'none',
                    background: statusFilter === status ? 'var(--bg-muted)' : 'transparent',
                    color: statusFilter === status ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          )}

          <NavLink to="/subscriptions" className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem', gap: '0.35rem' }}>
            <span>Manage Billing</span>
            <ExternalLink size={12} />
          </NavLink>
        </div>
      </div>

      {/* Tab 1: Real Transactions Table */}
      {activeTab === 'transactions' && (
        <div style={{ overflowX: 'auto' }}>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Invoice / Customer</th>
                <th>Subscription Tier</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="customer-avatar-initials">
                        {tx.customer.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                          {tx.customer}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {tx.company} • <span style={{ fontFamily: 'var(--font-mono)' }}>{tx.id}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                      {tx.plan}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {tx.method}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td>
                    {tx.status === 'Paid' ? (
                      <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                        <CheckCircle2 size={11} /> Paid
                      </span>
                    ) : (
                      <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                        Refunded
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {tx.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Platform Activity Stream */}
      {activeTab === 'activity' && (
        <div className="recent-activity-list">
          {RECENT_ACTIVITIES.map((act) => (
            <div key={act.id} className="activity-item">
              <div className="activity-icon-badge">
                {getActivityIcon(act.type)}
              </div>
              <div className="activity-content">
                <div className="activity-text">
                  <span className="activity-user">{act.user}</span>{' '}
                  <span className="activity-action">{act.action}</span>
                </div>
                <span className="activity-time">{act.time}</span>
              </div>
              <div className="activity-amount">{act.amount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
