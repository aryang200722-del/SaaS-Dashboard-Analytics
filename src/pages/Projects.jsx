import React from 'react';
import { FolderKanban, CheckCircle2, Clock, AlertTriangle, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Projects() {
  const { projects } = useApp();

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="breadcrumbs">
          <span>Nexora Cloud</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Projects</span>
        </div>
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Project Management</h1>
            <p className="page-description">
              Track project milestones, deadlines, assigned team members, and delivery velocity.
            </p>
          </div>
        </div>
      </div>

      <div className="nex-card" style={{ marginBottom: '2rem' }}>
        <div className="nex-card-header">
          <span className="nex-card-title">
            <FolderKanban size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>Active Engineering & Onboarding Projects ({projects.length})</span>
          </span>
          <span className="badge badge-info">Stage 4 Focus</span>
        </div>
        <div className="nex-card-body">
          <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Interactive Kanban/List views, deadline pickers, progress bars, and team member assignment will be
            implemented in <strong>Stage 4</strong>.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}
          >
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{proj.name}</h4>
                  <span className={`badge ${proj.status === 'Completed' ? 'badge-success' : 'badge-primary'}`}>
                    {proj.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  Client: {proj.client} • Due {proj.deadline}
                </div>

                {/* Progress bar preview */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem' }}>
                  <div
                    style={{
                      flex: 1,
                      height: '6px',
                      background: 'var(--bg-muted)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        width: `${proj.progress}%`,
                        height: '100%',
                        background: 'var(--brand-primary)',
                        borderRadius: 'var(--radius-full)'
                      }}
                    />
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{proj.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
