import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle = 'vs previous period'
}) {
  return (
    <div className="nex-card nex-card-hover stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {Icon && (
          <div className="stat-card-icon-wrapper">
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>

        <div className="stat-card-footer">
          <span className={`stat-badge ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            <span>{isPositive ? `+${change}%` : `${change}%`}</span>
          </span>
          <span className="stat-card-subtitle">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}
