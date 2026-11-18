# Nexora — Modern SaaS Analytics & Revenue Management Dashboard

Nexora is a complete, commercial-grade SaaS analytics and operations dashboard built with React 18, Vite, React Router DOM, Recharts, Lucide Icons, and LocalStorage. Designed with a sleek aesthetic inspired by Stripe, Linear, and Vercel.

---

## Architecture & Progressive Development Breakdown

Nexora is structured into 4 cohesive stages:

### Stage 1: Foundation & Application Shell
- **Design System**: Full CSS variables supporting light and dark modes with glassmorphic accents, soft drop shadows, and responsive typography (`Plus Jakarta Sans`).
- **Collapsible Sidebar**: Fixed/collapsible navigation with company logo, active link indicators, and badge counts.
- **Top Navbar**: Global search trigger with `Ctrl+K` command palette, notification dropdown, theme toggle, and user profile options.
- **Toast Notifications**: Stacked animated toast messages with auto-dismissal.
- **LocalStorage State**: Reusable storage abstraction (`storage.js` and `useLocalStorage.js`) initializing default seed data without overwriting user changes.

### Stage 2: Overview Dashboard & Charts
- **6 KPI Metric Cards**: Total Revenue, Monthly Recurring Revenue (MRR), Total Customers, Active Subscriptions, Churn Rate, and Average Revenue Per User (ARPU).
- **Interactive Recharts**:
  - Revenue Over Time (Area/Line chart with smooth gradient)
  - Sales Velocity & Deal Volume (BarChart with rounded tops)
  - Customer Acquisition (AreaChart with organic vs. paid campaigns)
  - Subscription Distribution (Donut PieChart with custom legend and tooltips)
- **Interactive Date Filters**: Last 7 days, 30 days, 90 days, and This year (dynamically updating all KPIs and charts).
- **Recent Activity Stream**: Live feed with activity badges, timestamps, and amounts.

### Stage 3: Customer & Subscription Management
- **Customer Directory**:
  - Full CRUD operations with Add & Edit modals and Delete confirmation.
  - Real-time search across names, emails, and companies.
  - Multi-status (Active, Trial, Inactive) and multi-plan filtering.
  - Multi-column sorting (Name, Company, Total Revenue, Registration Date).
  - Configurable pagination (5, 10, 20 items per page).
- **Subscription Management**:
  - Plan tier overview cards for Free, Starter, Professional, and Enterprise tiers.
  - Subscriptions data table with search and status filtering.
  - Add subscription modal and Change Plan modal.
  - Cancel subscription flow with state sync to customer records.

### Stage 4: Project Management, Analytics & Settings
- **Project Management**:
  - Track projects with progress bars, status tags (Not Started, In Progress, Completed, On Hold), priorities, budgets, and deadlines.
  - Assign and manage team member pills.
  - Add, edit, and delete project modals.
- **Dedicated Analytics Deep Dive**:
  - Key SaaS unit economics: Net Revenue Retention (NRR 118%), Customer Lifetime Value (LTV $3,840), Customer Acquisition Cost (CAC $420), LTV:CAC Ratio (9.1x), and Quick Ratio (3.4).
  - Cohort expansion trends, net new MRR velocity, and revenue contribution by plan.
- **Platform & Profile Settings**:
  - Profile customization (Name, Email, Role, Company, Avatar image preview).
  - Dark / Light mode preference with persistent state.
  - Notification toggles (Billing invoices, desktop alerts, weekly digests).
  - Factory demo data reset to restore original seed data at any time.

---

## Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router DOM v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: Browser `localStorage` (Zero backend required)
- **Styling**: CSS3 with CSS Custom Properties, Flexbox, CSS Grid, and Glassmorphism

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
