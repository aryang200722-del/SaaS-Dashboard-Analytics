import React, { useState, useMemo } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
  DollarSign,
  Calendar,
  Edit2,
  Trash2,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import ProjectModal from '../components/projects/ProjectModal';

export default function Projects() {
  const { projects, addProject, updateProject, deleteProject } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Quick stats
  const stats = useMemo(() => {
    const total = projects.length;
    const inProgress = projects.filter((p) => p.status === 'In Progress').length;
    const completed = projects.filter((p) => p.status === 'Completed').length;
    const totalBudget = projects.reduce((acc, p) => acc + (p.budget || 0), 0);
    return { total, inProgress, completed, totalBudget };
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesSearch =
        proj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || proj.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingProject(proj);
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete project "${name}"?`)) {
      deleteProject(id);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const progress = newStatus === 'Completed' ? 100 : newStatus === 'Not Started' ? 0 : 50;
    updateProject(id, { status: newStatus, progress });
  };

  const handleModalSubmit = (formData) => {
    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData);
    }
  };

  const renderPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return <span className="badge badge-danger">Critical</span>;
      case 'High':
        return <span className="badge badge-warning">High</span>;
      case 'Medium':
        return <span className="badge badge-primary">Medium</span>;
      default:
        return <span className="badge badge-neutral">Low</span>;
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="badge badge-success"><CheckCircle2 size={12} /> Completed</span>;
      case 'In Progress':
        return <span className="badge badge-primary"><Clock size={12} /> In Progress</span>;
      case 'On Hold':
        return <span className="badge badge-warning"><AlertTriangle size={12} /> On Hold</span>;
      default:
        return <span className="badge badge-neutral">Not Started</span>;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
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
              Track customer onboarding initiatives, platform migrations, milestones, and deliverable health.
            </p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary" onClick={handleOpenAdd}>
              <Plus size={16} />
              <span>Create Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}
      >
        <div className="nex-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Projects</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {stats.total}
          </div>
        </div>
        <div className="nex-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>In Progress</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--brand-primary)', marginTop: '0.25rem' }}>
            {stats.inProgress}
          </div>
        </div>
        <div className="nex-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Completed</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--success-text)', marginTop: '0.25rem' }}>
            {stats.completed}
          </div>
        </div>
        <div className="nex-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Committed Budget</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {formatCurrency(stats.totalBudget)}
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Status Filter */}
      <div
        className="nex-card"
        style={{
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem 0.85rem',
              width: '100%',
              maxWidth: '360px'
            }}
          >
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search projects by title or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                width: '100%'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          <Filter size={14} />
          <span>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              padding: '0.35rem 0.6rem',
              fontSize: '0.8125rem',
              outline: 'none'
            }}
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="nex-card" style={{ padding: '3.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <FolderKanban size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            No projects found
          </h3>
          <p style={{ fontSize: '0.85rem' }}>Create a project or adjust your search filter criteria.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}
        >
          {filteredProjects.map((proj) => (
            <div key={proj.id} className="nex-card nex-card-hover" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Header row: title and priority */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {proj.name}
                  </h3>
                  {renderPriorityBadge(proj.priority)}
                </div>

                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Client: <strong style={{ color: 'var(--text-secondary)' }}>{proj.client}</strong>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Completion Progress</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{proj.progress}%</strong>
                  </div>
                  <div
                    style={{
                      height: '8px',
                      background: 'var(--bg-muted)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        width: `${proj.progress}%`,
                        height: '100%',
                        background: proj.progress === 100 ? 'var(--success)' : 'var(--brand-primary)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Meta details: Deadline, Budget */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'var(--bg-surface-elevated)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.25rem',
                    fontSize: '0.8125rem'
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Deadline</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatDate(proj.deadline)}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Budget</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {formatCurrency(proj.budget)}
                    </span>
                  </div>
                </div>

                {/* Assigned Team */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Assigned Team:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {(proj.team || []).map((m) => (
                      <span key={m} className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Status Select & Actions */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1rem'
                }}
              >
                <select
                  value={proj.status}
                  onChange={(e) => handleStatusChange(proj.id, e.target.value)}
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    padding: '0.3rem 0.5rem',
                    fontSize: '0.75rem',
                    outline: 'none',
                    fontWeight: 600
                  }}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    className="btn-icon"
                    style={{ width: '30px', height: '30px' }}
                    onClick={() => handleOpenEdit(proj)}
                    title="Edit Project"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    className="btn-icon"
                    style={{ width: '30px', height: '30px', color: 'var(--danger-text)' }}
                    onClick={() => handleDelete(proj.id, proj.name)}
                    title="Delete Project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingProject}
      />
    </div>
  );
}
