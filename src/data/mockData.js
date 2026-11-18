/**
 * Nexora SaaS Mock Data & Seed Values
 */

export const INITIAL_USER = {
  name: 'Alex Vance',
  email: 'alex.vance@nexora.io',
  role: 'Founder & CEO',
  company: 'Nexora Cloud Inc.',
  plan: 'Enterprise',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  themePreference: 'dark',
  emailNotifications: true,
  desktopNotifications: true,
  marketingEmails: false,
  twoFactorEnabled: true,
  timezone: 'UTC -05:00 (EST)'
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Enterprise Upgrade',
    message: 'Acme Corp upgraded to Enterprise Annual tier ($4,800/mo).',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 mins ago
    read: false
  },
  {
    id: 'notif-2',
    title: 'Invoice Settled',
    message: 'Stripe processed payout #INV-2026-891 for $28,450.00.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    read: false
  },
  {
    id: 'notif-3',
    title: 'API Rate Spike',
    message: 'EU cluster reached 86% of max allocated burst throughput.',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    read: false
  },
  {
    id: 'notif-4',
    title: 'New Customer Registered',
    message: 'Horizon Robotics joined the Professional tier trial.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
    read: true
  },
  {
    id: 'notif-5',
    title: 'Weekly Automated Backup',
    message: 'Edge database snapshots verified and backed up successfully.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), // 1 day ago
    read: true
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Sarah Connor',
    email: 'sarah.c@cyberdyne.io',
    company: 'Cyberdyne Systems',
    phone: '+1 (555) 234-5678',
    registrationDate: '2026-01-14',
    subscriptionPlan: 'Enterprise',
    status: 'Active',
    totalRevenue: 28400
  },
  {
    id: 'cust-2',
    name: 'Marcus Chen',
    email: 'm.chen@hyperion.tech',
    company: 'Hyperion Data',
    phone: '+1 (555) 876-5432',
    registrationDate: '2026-02-03',
    subscriptionPlan: 'Professional',
    status: 'Active',
    totalRevenue: 8900
  },
  {
    id: 'cust-3',
    name: 'Elena Rostova',
    email: 'elena@novasoft.dev',
    company: 'NovaSoft Labs',
    phone: '+1 (555) 345-6789',
    registrationDate: '2026-02-19',
    subscriptionPlan: 'Starter',
    status: 'Active',
    totalRevenue: 1450
  },
  {
    id: 'cust-4',
    name: 'David Kim',
    email: 'dkim@vortexai.com',
    company: 'Vortex AI',
    phone: '+1 (555) 901-2345',
    registrationDate: '2026-03-01',
    subscriptionPlan: 'Enterprise',
    status: 'Active',
    totalRevenue: 34200
  },
  {
    id: 'cust-5',
    name: 'Amara Okafor',
    email: 'amara@solisgreen.co',
    company: 'Solis Energy',
    phone: '+1 (555) 432-1098',
    registrationDate: '2026-03-12',
    subscriptionPlan: 'Professional',
    status: 'Inactive',
    totalRevenue: 4200
  },
  {
    id: 'cust-6',
    name: 'Liam Gallagher',
    email: 'liam@pulseflow.io',
    company: 'PulseFlow Logistics',
    phone: '+1 (555) 654-9870',
    registrationDate: '2026-03-25',
    subscriptionPlan: 'Starter',
    status: 'Active',
    totalRevenue: 2100
  },
  {
    id: 'cust-7',
    name: 'Zoe Deschanel',
    email: 'zoe@lumina.design',
    company: 'Lumina Creative',
    phone: '+1 (555) 789-0123',
    registrationDate: '2026-04-04',
    subscriptionPlan: 'Free',
    status: 'Trial',
    totalRevenue: 0
  },
  {
    id: 'cust-8',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@skylinecapital.ae',
    company: 'Skyline Capital',
    phone: '+971 4 555 1234',
    registrationDate: '2026-04-18',
    subscriptionPlan: 'Enterprise',
    status: 'Active',
    totalRevenue: 51200
  }
];

