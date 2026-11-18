import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Analytics() {
  const { dateFilter } = useApp();

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="breadcrumbs">
          <span>Nexora Cloud</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Analytics</span>
        </div>
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Analytics & Intelligence</h1>
            <p className="page-description">
              In-depth SaaS growth cohorts, revenue retention curves, and subscription breakdowns.
            </p>
          </div>
        </div>
      </div>

      <div className="nex-card">
        <div className="nex-card-header">
          <span className="nex-card-title">
            <BarChart3 size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>Dedicated Analytics Engine</span>
          </span>
          <span className="badge badge-info">Stage 4 Focus</span>
        </div>
        <div className="nex-card-body">
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The dedicated Analytics page will feature multi-metric trend models, MRR cohort expansions,
            churn decay analyses, and tier distribution matrices. This deep-dive page will be constructed
            during <strong>Stage 4</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
