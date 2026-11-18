/**
 * Nexora SaaS Mock Data & Seed Values
 * Verified mathematical consistency:
 * - 1,429 Total Customers = 1,280 Active Subscriptions + 149 Active Trials
 * - MRR ($108,200) * 12 = ARR ($1,298,400 ~ $1.30M ARR)
 * - ARPU = MRR ($108,200) / Active Subscriptions (1,280) = $84.53 (~$85/tenant)
 * - 30d Gross Volume = MRR ($108,200) + Add-ons & Usage ($20,250) = $128,450
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
    title: 'Enterprise Renewal Settled',
    message: 'Cyberdyne Systems completed their annual renewal (#INV-2026-894) for $9,990.00.',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    read: false
  },
  {
    id: 'notif-2',
    title: 'Automated Payout Processed',
    message: 'Stripe balance transfer #PO-88219 for $24,850.00 was sent to your linked operating account.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: false
  },
  {
    id: 'notif-3',
    title: 'Seat Expansion',
    message: 'Hyperion Data added 5 developer seats to their Professional cluster.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    read: false
  },
  {
    id: 'notif-4',
    title: 'New Trial Registration',
    message: 'Horizon Robotics initiated a 14-day trial of Professional tier.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 540).toISOString(),
    read: true
  },
  {
    id: 'notif-5',
    title: 'Weekly Snapshot Backup',
    message: 'Multi-region replica snapshots verified and stored in cold vault.',
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
    billingCycle: 'Annual',
    price: 9990,
    status: 'Active',
    renewalDate: '2027-01-14',
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
    renewalDate: '2026-12-19',
    startDate: '2026-02-19'
  },
  {
    id: 'sub-4',
    customerId: 'cust-4',
    customerName: 'David Kim',
    company: 'Vortex AI',
    plan: 'Enterprise',
    billingCycle: 'Monthly',
    price: 999,
    status: 'Active',
    renewalDate: '2026-12-01',
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
    renewalDate: '2026-12-25',
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
    amount: 9990.00,
    status: 'Paid',
    method: 'Visa •••• 4242',
    date: 'Today, 14:22',
    type: 'Renewal'
  },
  {
    id: 'INV-2026-893',
    customer: 'David Kim',
    company: 'Vortex AI',
    plan: 'Enterprise Monthly',
    amount: 999.00,
    status: 'Paid',
    method: 'Mastercard •••• 8821',
    date: 'Today, 13:05',
    type: 'Monthly'
  },
  {
    id: 'INV-2026-892',
    customer: 'Marcus Chen',
    company: 'Hyperion Data',
    plan: '5x Dev Seats Add-on',
    amount: 450.00,
    status: 'Paid',
    method: 'Amex •••• 1004',
    date: 'Today, 09:40',
    type: 'Add-on'
  },
  {
    id: 'INV-2026-891',
    customer: 'Elena Rostova',
    company: 'NovaSoft Labs',
    plan: 'Starter Monthly',
    amount: 49.00,
    status: 'Paid',
    method: 'Visa •••• 3019',
    date: 'Yesterday, 18:15',
    type: 'Monthly'
  },
  {
    id: 'INV-2026-890',
    customer: 'Lucas Silva',
    company: 'Aurora FinTech',
    plan: 'Starter Monthly',
    amount: 49.00,
    status: 'Paid',
    method: 'Visa •••• 9920',
    date: 'Yesterday, 11:20',
    type: 'Conversion'
  },
  {
    id: 'INV-2026-889',
    customer: 'Amara Okafor',
    company: 'Solis Energy',
    plan: 'Professional Monthly',
    amount: 299.00,
    status: 'Refunded',
    method: 'Mastercard •••• 5512',
    date: 'Nov 16, 2026',
    type: 'Refund'
  }
];

export const RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    user: 'Sarah Connor',
    action: 'settled annual contract renewal #INV-2026-894',
    amount: '+$9,990.00',
    type: 'renewal',
    time: '14m ago'
  },
  {
    id: 'act-2',
    user: 'David Kim',
    action: 'scheduled automated monthly billing invoice',
    amount: '+$999.00/mo',
    type: 'renewal',
    time: '1h ago'
  },
  {
    id: 'act-3',
    user: 'Aria Montgomery',
    action: 'registered team workspace for OmniStream Media',
    amount: '14d Trial',
    type: 'signup',
    time: '3h ago'
  },
  {
    id: 'act-4',
    user: 'Marcus Chen',
    action: 'added 5 developer licenses to Hyperion Data',
    amount: '+$450.00/mo',
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
    amount: '+$49.00/mo',
    type: 'conversion',
    time: '1d ago'
  }
];

// Mathematically Aligned SaaS Analytics per Date Filter
export const DASHBOARD_METRICS = {
  '7d': {
    dateRangeLabel: 'Nov 12 – Nov 18, 2026',
    context: {
      targetPlan: 30000,
      runRate: '$1.30M ARR',
      avgDaily: '$4,635 / day',
      expansionRate: '102.1% net expansion'
    },
    kpis: {
      totalRevenue: {
        value: 32450,
        change: 8.9,
        isPositive: true,
        comparison: 'vs. previous 7d ($29,800)',
        secondaryContext: 'Daily avg: $4,635/day'
      },
      mrr: {
        value: 108200,
        change: 2.1,
        isPositive: true,
        comparison: '+$2,230 net new this week',
        secondaryContext: 'ARR run rate: $1.30M'
      },
      totalCustomers: {
        value: 1429,
        change: 2.4,
        isPositive: true,
        comparison: '+33 new accounts this week',
        secondaryContext: '98.8% account retention'
      },
      activeSubscriptions: {
        value: 1280,
        change: 2.2,
        isPositive: true,
        comparison: '+28 paying subscriptions',
        secondaryContext: '149 active trial users'
      },
      churnRate: {
        value: 1.1,
        change: -0.2,
        isPositive: true,
        comparison: 'vs. 1.3% last week',
        secondaryContext: 'Industry standard: < 2.0%'
      },
      arpu: {
        value: 85,
        change: 1.2,
        isPositive: true,
        comparison: '+$1.00 per subscription',
        secondaryContext: 'Based on 1,280 active tiers'
      }
    },
    revenueOverTime: [
      { date: 'Nov 12', fullDate: 'Wed, Nov 12', revenue: 4100, target: 3800, variance: '+7.9%' },
      { date: 'Nov 13', fullDate: 'Thu, Nov 13', revenue: 4650, target: 4100, variance: '+13.4%' },
      { date: 'Nov 14', fullDate: 'Fri, Nov 14', revenue: 5120, target: 4400, variance: '+16.4%' },
      { date: 'Nov 15', fullDate: 'Sat, Nov 15', revenue: 4300, target: 4000, variance: '+7.5%' },
      { date: 'Nov 16', fullDate: 'Sun, Nov 16', revenue: 3980, target: 3800, variance: '+4.7%' },
      { date: 'Nov 17', fullDate: 'Mon, Nov 17', revenue: 4950, target: 4500, variance: '+10.0%' },
      { date: 'Nov 18', fullDate: 'Tue, Nov 18', revenue: 5350, target: 4800, variance: '+11.5%' }
    ],
    monthlySales: [
      { name: 'Nov 12', sales: 12, deals: 3 },
      { name: 'Nov 13', sales: 16, deals: 5 },
      { name: 'Nov 14', sales: 19, deals: 6 },
      { name: 'Nov 15', sales: 14, deals: 4 },
      { name: 'Nov 16', sales: 11, deals: 3 },
      { name: 'Nov 17', sales: 18, deals: 5 },
      { name: 'Nov 18', sales: 22, deals: 7 }
    ],
    customerAcquisition: [
      { period: 'Nov 12', organic: 18, paid: 12 },
      { period: 'Nov 13', organic: 22, paid: 14 },
      { period: 'Nov 14', organic: 25, paid: 19 },
      { period: 'Nov 15', organic: 20, paid: 15 },
      { period: 'Nov 16', organic: 19, paid: 11 },
      { period: 'Nov 17', organic: 27, paid: 16 },
      { period: 'Nov 18', organic: 31, paid: 22 }
    ]
  },
  '30d': {
    dateRangeLabel: 'Oct 20 – Nov 18, 2026',
    context: {
      targetPlan: 115000,
      runRate: '$1.30M ARR',
      avgDaily: '$4,281 / day',
      expansionRate: '106.8% net expansion'
    },
    kpis: {
      totalRevenue: {
        value: 128450,
        change: 14.1,
        isPositive: true,
        comparison: 'vs. previous 30d ($112,530)',
        secondaryContext: 'Daily avg: $4,281/day'
      },
      mrr: {
        value: 108200,
        change: 8.6,
        isPositive: true,
        comparison: '+$8,570 net new this month',
        secondaryContext: 'ARR run rate: $1.30M'
      },
      totalCustomers: {
        value: 1429,
        change: 12.4,
        isPositive: true,
        comparison: '+158 accounts vs. Oct',
        secondaryContext: '98.2% account retention'
      },
      activeSubscriptions: {
        value: 1280,
        change: 9.1,
        isPositive: true,
        comparison: '+107 paying subscriptions',
        secondaryContext: '149 active trial users'
      },
      churnRate: {
        value: 1.2,
        change: -0.4,
        isPositive: true,
        comparison: 'vs. 1.6% previous period',
        secondaryContext: 'Industry standard: < 2.0%'
      },
      arpu: {
        value: 85,
        change: 6.2,
        isPositive: true,
        comparison: '+$5.00 vs. Oct ($80)',
        secondaryContext: 'Based on 1,280 active tiers'
      }
    },
    revenueOverTime: [
      { date: 'Oct 20 – Oct 26', fullDate: 'Week 1 (Oct 20 – Oct 26)', revenue: 27500, target: 25000, variance: '+10.0%' },
      { date: 'Oct 27 – Nov 02', fullDate: 'Week 2 (Oct 27 – Nov 02)', revenue: 31200, target: 28000, variance: '+11.4%' },
      { date: 'Nov 03 – Nov 09', fullDate: 'Week 3 (Nov 03 – Nov 09)', revenue: 33900, target: 30000, variance: '+13.0%' },
      { date: 'Nov 10 – Nov 18', fullDate: 'Week 4 (Nov 10 – Nov 18)', revenue: 35850, target: 32000, variance: '+12.0%' }
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
    dateRangeLabel: 'Aug 21 – Nov 18, 2026',
    context: {
      targetPlan: 320000,
      runRate: '$1.30M ARR',
      avgDaily: '$4,046 / day',
      expansionRate: '110.2% net expansion'
    },
    kpis: {
      totalRevenue: {
        value: 364200,
        change: 22.8,
        isPositive: true,
        comparison: 'vs. previous 90d ($296,700)',
        secondaryContext: 'Daily avg: $4,046/day'
      },
      mrr: {
        value: 108200,
        change: 14.5,
        isPositive: true,
        comparison: '+$13,700 net new this quarter',
        secondaryContext: 'ARR run rate: $1.30M'
      },
      totalCustomers: {
        value: 1429,
        change: 28.6,
        isPositive: true,
        comparison: '+318 accounts vs. Q2',
        secondaryContext: '97.9% account retention'
      },
      activeSubscriptions: {
        value: 1280,
        change: 21.4,
        isPositive: true,
        comparison: '+225 paying subscriptions',
        secondaryContext: '149 active trial users'
      },
      churnRate: {
        value: 1.3,
        change: -0.3,
        isPositive: true,
        comparison: 'vs. 1.6% previous quarter',
        secondaryContext: 'Industry standard: < 2.0%'
      },
      arpu: {
        value: 85,
        change: 8.9,
        isPositive: true,
        comparison: '+$7.00 vs. Q2 ($78)',
        secondaryContext: 'Based on 1,280 active tiers'
      }
    },
    revenueOverTime: [
      { date: 'Aug 2026', fullDate: 'August 2026', revenue: 108000, target: 95000, variance: '+13.7%' },
      { date: 'Sep 2026', fullDate: 'September 2026', revenue: 122000, target: 110000, variance: '+10.9%' },
      { date: 'Oct 2026', fullDate: 'October 2026', revenue: 134200, target: 125000, variance: '+7.4%' }
    ],
    monthlySales: [
      { name: 'Aug', sales: 260, deals: 95 },
      { name: 'Sep', sales: 310, deals: 118 },
      { name: 'Oct', sales: 349, deals: 133 }
    ],
    customerAcquisition: [
      { period: 'Aug', organic: 290, paid: 180 },
      { period: 'Sep', organic: 340, paid: 215 },
      { period: 'Oct', organic: 399, paid: 248 }
    ]
  },
  'year': {
    dateRangeLabel: 'Jan 01 – Nov 18, 2026',
    context: {
      targetPlan: 1250000,
      runRate: '$1.30M ARR',
      avgDaily: '$3,914 / day',
      expansionRate: '118.0% NRR'
    },
    kpis: {
      totalRevenue: {
        value: 1420800,
        change: 36.4,
        isPositive: true,
        comparison: 'vs. FY 2025 ($1,041,800)',
        secondaryContext: 'Daily avg: $3,914/day'
      },
      mrr: {
        value: 108200,
        change: 42.1,
        isPositive: true,
        comparison: '+$32,100 net new YTD',
        secondaryContext: 'ARR run rate: $1.30M'
      },
      totalCustomers: {
        value: 1429,
        change: 54.2,
        isPositive: true,
        comparison: '+502 accounts added in 2026',
        secondaryContext: '98.2% account retention'
      },
      activeSubscriptions: {
        value: 1280,
        change: 48.0,
        isPositive: true,
        comparison: '+415 paying subscriptions',
        secondaryContext: '149 active trial users'
      },
      churnRate: {
        value: 1.4,
        change: -0.6,
        isPositive: true,
        comparison: 'vs. 2.0% in 2025',
        secondaryContext: 'Industry standard: < 2.0%'
      },
      arpu: {
        value: 85,
        change: 14.8,
        isPositive: true,
        comparison: '+$11.00 vs. 2025 ($74)',
        secondaryContext: 'Based on 1,280 active tiers'
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
  { name: 'Free Trial', value: 149, color: '#71717a' },
  { name: 'Starter ($49)', value: 720, color: '#38bdf8' },
  { name: 'Professional ($299)', value: 410, color: '#6366f1' },
  { name: 'Enterprise ($999+)', value: 150, color: '#10b981' }
];
