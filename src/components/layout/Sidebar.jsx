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
  Sparkles,
  Zap,
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
            <Zap size={18} fill="#ffffff" />
          </div>
          <div className="brand-text">
            <span className="brand-title">Nexora</span>
            <span className="brand-subtitle">Cloud Analytics</span>
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
                  <Icon size={19} />
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
          <div className="sidebar-section-title">Insights & System</div>
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
                  <Icon size={19} />
                </span>
                <span className="sidebar-item-label">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer with Collapse Toggle */}
      <div className="sidebar-footer">
        <button
          className="sidebar-collapse-btn"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <>
              <ChevronLeft size={18} />
              <span className="collapse-text">Collapse Menu</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
