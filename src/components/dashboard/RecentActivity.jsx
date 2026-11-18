import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  ArrowUpRight,
  RefreshCw,
  UserPlus,
  CheckCircle2,
  Clock,
  Layers,
  Download,
  Search,
  ExternalLink,
  Receipt,
  FileSpreadsheet
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { RECENT_TRANSACTIONS, RECENT_ACTIVITIES } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';
import { exportTransactionsToCSV } from '../../utils/exportCsv';
import { useToast } from '../../context/ToastContext';

export default function RecentActivity() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' | 'activity'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return RECENT_TRANSACTIONS.filter((tx) => {
      const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
      const matchesSearch =
        tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  // Handle real CSV export
  const handleExportCSV = () => {
    exportTransactionsToCSV(filteredTransactions, `nexora-transactions-${new Date().toISOString().split('T')[0]}.csv`);
    addToast({
      title: 'CSV Export Complete',
      message: `Exported ${filteredTransactions.length} transaction records to CSV.`,
      type: 'success',
      duration: 3000
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'upgrade':
      case 'expansion':
        return <ArrowUpRight size={14} style={{ color: 'var(--brand-primary)' }} />;
      case 'renewal':
        return <RefreshCw size={14} style={{ color: 'var(--success-text)' }} />;
      case 'signup':
        return <UserPlus size={14} style={{ color: 'var(--info-text)' }} />;
      case 'payment':
        return <CreditCard size={14} style={{ color: 'var(--warning-text)' }} />;
      default:
        return <CheckCircle2 size={14} style={{ color: 'var(--success-text)' }} />;
    }
  };

  return (
    <div className="nex-card recent-activity-card">
      {/* Top Header & Tab Switcher */}
      <div className="nex-card-header" style={{ flexWrap: 'wrap', gap: '0.75rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="activity-tabs-container">
            <button
              className={`activity-tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
              onClick={() => setActiveTab('transactions')}
            >
              <Receipt size={14} />
              <span>Recent Invoices</span>
              <span className="tab-counter-badge">{RECENT_TRANSACTIONS.length}</span>
            </button>
            <button
              className={`activity-tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <Clock size={14} />
              <span>Platform Activity</span>
              <span className="tab-counter-badge">{RECENT_ACTIVITIES.length}</span>
            </button>
          </div>
        </div>

        {/* Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {activeTab === 'transactions' && (
            <>
              {/* Quick Search */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.3rem 0.6rem'
                }}
              >
                <Search size={13} style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Filter by customer, invoice..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.75rem',
                    width: '140px'
                  }}
                />
              </div>

              {/* Status Filter Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                {['All', 'Paid', 'Refunded'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    style={{
                      border: 'none',
                      background: statusFilter === status ? 'var(--bg-muted)' : 'transparent',
                      color: statusFilter === status ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Functional CSV Export Button */}
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleExportCSV}
                title="Download transactions as CSV file"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem', gap: '0.35rem' }}
              >
                <FileSpreadsheet size={13} />
                <span>Export CSV</span>
              </button>
            </>
          )}

          <NavLink to="/subscriptions" className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem', gap: '0.3rem' }}>
            <span>Subscriptions</span>
            <ExternalLink size={12} />
          </NavLink>
        </div>
      </div>

      {/* Tab 1: Real-World Invoices & Transactions Table */}
      {activeTab === 'transactions' && (
        <div style={{ overflowX: 'auto' }}>
          {filteredTransactions.length === 0 ? (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Receipt size={32} style={{ margin: '0 auto 0.5rem auto', opacity: 0.3 }} />
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                No invoices match "{searchQuery}"
              </p>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
                style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Invoice / Customer</th>
                  <th>Plan Tier</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Date</th>
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
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.8125rem' }}>
                            {tx.customer}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {tx.company} • <span style={{ fontFamily: 'var(--font-mono)' }}>{tx.id}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                        {tx.plan}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {tx.method}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td>
                      {tx.status === 'Paid' ? (
                        <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                          <CheckCircle2 size={10} /> Paid
                        </span>
                      ) : (
                        <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                          Refunded
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {tx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
