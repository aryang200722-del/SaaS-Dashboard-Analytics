import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from '../common/ThemeToggle';
import NotificationPanel from '../common/NotificationPanel';
import UserProfileDropdown from '../common/UserProfileDropdown';

export default function Navbar() {
  const {
    user,
    unreadCount,
    setMobileMenuOpen,
    setIsSearchOpen
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Left Area: Mobile Trigger + Search */}
      <div className="navbar-left">
        <button
          className="btn-icon mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <Menu size={20} />
        </button>

        <button
          className="search-trigger-btn"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Open search palette"
        >
          <Search size={16} />
          <span className="search-trigger-text">Search anything in Nexora...</span>
          <span className="search-shortcut-badge">Ctrl K</span>
        </button>
      </div>

      {/* Right Area: Actions, Notifications, Theme, Profile */}
      <div className="navbar-right">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Popover */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn-icon"
            onClick={() => {
              setNotificationsOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            aria-label="View notifications"
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-primary)',
                  boxShadow: '0 0 6px var(--brand-primary)'
                }}
              />
            )}
          </button>
          <NotificationPanel
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
          />
        </div>

        {/* User Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="user-menu-btn"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotificationsOpen(false);
            }}
            aria-label="User profile options"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="user-avatar"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="user-details-compact">
              <span className="user-name-compact">{user.name}</span>
              <span className="user-role-compact">{user.role}</span>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)', marginLeft: '2px' }} />
          </button>
          <UserProfileDropdown
            isOpen={profileOpen}
            onClose={() => setProfileOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
