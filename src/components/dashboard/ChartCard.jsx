import React from 'react';

export default function ChartCard({ title, subtitle, badge, action, children }) {
  return (
    <div className="nex-card chart-card">
      <div className="nex-card-header">
        <div>
          <h3 className="nex-card-title">{title}</h3>
          {subtitle && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{subtitle}</p>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {badge && <span className="badge badge-primary">{badge}</span>}
          {action}
        </div>
      </div>
      <div className="nex-card-body chart-card-body">
        {children}
      </div>
    </div>
  );
}
