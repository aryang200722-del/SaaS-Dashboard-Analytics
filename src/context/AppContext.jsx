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

  // -------------------------------------------------------------
  // CUSTOMER CRUD ACTIONS
  // -------------------------------------------------------------
  const addCustomer = useCallback((customerData) => {
    const newCustomer = {
      ...customerData,
      id: 'cust-' + Date.now(),
      registrationDate: customerData.registrationDate || new Date().toISOString().split('T')[0],
      totalRevenue: Number(customerData.totalRevenue) || 0
    };

    setCustomers((prev) => [newCustomer, ...prev]);

    // Also auto-create a corresponding subscription record if plan is not Free
    const newSub = {
      id: 'sub-' + Date.now(),
      customerId: newCustomer.id,
      customerName: newCustomer.name,
      company: newCustomer.company,
      plan: newCustomer.subscriptionPlan,
      billingCycle: 'Monthly',
      price: newCustomer.subscriptionPlan === 'Enterprise' ? 999 : newCustomer.subscriptionPlan === 'Professional' ? 299 : newCustomer.subscriptionPlan === 'Starter' ? 49 : 0,
      status: newCustomer.status === 'Trial' ? 'Trial' : 'Active',
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      startDate: newCustomer.registrationDate
    };
    setSubscriptions((prev) => [newSub, ...prev]);

    addToast({
      title: 'Customer Added',
      message: `${newCustomer.name} (${newCustomer.company}) was registered successfully.`,
      type: 'success'
    });
  }, [addToast]);

  const updateCustomer = useCallback((id, updates) => {
    setCustomers((prev) =>
      prev.map((cust) => (cust.id === id ? { ...cust, ...updates, totalRevenue: Number(updates.totalRevenue) || cust.totalRevenue } : cust))
    );

    // Sync company or name changes to subscriptions
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.customerId === id) {
          return {
            ...sub,
            customerName: updates.name || sub.customerName,
            company: updates.company || sub.company,
            plan: updates.subscriptionPlan || sub.plan,
            status: updates.status || sub.status
          };
        }
        return sub;
      })
    );

    addToast({
      title: 'Customer Updated',
      message: 'Account details and subscription status updated.',
      type: 'success'
    });
  }, [addToast]);

  const deleteCustomer = useCallback((id) => {
    const target = customers.find((c) => c.id === id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setSubscriptions((prev) => prev.filter((s) => s.customerId !== id));

    addToast({
      title: 'Customer Deleted',
      message: `${target?.name || 'Customer'} was removed from the database.`,
      type: 'info'
    });
  }, [customers, addToast]);

  // -------------------------------------------------------------
  // SUBSCRIPTION CRUD ACTIONS
  // -------------------------------------------------------------
  const addSubscription = useCallback((subData) => {
    const newSub = {
      ...subData,
      id: 'sub-' + Date.now(),
      price: Number(subData.price) || 0,
      startDate: subData.startDate || new Date().toISOString().split('T')[0],
      renewalDate: subData.renewalDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setSubscriptions((prev) => [newSub, ...prev]);

    addToast({
      title: 'Subscription Created',
      message: `New ${newSub.plan} subscription activated for ${newSub.customerName}.`,
      type: 'success'
    });
  }, [addToast]);

  const updateSubscriptionPlan = useCallback((subId, newPlan, newPrice, newCycle) => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id === subId) {
          return {
            ...sub,
            plan: newPlan,
            price: Number(newPrice) || sub.price,
            billingCycle: newCycle || sub.billingCycle,
            status: 'Active'
          };
        }
        return sub;
      })
    );

    // Sync customer plan
    const sub = subscriptions.find((s) => s.id === subId);
    if (sub?.customerId) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === sub.customerId ? { ...c, subscriptionPlan: newPlan } : c))
      );
    }

    addToast({
      title: 'Subscription Changed',
      message: `Plan upgraded/modified to ${newPlan}.`,
      type: 'success'
    });
  }, [subscriptions, addToast]);

  const cancelSubscription = useCallback((subId) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === subId ? { ...sub, status: 'Cancelled' } : sub))
    );

    const sub = subscriptions.find((s) => s.id === subId);
    if (sub?.customerId) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === sub.customerId ? { ...c, status: 'Inactive' } : c))
      );
    }

    addToast({
      title: 'Subscription Cancelled',
      message: 'Subscription has been cancelled and renewal suspended.',
      type: 'warning'
    });
  }, [subscriptions, addToast]);

  // -------------------------------------------------------------
  // PROJECT CRUD ACTIONS (For Stage 4)
  // -------------------------------------------------------------
  const addProject = useCallback((projectData) => {
    const newProj = {
      ...projectData,
      id: 'proj-' + Date.now(),
      progress: Number(projectData.progress) || 0,
      budget: Number(projectData.budget) || 0
    };
    setProjects((prev) => [newProj, ...prev]);
    addToast({
      title: 'Project Created',
      message: `Project "${newProj.name}" has been launched.`,
      type: 'success'
    });
  }, [addToast]);

  const updateProject = useCallback((id, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, progress: Number(updates.progress ?? p.progress) } : p))
    );
    addToast({
      title: 'Project Updated',
      message: 'Project milestones and progress saved.',
      type: 'success'
    });
  }, [addToast]);

  const deleteProject = useCallback((id) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    addToast({
      title: 'Project Deleted',
      message: `Project "${target?.name || 'Project'}" was removed.`,
      type: 'info'
    });
  }, [projects, addToast]);

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
        addCustomer,
        updateCustomer,
        deleteCustomer,
        subscriptions,
        addSubscription,
        updateSubscriptionPlan,
        cancelSubscription,
        projects,
        addProject,
        updateProject,
        deleteProject,
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
