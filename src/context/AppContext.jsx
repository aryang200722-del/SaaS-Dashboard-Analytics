import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';
import {
  INITIAL_USER,
  INITIAL_NOTIFICATIONS,
  INITIAL_CUSTOMERS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_PROJECTS
} from '../data/mockData';
import { useToast } from './ToastContext';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { addToast } = useToast();

  // Initialize data in localStorage if not already present
  const [user, setUser] = useState(() => storage.get('user', INITIAL_USER));
  const [notifications, setNotifications] = useState(() => storage.get('notifications', INITIAL_NOTIFICATIONS));
  const [customers, setCustomers] = useState(() => storage.get('customers', INITIAL_CUSTOMERS));
  const [subscriptions, setSubscriptions] = useState(() => storage.get('subscriptions', INITIAL_SUBSCRIPTIONS));
  const [projects, setProjects] = useState(() => storage.get('projects', INITIAL_PROJECTS));

  // UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => storage.get('sidebar_collapsed', false));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('30d'); // '7d' | '30d' | '90d' | 'year'

  // Persist state updates to localStorage
  useEffect(() => {
    storage.set('user', user);
  }, [user]);

  useEffect(() => {
    storage.set('notifications', notifications);
  }, [notifications]);

  useEffect(() => {
    storage.set('customers', customers);
  }, [customers]);

  useEffect(() => {
    storage.set('subscriptions', subscriptions);
  }, [subscriptions]);

  useEffect(() => {
    storage.set('projects', projects);
  }, [projects]);

  useEffect(() => {
    storage.set('sidebar_collapsed', sidebarCollapsed);
  }, [sidebarCollapsed]);

  // Sidebar toggle
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  // Update user profile
  const updateUserProfile = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      addToast({
        title: 'Profile Updated',
        message: 'Your profile settings have been saved.',
        type: 'success'
      });
      return updated;
    });
  }, [addToast]);

  // Notifications management
  const markNotificationAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    addToast({
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.',
      type: 'info'
    });
  }, [addToast]);

  const clearNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  // Reset demo data
  const resetDemoData = useCallback(() => {
    storage.clearNexora();
    setUser(INITIAL_USER);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCustomers(INITIAL_CUSTOMERS);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setProjects(INITIAL_PROJECTS);
    setSidebarCollapsed(false);

    addToast({
      title: 'Demo Data Reset',
      message: 'All application state and sample data have been reset to factory defaults.',
      type: 'success'
    });
  }, [addToast]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        updateUserProfile,
        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotification,
        customers,
        setCustomers,
        subscriptions,
        setSubscriptions,
        projects,
        setProjects,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        mobileMenuOpen,
        setMobileMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        dateFilter,
        setDateFilter,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
