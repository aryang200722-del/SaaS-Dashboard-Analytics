import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function StageIndicator() {
  const stages = [
    { num: 1, name: 'Stage 1: Foundation & Shell', status: 'active' },
    { num: 2, name: 'Stage 2: Overview & Charts', status: 'upcoming' },
    { num: 3, name: 'Stage 3: Customers & Subscriptions', status: 'upcoming' },
    { num: 4, name: 'Stage 4: Projects & Analytics', status: 'upcoming' }
  ];

  return (
    <div className="stage-banner">
      <div className="stage-banner-content">
        <span className="stage-badge-pill">Stage 1 Active</span>
        <div className="stage-text-group">
          <h3>Nexora Architecture & Shell Complete</h3>
          <p>
            Vite React setup, Design System (Dark/Light tokens), Collapsible Sidebar, Responsive Navbar,
            Global Search (Ctrl+K), Toast System, and LocalStorage state management are fully operational.
          </p>
        </div>
      </div>
      <div className="stage-steps-pills">
        {stages.map((stage) => (
          <div
            key={stage.num}
            className={`step-pill ${stage.status === 'active' ? 'active' : ''}`}
          >
            {stage.status === 'active' ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={13} /> {stage.name}
              </span>
            ) : (
              <span>{stage.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
