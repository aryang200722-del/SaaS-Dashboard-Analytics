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
  timezone: 'UTC -05:00 (EST)',
  currency: 'USD'
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
  },
  {
    id: 'cust-9',
    name: 'Aria Montgomery',
    email: 'aria@omnistream.net',
    company: 'OmniStream Media',
    phone: '+1 (555) 678-9012',
    registrationDate: '2026-05-11',
    subscriptionPlan: 'Professional',
    status: 'Active',
    totalRevenue: 6400
  },
  {
    id: 'cust-10',
    name: 'Lucas Silva',
    email: 'lucas@aurorapay.br',
    company: 'Aurora FinTech',
    phone: '+55 11 98765-4321',
    registrationDate: '2026-06-02',
    subscriptionPlan: 'Starter',
    status: 'Active',
    totalRevenue: 1980
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
  },
  {
    id: 'sub-9',
    customerId: 'cust-9',
    customerName: 'Aria Montgomery',
    company: 'OmniStream Media',
    plan: 'Professional',
    billingCycle: 'Monthly',
    price: 299,
    status: 'Active',
    renewalDate: '2026-12-11',
    startDate: '2026-05-11'
  },
  {
    id: 'sub-10',
    customerId: 'cust-10',
    customerName: 'Lucas Silva',
    company: 'Aurora FinTech',
    plan: 'Starter',
    billingCycle: 'Monthly',
    price: 49,
    status: 'Active',
    renewalDate: '2026-12-02',
    startDate: '2026-06-02'
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

export const RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    user: 'Sarah Connor',
    action: 'upgraded to Enterprise Annual Plan',
    amount: '$9,990',
    type: 'upgrade',
    time: '14 minutes ago'
  },
  {
    id: 'act-2',
    user: 'David Kim',
    action: 'renewed Enterprise Tier for 12 months',
    amount: '$11,988',
    type: 'renewal',
    time: '1 hour ago'
  },
  {
    id: 'act-3',
    user: 'Aria Montgomery',
    action: 'registered new workspace OmniStream Media',
    amount: 'Trial',
    type: 'signup',
    time: '3 hours ago'
  },
  {
    id: 'act-4',
    user: 'Marcus Chen',
    action: 'added 5 developer seats to Hyperion Data',
    amount: '$450/mo',
    type: 'upgrade',
    time: '5 hours ago'
  },
  {
    id: 'act-5',
    user: 'Elena Rostova',
    action: 'settled monthly recurring invoice #INV-4019',
    amount: '$49',
    type: 'payment',
    time: '8 hours ago'
  },
  {
    id: 'act-6',
    user: 'Lucas Silva',
    action: 'converted from Starter Trial to Paid Starter',
    amount: '$49/mo',
    type: 'conversion',
    time: '1 day ago'
  }
];

