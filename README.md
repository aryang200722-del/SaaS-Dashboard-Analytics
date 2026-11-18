# Nexora — Modern SaaS Analytics & Revenue Management Dashboard

Nexora is a frontend-only, commercial-grade SaaS analytics and operations dashboard built with React, Vite, React Router, Recharts, Lucide Icons, and LocalStorage. Its design language is inspired by leading SaaS platforms like Stripe, Linear, and Vercel.

---

## 4-Stage Progressive Development Roadmap

- **[x] Stage 1 (Current)**: **Foundation & Application Shell**
  - Project setup, Vite build toolchain, and modular folder structure.
  - Complete Design System with CSS custom properties (Dark & Light themes, elevations, transitions, glassmorphism).
  - App Shell: Collapsible Sidebar, sticky blurred Navbar, mobile responsive drawer.
  - Global Search (Command Palette with `Ctrl+K` keyboard shortcut).
  - Notification Center dropdown with simulated real-time SaaS events.
  - User Profile dropdown with plan tier details and demo data management.
  - Interactive Toast notification system (`ToastProvider`, `useToast`).
  - React Router v6 navigation across all 6 core routes.
  - LocalStorage state persistence engine and default seed data initialization.
- **[ ] Stage 2**: **Overview Dashboard, KPI Cards & Recharts Visualizations**
  - 6 Core KPI metric cards (Total Revenue, MRR, Total Customers, Active Subscriptions, Churn Rate, ARPU).
  - Interactive Recharts (Revenue trend line, Monthly sales bar, Customer acquisition area, Subscription distribution pie).
  - Multi-period date range filtering (7d, 30d, 90d, 1y).
  - Live activity feed.
- **[ ] Stage 3**: **Customer Management & Subscription Management**
  - Full frontend CRUD for Customers and Subscriptions.
  - Search, status filtering, multi-column sorting, and pagination.
  - Add / Edit / Delete modals with form validation.
  - Subscription plan tier upgrade and renewal tracking.
- **[ ] Stage 4**: **Project Management, Analytics Deep Dive & Final Polish**
  - Project tracking with progress bars, status tags, deadlines, and team members.
  - Dedicated Analytics page with cohort trends and MRR expansion metrics.
  - Profile & Account preferences persistence in Settings.
  - End-to-end responsiveness and mobile polish.

---

## Technology Stack

- **Framework**: React 18 (ES6+, Functional Components & Hooks)
- **Bundler**: Vite 5
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Data Visualizations**: Recharts
- **Styling**: Pure CSS3 with CSS custom properties (Design System variables), flexbox, grid, glassmorphism, responsive breakpoints
- **Storage**: Client-side `localStorage` with JSON serialization and versioned prefixes

---

## Folder Structure

```
c:\Users\LENOVO\Documents\Saas Dashboard\
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── common/
    │   │   ├── NotificationPanel.jsx
    │   │   ├── StageIndicator.jsx
    │   │   ├── ThemeToggle.jsx
    │   │   ├── ToastContainer.jsx
    │   │   └── UserProfileDropdown.jsx
    │   └── layout/
    │       ├── AppLayout.jsx
    │       ├── GlobalSearchModal.jsx
    │       ├── Navbar.jsx
    │       └── Sidebar.jsx
    ├── context/
    │   ├── AppContext.jsx
    │   ├── ThemeContext.jsx
    │   └── ToastContext.jsx
    ├── data/
    │   └── mockData.js
    ├── hooks/
    │   └── useLocalStorage.js
    ├── pages/
    │   ├── Analytics.jsx
    │   ├── Customers.jsx
    │   ├── Dashboard.jsx
    │   ├── Projects.jsx
    │   ├── Settings.jsx
    │   └── Subscriptions.jsx
    ├── styles/
    │   ├── components.css
    │   ├── global.css
    │   ├── layout.css
    │   └── variables.css
    └── utils/
        ├── formatters.js
        └── storage.js
```

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

---

## Stage 1 Verification Checklist

- [x] Zero compilation/build errors on Vite build.
- [x] Theme switcher dynamically toggles between Dark and Light mode without page reload.
- [x] Sidebar expands and collapses smoothly, retaining collapsed state in LocalStorage.
- [x] Navbar includes search palette trigger, unread notification badges, theme toggle, and profile dropdown.
- [x] Global Search (`Ctrl + K` or `Cmd + K`) allows instant keyboard navigation and selection across pages and actions.
- [x] Toast notification system displays stacked animated toasts for actions and status changes.
- [x] All 6 routes render smoothly with breadcrumbs and contextual headers.
- [x] Settings page allows updating profile name, email, company, and role, persisting changes directly to LocalStorage.
- [x] Demo data reset action clears local state and reloads default seed data with confirmation.
