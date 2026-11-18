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
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    read: false
  },
  {
    id: 'notif-2',
    title: 'Invoice Settled',
    message: 'Stripe processed payout #INV-2026-891 for $28,450.00.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    read: false
  },
  {
    id: 'notif-3',
    title: 'API Rate Spike',
    message: 'EU cluster reached 86% of max allocated burst throughput.',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    read: false
  },
  {
    id: 'notif-4',
    title: 'New Customer Registered',
    message: 'Horizon Robotics joined the Professional tier trial.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    read: true
  },
  {
    id: 'notif-5',
    title: 'Weekly Automated Backup',
    message: 'Edge database snapshots verified and backed up successfully.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
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

export const RECENT_TRANSACTIONS = [
  {
    id: 'INV-2026-894',
    customer: 'Sarah Connor',
    company: 'Cyberdyne Systems',
    plan: 'Enterprise Annual',
    amount: 9990,
    status: 'Paid',
    method: 'Visa •••• 4242',
    date: '14m ago',
    type: 'Renewal'
  },
  {
    id: 'INV-2026-893',
    customer: 'David Kim',
    company: 'Vortex AI',
    plan: 'Enterprise Monthly',
    amount: 1499,
    status: 'Paid',
    method: 'Mastercard •••• 8821',
    date: '1h ago',
    type: 'Monthly'
  },
  {
    id: 'INV-2026-892',
    customer: 'Marcus Chen',
    company: 'Hyperion Data',
    plan: '5x Add-on Seats',
    amount: 450,
    status: 'Paid',
    method: 'Amex •••• 1004',
    date: '5h ago',
    type: 'Addon'
  },
  {
    id: 'INV-2026-891',
    customer: 'Elena Rostova',
    company: 'NovaSoft Labs',
    plan: 'Starter Monthly',
    amount: 49,
    status: 'Paid',
    method: 'Visa •••• 3019',
    date: '8h ago',
    type: 'Monthly'
  },
  {
    id: 'INV-2026-890',
    customer: 'Lucas Silva',
    company: 'Aurora FinTech',
    plan: 'Starter Monthly',
    amount: 49,
    status: 'Paid',
    method: 'Visa •••• 9920',
    date: '1d ago',
    type: 'Conversion'
  },
  {
    id: 'INV-2026-889',
    customer: 'Amara Okafor',
    company: 'Solis Energy',
    plan: 'Professional Monthly',
    amount: 299,
    status: 'Refunded',
    method: 'Mastercard •••• 5512',
    date: '2d ago',
    type: 'Refund'
  }
];

export const RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    user: 'Sarah Connor',
    action: 'upgraded to Enterprise Annual Plan',
    amount: '+$9,990/yr',
    type: 'upgrade',
    time: '14m ago'
  },
  {
    id: 'act-2',
    user: 'David Kim',
    action: 'renewed Enterprise Tier for 12 months',
    amount: '+$1,499/mo',
    type: 'renewal',
    time: '1h ago'
  },
  {
    id: 'act-3',
    user: 'Aria Montgomery',
    action: 'registered workspace OmniStream Media',
    amount: '14d Trial',
    type: 'signup',
    time: '3h ago'
  },
  {
    id: 'act-4',
    user: 'Marcus Chen',
    action: 'provisioned 5 developer API seats',
    amount: '+$450/mo',
    type: 'expansion',
    time: '5h ago'
  },
  {
    id: 'act-5',
    user: 'Elena Rostova',
    action: 'settled automated invoice #INV-2026-891',
    amount: '$49.00',
    type: 'payment',
    time: '8h ago'
  },
  {
    id: 'act-6',
    user: 'Lucas Silva',
    action: 'converted from Starter Trial to Paid Plan',
    amount: '+$49/mo',
    type: 'conversion',
    time: '1d ago'
  }
];