// Analytics & KPI Datasets per Date Range (7d, 30d, 90d, year)
export const DASHBOARD_METRICS = {
  '7d': {
    kpis: {
      totalRevenue: { value: 34250, change: 8.4, isPositive: true },
      mrr: { value: 24800, change: 2.1, isPositive: true },
      totalCustomers: { value: 1429, change: 3.2, isPositive: true },
      activeSubscriptions: { value: 1280, change: 2.8, isPositive: true },
      churnRate: { value: 1.4, change: -0.3, isPositive: true }, // lower churn is positive
      arpu: { value: 98, change: 1.9, isPositive: true }
    },
    revenueOverTime: [
      { date: 'Mon', revenue: 4200, target: 4000 },
      { date: 'Tue', revenue: 4800, target: 4200 },
      { date: 'Wed', revenue: 5100, target: 4500 },
      { date: 'Thu', revenue: 4600, target: 4300 },
      { date: 'Fri', revenue: 5900, target: 4800 },
      { date: 'Sat', revenue: 4400, target: 4100 },
      { date: 'Sun', revenue: 5250, target: 4400 }
    ],
    monthlySales: [
      { name: 'Mon', sales: 12, deals: 4 },
      { name: 'Tue', sales: 16, deals: 6 },
      { name: 'Wed', sales: 19, deals: 7 },
      { name: 'Thu', sales: 14, deals: 5 },
      { name: 'Fri', sales: 24, deals: 9 },
      { name: 'Sat', sales: 11, deals: 3 },
      { name: 'Sun', sales: 15, deals: 5 }
    ],
    customerAcquisition: [
      { period: 'Day 1', organic: 18, paid: 12 },
      { period: 'Day 2', organic: 22, paid: 14 },
      { period: 'Day 3', organic: 25, paid: 19 },
      { period: 'Day 4', organic: 20, paid: 15 },
      { period: 'Day 5', organic: 31, paid: 22 },
      { period: 'Day 6', organic: 19, paid: 11 },
      { period: 'Day 7', organic: 27, paid: 16 }
    ]
  },
  '30d': {
    kpis: {
      totalRevenue: { value: 128450, change: 14.2, isPositive: true },
      mrr: { value: 24800, change: 8.6, isPositive: true },
      totalCustomers: { value: 1429, change: 12.4, isPositive: true },
      activeSubscriptions: { value: 1280, change: 9.1, isPositive: true },
      churnRate: { value: 1.8, change: -0.4, isPositive: true },
      arpu: { value: 102, change: 5.2, isPositive: true }
    },
    revenueOverTime: [
      { date: 'Week 1', revenue: 27500, target: 25000 },
      { date: 'Week 2', revenue: 31200, target: 28000 },
      { date: 'Week 3', revenue: 33900, target: 30000 },
      { date: 'Week 4', revenue: 35850, target: 32000 }
    ],
    monthlySales: [
      { name: 'Week 1', sales: 68, deals: 24 },
      { name: 'Week 2', sales: 84, deals: 31 },
      { name: 'Week 3', sales: 92, deals: 36 },
      { name: 'Week 4', sales: 105, deals: 42 }
    ],
    customerAcquisition: [
      { period: 'Week 1', organic: 75, paid: 48 },
      { period: 'Week 2', organic: 92, paid: 56 },
      { period: 'Week 3', organic: 108, paid: 64 },
      { period: 'Week 4', organic: 124, paid: 78 }
    ]
  },
  '90d': {
    kpis: {
      totalRevenue: { value: 364200, change: 22.8, isPositive: true },
      mrr: { value: 24800, change: 14.5, isPositive: true },
      totalCustomers: { value: 1429, change: 28.6, isPositive: true },
      activeSubscriptions: { value: 1280, change: 21.4, isPositive: true },
      churnRate: { value: 1.9, change: -0.2, isPositive: true },
      arpu: { value: 105, change: 8.1, isPositive: true }
    },
    revenueOverTime: [
      { date: 'Month 1', revenue: 108000, target: 95000 },
      { date: 'Month 2', revenue: 122000, target: 110000 },
      { date: 'Month 3', revenue: 134200, target: 125000 }
    ],
    monthlySales: [
      { name: 'Month 1', sales: 260, deals: 95 },
      { name: 'Month 2', sales: 310, deals: 118 },
      { name: 'Month 3', sales: 349, deals: 133 }
    ],
    customerAcquisition: [
      { period: 'Month 1', organic: 290, paid: 180 },
      { period: 'Month 2', organic: 340, paid: 215 },
      { period: 'Month 3', organic: 399, paid: 248 }
    ]
  },
  'year': {
    kpis: {
      totalRevenue: { value: 1420800, change: 36.4, isPositive: true },
      mrr: { value: 24800, change: 42.1, isPositive: true },
      totalCustomers: { value: 1429, change: 54.2, isPositive: true },
      activeSubscriptions: { value: 1280, change: 48.0, isPositive: true },
      churnRate: { value: 2.1, change: -0.8, isPositive: true },
      arpu: { value: 112, change: 14.8, isPositive: true }
    },
    revenueOverTime: [
      { date: 'Jan', revenue: 84000, target: 80000 },
      { date: 'Feb', revenue: 92000, target: 85000 },
      { date: 'Mar', revenue: 101000, target: 92000 },
      { date: 'Apr', revenue: 108000, target: 98000 },
      { date: 'May', revenue: 114000, target: 105000 },
      { date: 'Jun', revenue: 122000, target: 110000 },
      { date: 'Jul', revenue: 119000, target: 112000 },
      { date: 'Aug', revenue: 128000, target: 118000 },
      { date: 'Sep', revenue: 131000, target: 122000 },
      { date: 'Oct', revenue: 138000, target: 128000 },
      { date: 'Nov', revenue: 141000, target: 132000 },
      { date: 'Dec', revenue: 142800, target: 135000 }
    ],
    monthlySales: [
      { name: 'Q1', sales: 680, deals: 240 },
      { name: 'Q2', sales: 810, deals: 295 },
      { name: 'Q3', sales: 940, deals: 340 },
      { name: 'Q4', sales: 1060, deals: 390 }
    ],
    customerAcquisition: [
      { period: 'Q1', organic: 520, paid: 310 },
      { period: 'Q2', organic: 680, paid: 420 },
      { period: 'Q3', organic: 810, paid: 490 },
      { period: 'Q4', organic: 940, paid: 560 }
    ]
  }
};

export const SUBSCRIPTION_DISTRIBUTION = [
  { name: 'Free Tier', value: 420, color: '#94a3b8' },
  { name: 'Starter ($49)', value: 510, color: '#38bdf8' },
  { name: 'Professional ($299)', value: 240, color: '#6366f1' },
  { name: 'Enterprise ($999+)', value: 110, color: '#10b981' }
];
