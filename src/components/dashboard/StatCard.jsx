import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  badge = null,
  isHero = false,
  comparison = 'vs previous period',
  secondaryContext = null
}) {
  return (
    <div className={`nex-card nex-card-hover stat-card ${isHero ? 'stat-card-hero' : ''}`}>
      {/* Top Header: Title, Badge, and Icon */}
      <div className="stat-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="stat-card-title">{title}</span>
          {badge && <span className="stat-card-badge">{badge}</span>}
        </div>
        {Icon && (
          <div className="stat-card-icon-wrapper">
            <Icon size={16} />
          </div>
        )}
      </div>

      {/* Metric Value */}
      <div className="stat-card-body">
        <div className={`stat-card-value ${isHero ? 'hero-value' : ''}`}>{value}</div>

        {/* Footer: Trend Badge & Comparison Text */}
        <div className="stat-card-footer">
          <span className={`stat-badge ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            <span>{isPositive ? `+${change}%` : `${change}%`}</span>
          </span>
          <span className="stat-card-subtitle">{comparison}</span>
        </div>

        {/* Secondary Context Label for real SaaS depth */}
        {secondaryContext && (
          <div className="stat-card-secondary-context">
            <span className="context-dot" />
            <span>{secondaryContext}</span>
          </div>
        )}
      </div>
    </div>
  );
}
