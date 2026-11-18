import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Mail,
  Building,
  Shield,
  Moon,
  Sun,
  RefreshCw,
  Save,
  Bell,
  Globe,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

export default function Settings() {
  const { user, updateUserProfile, resetDemoData } = useApp();
  const { theme, toggleTheme, isDark } = useTheme();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    company: user.company || '',
    role: user.role || '',
    avatar: user.avatar || '',
    timezone: user.timezone || 'UTC -05:00 (EST)',
    currency: user.currency || 'USD',
    emailNotifications: user.emailNotifications ?? true,
    desktopNotifications: user.desktopNotifications ?? true,
    marketingEmails: user.marketingEmails ?? false,
    twoFactorEnabled: user.twoFactorEnabled ?? true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to default values? This clears all local modifications.')) {
      resetDemoData();
      setFormData({
        name: 'Alex Vance',
        email: 'alex.vance@nexora.io',
        company: 'Nexora Cloud Inc.',
        role: 'Founder & CEO',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        timezone: 'UTC -05:00 (EST)',
        currency: 'USD',
        emailNotifications: true,
        desktopNotifications: true,
        marketingEmails: false,
        twoFactorEnabled: true
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="breadcrumbs">
          <span>Nexora Cloud</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Settings</span>
        </div>
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Platform & Profile Settings</h1>
            <p className="page-description">
              Manage your personal credentials, workspace preferences, notification feeds, and local storage state.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Profile Card */}
        <div className="nex-card">
          <div className="nex-card-header">
            <span className="nex-card-title">
              <User size={18} style={{ color: 'var(--brand-primary)' }} />
              <span>User Profile Information</span>
            </span>
            <span className="badge badge-success">Persisted</span>
          </div>
          <div className="nex-card-body">
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Avatar Preview */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--brand-primary)'
                  }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                    Avatar Image URL
                  </label>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.45rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-default)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      fontSize: '0.8125rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Display Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-default)',
                    background: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Work Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-default)',
                    background: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Title / Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-default)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-default)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary">
                  <Save size={15} />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preferences & System Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Appearance Card */}
          <div className="nex-card">
            <div className="nex-card-header">
              <span className="nex-card-title">
                {isDark ? <Moon size={18} style={{ color: 'var(--brand-primary)' }} /> : <Sun size={18} style={{ color: 'var(--warning-text)' }} />}
                <span>Interface Theme</span>
              </span>
              <span className="badge badge-info">{isDark ? 'Dark Theme' : 'Light Theme'}</span>
            </div>
            <div className="nex-card-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Select your preferred dashboard appearance. The theme is automatically saved to LocalStorage.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  className={`btn ${isDark ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => !isDark && toggleTheme()}
                >
                  <Moon size={15} />
                  <span>Dark Mode</span>
                </button>
                <button
                  type="button"
                  className={`btn ${!isDark ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => isDark && toggleTheme()}
                >
                  <Sun size={15} />
                  <span>Light Mode</span>
                </button>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="nex-card">
            <div className="nex-card-header">
              <span className="nex-card-title">
                <Bell size={18} style={{ color: 'var(--info-text)' }} />
                <span>Notification Preferences</span>
              </span>
              <span className="badge badge-neutral">Preferences</span>
            </div>
            <div className="nex-card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)', display: 'block' }}>Email Billing Invoices</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Send PDF receipts for all successful client transactions</span>
                  </div>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--brand-primary)', width: '18px', height: '18px' }}
                  />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)', display: 'block' }}>Desktop Alerts</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Show popups for high-priority plan upgrades and spikes</span>
                  </div>
                  <input
                    type="checkbox"
                    name="desktopNotifications"
                    checked={formData.desktopNotifications}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--brand-primary)', width: '18px', height: '18px' }}
                  />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)', display: 'block' }}>Weekly Digest</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Receive an executive summary of MRR growth every Monday</span>
                  </div>
                  <input
                    type="checkbox"
                    name="marketingEmails"
                    checked={formData.marketingEmails}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--brand-primary)', width: '18px', height: '18px' }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Demo Data Reset Card */}
          <div className="nex-card">
            <div className="nex-card-header">
              <span className="nex-card-title">
                <RefreshCw size={18} style={{ color: 'var(--warning-text)' }} />
                <span>Demo Data Management</span>
              </span>
              <span className="badge badge-warning">LocalStorage</span>
            </div>
            <div className="nex-card-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Reset customers, subscriptions, projects, and custom changes back to the original demo values.
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleResetData}
                style={{ color: 'var(--warning-text)' }}
              >
                <RefreshCw size={15} />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
