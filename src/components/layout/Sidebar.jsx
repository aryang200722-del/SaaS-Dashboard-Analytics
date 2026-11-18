import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FolderKanban,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const {
    sidebarCollapsed,
    toggleSidebar,
    mobileMenuOpen,
    setMobileMenuOpen,
    customers,
    subscriptions,
    projects
  } = useApp();

  const navItems = [
    {
      to: '/',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/customers',
      label: 'Customers',
      icon: Users,
      badge: customers.length
    },
    {
      to: '/subscriptions',
      label: 'Subscriptions',
      icon: CreditCard,
      badge: subscriptions.filter((s) => s.status === 'Active').length
    },
    {
      to: '/projects',
      label: 'Projects',
      icon: FolderKanban,
      badge: projects.filter((p) => p.status === 'In Progress').length
    },
    {
      to: '/analytics',
      label: 'Analytics',
      icon: BarChart3,
      badge: null
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand-wrapper">
        <NavLink to="/" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-logo-icon">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="7" fill="url(#nexora-brand-grad)" />
              <path d="M9 23V9L16 18.5V9H23V23L16 13.5V23H9Z" fill="#FFFFFF" fillOpacity="0.96" />
              <defs>
                <linearGradient id="nexora-brand-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#4338CA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">Nexora</span>
            <span className="brand-subtitle">Cloud Intelligence</span>
          </div>
        </NavLink>

        {/* Mobile close button */}
        {mobileMenuOpen && (
          <button
            className="btn-icon mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="sidebar-nav-container">
        <div className="sidebar-section">
          <div className="sidebar-section-title">Platform</div>
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <span className="sidebar-item-icon">
                  <Icon size={18} />
                </span>
                <span className="sidebar-item-label">{item.label}</span>
                {item.badge !== null && (
                  <span className="sidebar-item-badge">{item.badge}</span>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Insights & Config</div>
          {navItems.slice(4).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <span className="sidebar-item-icon">
                  <Icon size={18} />
                </span>
                <span className="sidebar-item-label">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Workspace Status & Collapse Toggle */}
      <div className="sidebar-footer">
        {!sidebarCollapsed && (
          <div
            style={{
              padding: '0.5rem 0.65rem',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.25rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--success)',
                  boxShadow: '0 0 6px var(--success)',
                  display: 'inline-block'
                }}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Cluster us-east-1
              </span>
            </div>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              v2.4
            </span>
          </div>
        )}

        <button
          className="sidebar-collapse-btn"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={17} />
          ) : (
            <>
              <ChevronLeft size={17} />
              <span className="collapse-text">Collapse Menu</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
