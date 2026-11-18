import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, RefreshCw, LogOut, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function UserProfileDropdown({ isOpen, onClose }) {
  const { user, resetDemoData } = useApp();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  const handleReset = () => {
    onClose();
    if (window.confirm('Reset all demo data to default initial state? This clears your local changes.')) {
      resetDemoData();
    }
  };

  return (
    <div className="dropdown-menu profile-dropdown" ref={dropdownRef}>
      <div className="profile-dropdown-header">
        <div className="profile-dropdown-name">{user.name}</div>
        <div className="profile-dropdown-email">{user.email}</div>
        <div className="profile-dropdown-badge">
          <span className="badge badge-primary">
            <ShieldCheck size={12} />
            <span>{user.plan} Tier</span>
          </span>
        </div>
      </div>

      <button className="profile-dropdown-item" onClick={() => handleNavigate('/settings')}>
        <Settings size={15} />
        <span>Settings & Preferences</span>
      </button>

      <button className="profile-dropdown-item" onClick={() => handleNavigate('/analytics')}>
        <Sparkles size={15} />
        <span>Analytics Deep Dive</span>
      </button>

      <div className="profile-dropdown-divider" />

      <button className="profile-dropdown-item" onClick={handleReset} style={{ color: 'var(--warning-text)' }}>
        <RefreshCw size={15} />
        <span>Reset Demo Data</span>
      </button>

      <div className="profile-dropdown-divider" />

      <button
        className="profile-dropdown-item danger"
        onClick={() => {
          onClose();
          alert('Sign out triggered. (Frontend Demo Session)');
        }}
      >
        <LogOut size={15} />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
