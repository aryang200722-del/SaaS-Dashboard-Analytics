import React, { useState, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  Edit2,
  Trash2,
  Building,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Ban
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import CustomerModal from '../components/customers/CustomerModal';

export default function Customers() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useApp();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');

  // Sorting state
  const [sortField, setSortField] = useState('totalRevenue');
  const [sortAsc, setSortAsc] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Filtering & Sorting
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      const matchesSearch =
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || cust.status === statusFilter;
      const matchesPlan = planFilter === 'All' || cust.subscriptionPlan === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [customers, searchTerm, statusFilter, planFilter, sortField, sortAsc]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCustomers.length / pageSize) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
    setCurrentPage(1);
  };

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cust) => {
    setEditingCustomer(cust);
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This will also remove associated subscriptions.`)) {
      deleteCustomer(id);
    }
  };

  const handleModalSubmit = (formData) => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="badge badge-success"><CheckCircle2 size={12} /> Active</span>;
      case 'Trial':
        return <span className="badge badge-primary"><Clock size={12} /> Trial</span>;
      case 'Inactive':
      default:
        return <span className="badge badge-neutral"><Ban size={12} /> Inactive</span>;
    }
  };

  const renderPlanBadge = (plan) => {
    switch (plan) {
      case 'Enterprise':
        return <span className="badge badge-primary">{plan}</span>;
      case 'Professional':
        return <span className="badge badge-info">{plan}</span>;
      case 'Starter':
        return <span className="badge badge-warning">{plan}</span>;
      default:
        return <span className="badge badge-neutral">{plan}</span>;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span>Nexora Cloud</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Customers</span>
        </div>
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Customer Directory</h1>
            <p className="page-description">
              Manage client accounts, contract tiers, lifetime revenue, and subscription health.
            </p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary" onClick={handleOpenAdd}>
              <Plus size={16} />
              <span>Add Customer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search, Filters, Page Size */}
      <div
        className="nex-card"
        style={{
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '260px' }}>
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
              maxWidth: '380px'
            }}
          >
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
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

        {/* Filter Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <Filter size={14} />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
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
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <span>Plan:</span>
            <select
              value={planFilter}
              onChange={(e) => {
                setPlanFilter(e.target.value);
                setCurrentPage(1);
              }}
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
              <option value="All">All Plans</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Professional">Professional</option>
              <option value="Starter">Starter</option>
              <option value="Free">Free</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Data Table */}
      <div className="nex-card" style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-default)' }}>
                <th
                  onClick={() => handleSort('name')}
                  style={{ padding: '0.85rem 1.25rem', cursor: 'pointer', fontWeight: 600, color: 'var(--text-muted)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>Customer</span>
                    <ArrowUpDown size={13} style={{ opacity: sortField === 'name' ? 1 : 0.4 }} />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('company')}
                  style={{ padding: '0.85rem 1.25rem', cursor: 'pointer', fontWeight: 600, color: 'var(--text-muted)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>Company</span>
                    <ArrowUpDown size={13} style={{ opacity: sortField === 'company' ? 1 : 0.4 }} />
                  </div>
                </th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>Contact</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>Plan</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
                <th
                  onClick={() => handleSort('totalRevenue')}
                  style={{ padding: '0.85rem 1.25rem', cursor: 'pointer', fontWeight: 600, color: 'var(--text-muted)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>Total Revenue</span>
                    <ArrowUpDown size={13} style={{ opacity: sortField === 'totalRevenue' ? 1 : 0.4 }} />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('registrationDate')}
                  style={{ padding: '0.85rem 1.25rem', cursor: 'pointer', fontWeight: 600, color: 'var(--text-muted)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>Registered</span>
                    <ArrowUpDown size={13} style={{ opacity: sortField === 'registrationDate' ? 1 : 0.4 }} />
                  </div>
                </th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <Users size={36} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
                    <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>No customers match your search criteria</p>
                    <p style={{ fontSize: '0.8rem' }}>Try clearing filters or registering a new customer.</p>
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background-color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cust.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {cust.id}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Building size={14} style={{ color: 'var(--text-muted)' }} />
                        <span>{cust.company}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{cust.email}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cust.phone}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      {renderPlanBadge(cust.subscriptionPlan)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      {renderStatusBadge(cust.status)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {formatCurrency(cust.totalRevenue)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                      {formatDate(cust.registrationDate)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                        <button
                          className="btn-icon"
                          style={{ width: '30px', height: '30px' }}
                          onClick={() => handleOpenEdit(cust)}
                          title="Edit Customer"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn-icon"
                          style={{ width: '30px', height: '30px', color: 'var(--danger-text)' }}
                          onClick={() => handleDelete(cust.id, cust.name)}
                          title="Delete Customer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            Showing{' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              {filteredCustomers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </strong>{' '}
            to{' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              {Math.min(currentPage * pageSize, filteredCustomers.length)}
            </strong>{' '}
            of <strong style={{ color: 'var(--text-primary)' }}>{filteredCustomers.length}</strong> customers
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  padding: '0.2rem 0.4rem',
                  fontSize: '0.8125rem'
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                className="btn-icon"
                style={{ width: '30px', height: '30px' }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} />
              </button>
              <span>
                Page <strong style={{ color: 'var(--text-primary)' }}>{currentPage}</strong> of{' '}
                <strong style={{ color: 'var(--text-primary)' }}>{totalPages}</strong>
              </span>
              <button
                className="btn-icon"
                style={{ width: '30px', height: '30px' }}
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Customer Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingCustomer}
      />
    </div>
  );
}
