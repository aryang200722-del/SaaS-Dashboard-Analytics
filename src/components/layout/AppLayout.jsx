import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import GlobalSearchModal from './GlobalSearchModal';
import ToastContainer from '../common/ToastContainer';
import { useApp } from '../../context/AppContext';

export default function AppLayout() {
  const { sidebarCollapsed, mobileMenuOpen, setMobileMenuOpen } = useApp();

  return (
    <div className={`app-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Main Sidebar */}
      <Sidebar />

      {/* Main Content Viewport */}
      <div className="main-wrapper">
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      {/* Command Palette / Global Search Modal */}
      <GlobalSearchModal />

      {/* Floating Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
}