// Analytics & KPI Datasets per Date Range (7d, 30d, 90d, year)
export const DASHBOARD_METRICS = {
  '7d': {
    context: {
      periodLabel: 'Nov 11 – Nov 18, 2026',
      runRate: '$1.78M ARR',
      quotaPacing: '104% of weekly target',
      avgVelocity: '$4,892 / day'
    },
    kpis: {
      totalRevenue: {
        value: 34250,
        change: 8.4,
        isPositive: true,
        comparison: '+$2,650 vs previous 7d',
        secondaryContext: '104% to quota'
      },
      mrr: {
        value: 24800,
        change: 2.1,
        isPositive: true,
        comparison: '+$510 net new MRR',
        secondaryContext: '102.1% net expansion'
      },
      totalCustomers: {
        value: 1429,
        change: 3.2,
        isPositive: true,
        comparison: '+44 new accounts',
        secondaryContext: '98.8% retention'
      },
      activeSubscriptions: {
        value: 1280,
        change: 2.8,
        isPositive: true,
        comparison: '+35 active plans',
        secondaryContext: '149 active trials'
      },
      churnRate: {
        value: 1.4,
        change: -0.3,
        isPositive: true,
        comparison: '0.3% below target',
        secondaryContext: 'Benchmark: <2.5%'
      },
      arpu: {
        value: 98,
        change: 1.9,
        isPositive: true,
        comparison: '+$1.80 per tenant',
        secondaryContext: 'Expansion driven'
      }
    },
    revenueOverTime: [
      { date: 'Mon', fullDate: 'Nov 12', revenue: 4200, target: 4000, variance: '+5.0%' },
      { date: 'Tue', fullDate: 'Nov 13', revenue: 4800, target: 4200, variance: '+14.3%' },
      { date: 'Wed', fullDate: 'Nov 14', revenue: 5100, target: 4500, variance: '+13.3%' },
      { date: 'Thu', fullDate: 'Nov 15', revenue: 4600, target: 4300, variance: '+7.0%' },
      { date: 'Fri', fullDate: 'Nov 16', revenue: 5900, target: 4800, variance: '+22.9%' },
      { date: 'Sat', fullDate: 'Nov 17', revenue: 4400, target: 4100, variance: '+7.3%' },
      { date: 'Sun', fullDate: 'Nov 18', revenue: 5250, target: 4400, variance: '+19.3%' }
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
    context: {
      periodLabel: 'Oct 19 – Nov 18, 2026',
      runRate: '$1.54M ARR',
      quotaPacing: '108% of monthly target',
      avgVelocity: '$4,281 / day'
    },
    kpis: {
      totalRevenue: {
        value: 128450,
        change: 14.2,
        isPositive: true,
        comparison: '+$15,920 vs previous 30d',
        secondaryContext: '108% to target'
      },
      mrr: {
        value: 24800,
        change: 8.6,
        isPositive: true,
        comparison: '+$1,960 net new MRR',
        secondaryContext: '106.8% net expansion'
      },
      totalCustomers: {
        value: 1429,
        change: 12.4,
        isPositive: true,
        comparison: '+158 new accounts',
        secondaryContext: '98.2% retention'
      },
      activeSubscriptions: {
        value: 1280,
        change: 9.1,
        isPositive: true,
        comparison: '+107 active plans',
        secondaryContext: '89.6% conversion'
      },
      churnRate: {
        value: 1.8,
        change: -0.4,
        isPositive: true,
        comparison: '0.4% below last period',
        secondaryContext: 'Benchmark: <2.5%'
      },
      arpu: {
        value: 102,
        change: 5.2,
        isPositive: true,
        comparison: '+$5.00 per tenant',
        secondaryContext: 'Tier expansion'
      }
    },
    revenueOverTime: [
      { date: 'Week 1', fullDate: 'Oct 19 – Oct 25', revenue: 27500, target: 25000, variance: '+10.0%' },
      { date: 'Week 2', fullDate: 'Oct 26 – Nov 01', revenue: 31200, target: 28000, variance: '+11.4%' },
      { date: 'Week 3', fullDate: 'Nov 02 – Nov 08', revenue: 33900, target: 30000, variance: '+13.0%' },
      { date: 'Week 4', fullDate: 'Nov 09 – Nov 18', revenue: 35850, target: 32000, variance: '+12.0%' }
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
    context: {
      periodLabel: 'Aug 20 – Nov 18, 2026',
      runRate: '$1.46M ARR',
      quotaPacing: '112% of quarterly target',
      avgVelocity: '$4,046 / day'
    },
    kpis: {
      totalRevenue: {
        value: 364200,
        change: 22.8,
        isPositive: true,
        comparison: '+$67,500 vs previous 90d',
        secondaryContext: '112% to target'
      },
      mrr: {
        value: 24800,
        change: 14.5,
        isPositive: true,
        comparison: '+$3,140 net new MRR',
        secondaryContext: '110.2% net expansion'
      },
      totalCustomers: {
        value: 1429,
        change: 28.6,
        isPositive: true,
        comparison: '+318 new accounts',
        secondaryContext: '97.9% retention'
      },
      activeSubscriptions: {
        value: 1280,
        change: 21.4,
        isPositive: true,
        comparison: '+225 active plans',
        secondaryContext: '89.6% conversion'
      },
      churnRate: {
        value: 1.9,
        change: -0.2,
        isPositive: true,
        comparison: '0.2% below target',
        secondaryContext: 'Benchmark: <2.5%'
      },
      arpu: {
        value: 105,
        change: 8.1,
        isPositive: true,
        comparison: '+$7.90 per tenant',
        secondaryContext: 'Multi-seat growth'
      }
    },
    revenueOverTime: [
      { date: 'Month 1', fullDate: 'August 2026', revenue: 108000, target: 95000, variance: '+13.7%' },
      { date: 'Month 2', fullDate: 'September 2026', revenue: 122000, target: 110000, variance: '+10.9%' },
      { date: 'Month 3', fullDate: 'October 2026', revenue: 134200, target: 125000, variance: '+7.4%' }
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
    context: {
      periodLabel: 'Calendar Year 2026 (YTD)',
      runRate: '$1.42M ARR',
      quotaPacing: '116% of annual quota',
      avgVelocity: '$3,914 / day'
    },
    kpis: {
      totalRevenue: {
        value: 1420800,
        change: 36.4,
        isPositive: true,
        comparison: '+$379,000 vs 2025',
        secondaryContext: '116% to quota'
      },
      mrr: {
        value: 24800,
        change: 42.1,
        isPositive: true,
        comparison: '+$7,350 net new MRR',
        secondaryContext: '118% NRR'
      },
      totalCustomers: {
        value: 1429,
        change: 54.2,
        isPositive: true,
        comparison: '+502 new accounts',
        secondaryContext: '98.2% retention'
      },
      activeSubscriptions: {
        value: 1280,
        change: 48.0,
        isPositive: true,
        comparison: '+415 active plans',
        secondaryContext: '89.6% conversion'
      },
      churnRate: {
        value: 2.1,
        change: -0.8,
        isPositive: true,
        comparison: '0.8% below 2025',
        secondaryContext: 'Benchmark: <2.5%'
      },
      arpu: {
        value: 112,
        change: 14.8,
        isPositive: true,
        comparison: '+$14.40 per tenant',
        secondaryContext: 'Enterprise expansion'
      }
    },
    revenueOverTime: [
      { date: 'Jan', fullDate: 'Jan 2026', revenue: 84000, target: 80000, variance: '+5.0%' },
      { date: 'Feb', fullDate: 'Feb 2026', revenue: 92000, target: 85000, variance: '+8.2%' },
      { date: 'Mar', fullDate: 'Mar 2026', revenue: 101000, target: 92000, variance: '+9.8%' },
      { date: 'Apr', fullDate: 'Apr 2026', revenue: 108000, target: 98000, variance: '+10.2%' },
      { date: 'May', fullDate: 'May 2026', revenue: 114000, target: 105000, variance: '+8.6%' },
      { date: 'Jun', fullDate: 'Jun 2026', revenue: 122000, target: 110000, variance: '+10.9%' },
      { date: 'Jul', fullDate: 'Jul 2026', revenue: 119000, target: 112000, variance: '+6.3%' },
      { date: 'Aug', fullDate: 'Aug 2026', revenue: 128000, target: 118000, variance: '+8.5%' },
      { date: 'Sep', fullDate: 'Sep 2026', revenue: 131000, target: 122000, variance: '+7.4%' },
      { date: 'Oct', fullDate: 'Oct 2026', revenue: 138000, target: 128000, variance: '+7.8%' },
      { date: 'Nov', fullDate: 'Nov 2026', revenue: 141000, target: 132000, variance: '+6.8%' },
      { date: 'Dec', fullDate: 'Dec 2026 (Est)', revenue: 142800, target: 135000, variance: '+5.8%' }
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
