import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  Users,
  CreditCard,
  FolderKanban,
  BarChart3,
  Settings,
  Building,
  Layers,
  RefreshCw,
  Moon,
  ArrowRight,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { SEARCHABLE_ITEMS } from '../../data/mockData';

export default function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, resetDemoData } = useApp();
  const { toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Handle Ctrl+K / Cmd+K and Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Filter items
  const filteredItems = SEARCHABLE_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    setIsSearchOpen(false);
    if (item.path) {
      navigate(item.path);
    } else if (item.action === 'reset_data') {
      resetDemoData();
    } else if (item.action === 'toggle_theme') {
      toggleTheme();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard size={16} />;
      case 'Users': return <Users size={16} />;
      case 'CreditCard': return <CreditCard size={16} />;
      case 'FolderKanban': return <FolderKanban size={16} />;
      case 'BarChart3': return <BarChart3 size={16} />;
      case 'Settings': return <Settings size={16} />;
      case 'Building': return <Building size={16} />;
      case 'Layers': return <Layers size={16} />;
      case 'RefreshCw': return <RefreshCw size={16} />;
      case 'Moon': return <Moon size={16} />;
      default: return <Search size={16} />;
    }
  };

  return (
    <div className="search-modal-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-input-wrapper">
          <Search size={20} style={{ color: 'var(--text-muted)' }} />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Type a command or search customers, pages, projects..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <button className="btn-icon" onClick={() => setIsSearchOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="search-modal-results">
          {filteredItems.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No matches found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`search-result-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
                  {renderIcon(item.icon)}
                </span>
                <span>{item.title}</span>
                <span className="search-result-badge">{item.category}</span>
                <ArrowRight size={14} style={{ opacity: idx === selectedIndex ? 1 : 0, marginLeft: '0.25rem' }} />
              </div>
            ))
          )}
        </div>

        <div className="search-modal-footer">
          <div className="keyboard-shortcut-hint">
            <span>Navigation:</span>
            <span className="key-cap">↑</span>
            <span className="key-cap">↓</span>
            <span>Select:</span>
            <span className="key-cap">↵</span>
          </div>
          <div className="keyboard-shortcut-hint">
            <span>Close:</span>
            <span className="key-cap">esc</span>
          </div>
        </div>
      </div>
    </div>
  );
}
