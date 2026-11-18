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
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

export default function Settings() {
  const { user, updateUserProfile, resetDemoData } = useApp();
  const { theme, toggleTheme, isDark } = useTheme();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    company: user.company,
    role: user.role,
    timezone: user.timezone || 'UTC -05:00 (EST)'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        timezone: 'UTC -05:00 (EST)'
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
              Customize your profile, display preferences, and manage client-side storage states.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
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
                  Work Email
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
                    Role / Title
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
                    Company
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

        {/* Preferences & Storage Control */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Appearance Card */}
          <div className="nex-card">
            <div className="nex-card-header">
              <span className="nex-card-title">
                {isDark ? <Moon size={18} style={{ color: 'var(--brand-primary)' }} /> : <Sun size={18} style={{ color: 'var(--warning-text)' }} />}
                <span>Appearance & Theme</span>
              </span>
              <span className="badge badge-info">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <div className="nex-card-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Toggle between premium dark and light high-contrast themes. Your preference is persisted in browser storage.
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

          {/* Reset Demo Data Card */}
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
                Reset customers, subscriptions, projects, and settings back to default seed records.
              </p>
              <button type="button" className="btn btn-secondary" onClick={handleResetData} style={{ color: 'var(--warning-text)' }}>
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
