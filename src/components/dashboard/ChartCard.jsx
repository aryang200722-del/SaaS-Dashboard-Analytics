import React from 'react';

export default function ChartCard({
  title,
  subtitle,
  badge,
  action,
  contextBar,
  children
}) {
  return (
    <div className="nex-card chart-card">
      <div className="nex-card-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h3 className="nex-card-title">{title}</h3>
            {badge && <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>{badge}</span>}
          </div>
          {subtitle && (
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {action}
          </div>
        )}
      </div>

      {/* Optional Contextual Metric Bar */}
      {contextBar}

      <div className="chart-card-body">
        {children}
      </div>
    </div>
  );
}