export const INITIAL_SUBSCRIPTIONS = [
  {
    id: 'sub-1',
    customerId: 'cust-1',
    customerName: 'Sarah Connor',
    company: 'Cyberdyne Systems',
    plan: 'Enterprise',
    billingCycle: 'Monthly',
    price: 999,
    status: 'Active',
    renewalDate: '2026-12-14',
    startDate: '2026-01-14'
  },
  {
    id: 'sub-2',
    customerId: 'cust-2',
    customerName: 'Marcus Chen',
    company: 'Hyperion Data',
    plan: 'Professional',
    billingCycle: 'Monthly',
    price: 299,
    status: 'Active',
    renewalDate: '2026-12-03',
    startDate: '2026-02-03'
  },
  {
    id: 'sub-3',
    customerId: 'cust-3',
    customerName: 'Elena Rostova',
    company: 'NovaSoft Labs',
    plan: 'Starter',
    billingCycle: 'Monthly',
    price: 49,
    status: 'Active',
    renewalDate: '2026-11-19',
    startDate: '2026-02-19'
  },
  {
    id: 'sub-4',
    customerId: 'cust-4',
    customerName: 'David Kim',
    company: 'Vortex AI',
    plan: 'Enterprise',
    billingCycle: 'Annual',
    price: 9990,
    status: 'Active',
    renewalDate: '2027-03-01',
    startDate: '2026-03-01'
  },
  {
    id: 'sub-5',
    customerId: 'cust-5',
    customerName: 'Amara Okafor',
    company: 'Solis Energy',
    plan: 'Professional',
    billingCycle: 'Monthly',
    price: 299,
    status: 'Cancelled',
    renewalDate: '2026-08-12',
    startDate: '2026-03-12'
  },
  {
    id: 'sub-6',
    customerId: 'cust-6',
    customerName: 'Liam Gallagher',
    company: 'PulseFlow Logistics',
    plan: 'Starter',
    billingCycle: 'Monthly',
    price: 49,
    status: 'Active',
    renewalDate: '2026-11-25',
    startDate: '2026-03-25'
  },
  {
    id: 'sub-7',
    customerId: 'cust-7',
    customerName: 'Zoe Deschanel',
    company: 'Lumina Creative',
    plan: 'Free',
    billingCycle: 'Monthly',
    price: 0,
    status: 'Trial',
    renewalDate: '2026-11-30',
    startDate: '2026-04-04'
  },
  {
    id: 'sub-8',
    customerId: 'cust-8',
    customerName: 'Tariq Al-Mansoor',
    company: 'Skyline Capital',
    plan: 'Enterprise',
    billingCycle: 'Monthly',
    price: 1499,
    status: 'Active',
    renewalDate: '2026-12-18',
    startDate: '2026-04-18'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Multi-Tenant Auth Migration',
    client: 'Cyberdyne Systems',
    status: 'In Progress',
    progress: 72,
    priority: 'High',
    deadline: '2026-12-10',
    team: ['Alex V.', 'Marcus C.', 'Elena R.'],
    budget: 35000
  },
  {
    id: 'proj-2',
    name: 'AI Analytics Pipeline v2',
    client: 'Vortex AI',
    status: 'In Progress',
    progress: 45,
    priority: 'Critical',
    deadline: '2027-01-15',
    team: ['Alex V.', 'David K.'],
    budget: 68000
  },
  {
    id: 'proj-3',
    name: 'Stripe Billing Re-architecture',
    client: 'Internal Platform',
    status: 'Completed',
    progress: 100,
    priority: 'Medium',
    deadline: '2026-10-30',
    team: ['Alex V.'],
    budget: 18000
  },
  {
    id: 'proj-4',
    name: 'Customer Health Score Engine',
    client: 'NovaSoft Labs',
    status: 'Not Started',
    progress: 0,
    priority: 'Medium',
    deadline: '2027-02-28',
    team: ['Marcus C.'],
    budget: 24000
  },
  {
    id: 'proj-5',
    name: 'SOC-2 Compliance Automation',
    client: 'Skyline Capital',
    status: 'On Hold',
    progress: 30,
    priority: 'Low',
    deadline: '2027-04-01',
    team: ['Alex V.', 'Tariq A.'],
    budget: 42000
  }
];

export const SEARCHABLE_ITEMS = [
  { id: 'p-1', title: 'Overview Dashboard', category: 'Pages', path: '/', icon: 'LayoutDashboard' },
  { id: 'p-2', title: 'Customer Management', category: 'Pages', path: '/customers', icon: 'Users' },
  { id: 'p-3', title: 'Subscription Management', category: 'Pages', path: '/subscriptions', icon: 'CreditCard' },
  { id: 'p-4', title: 'Project Management', category: 'Pages', path: '/projects', icon: 'FolderKanban' },
  { id: 'p-5', title: 'Analytics & Trends', category: 'Pages', path: '/analytics', icon: 'BarChart3' },
  { id: 'p-6', title: 'Settings & Profile', category: 'Pages', path: '/settings', icon: 'Settings' },
  { id: 'c-1', title: 'Cyberdyne Systems (Sarah Connor)', category: 'Customers', path: '/customers', icon: 'Building' },
  { id: 'c-2', title: 'Hyperion Data (Marcus Chen)', category: 'Customers', path: '/customers', icon: 'Building' },
  { id: 'c-3', title: 'Vortex AI (David Kim)', category: 'Customers', path: '/customers', icon: 'Building' },
  { id: 'pr-1', title: 'Multi-Tenant Auth Migration', category: 'Projects', path: '/projects', icon: 'Layers' },
  { id: 'pr-2', title: 'AI Analytics Pipeline v2', category: 'Projects', path: '/projects', icon: 'Layers' },
  { id: 's-1', title: 'Reset Demo Data to Defaults', category: 'Actions', action: 'reset_data', icon: 'RefreshCw' },
  { id: 's-2', title: 'Toggle Light / Dark Mode', category: 'Actions', action: 'toggle_theme', icon: 'Moon' }
];
