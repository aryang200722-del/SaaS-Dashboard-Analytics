import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  isHero = false,
  comparison = 'vs. previous period',
  secondaryContext = null
}) {
  return (
    <div className={`nex-card stat-card ${isHero ? 'stat-card-hero' : ''}`}>
      {/* Card Header: Title and Icon */}
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {Icon && (
          <div className="stat-card-icon-wrapper">
            <Icon size={15} />
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="stat-card-body">
        <div className={`stat-card-value ${isHero ? 'hero-value' : ''}`}>{value}</div>

        {/* Comparison Line */}
        <div className="stat-card-footer">
          <span className={`stat-badge ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            <span>{isPositive ? `+${change}%` : `${change}%`}</span>
          </span>
          <span className="stat-card-subtitle">{comparison}</span>
        </div>

        {/* Secondary Context */}
        {secondaryContext && (
          <div className="stat-card-secondary-context">
            <span>{secondaryContext}</span>
          </div>
        )}
      </div>
    </div>
  );
}
