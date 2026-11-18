import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { FolderKanban, Save, Plus } from 'lucide-react';

export default function ProjectModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    name: '',
    client: '',
    status: 'In Progress',
    priority: 'High',
    progress: 30,
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    budget: 25000,
    team: ['Alex V.', 'Marcus C.']
  });

  const [teamInput, setTeamInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        client: initialData.client || '',
        status: initialData.status || 'In Progress',
        priority: initialData.priority || 'Medium',
        progress: initialData.progress ?? 0,
        deadline: initialData.deadline || '',
        budget: initialData.budget || 0,
        team: Array.isArray(initialData.team) ? initialData.team : ['Alex V.']
      });
    } else {
      setFormData({
        name: '',
        client: '',
        status: 'In Progress',
        priority: 'High',
        progress: 10,
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        budget: 25000,
        team: ['Alex V.', 'Marcus C.']
      });
    }
    setTeamInput('');
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Project title is required';
    if (!formData.client.trim()) errs.client = 'Client or team name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    onClose();
  };

  const handleAddTeamMember = () => {
    if (teamInput.trim() && !formData.team.includes(teamInput.trim())) {
      setFormData((prev) => ({ ...prev, team: [...prev.team, teamInput.trim()] }));
      setTeamInput('');
    }
  };

  const handleRemoveTeamMember = (member) => {
    setFormData((prev) => ({ ...prev, team: prev.team.filter((m) => m !== member) }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Project Details' : 'Create New Project'}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
            Project Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Multi-Tenant Auth Migration"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${errors.name ? 'var(--danger)' : 'var(--border-default)'}`,
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          {errors.name && <span style={{ color: 'var(--danger-text)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.name}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Client / Account *
            </label>
            <input
              type="text"
              placeholder="e.g. Cyberdyne Systems"
              value={formData.client}
              onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${errors.client ? 'var(--danger)' : 'var(--border-default)'}`,
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            {errors.client && <span style={{ color: 'var(--danger-text)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.client}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Allocated Budget ($)
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData((prev) => ({ ...prev, budget: Number(e.target.value) }))}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Project Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData((prev) => ({ ...prev, priority: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Progress ({formData.progress}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData((prev) => ({ ...prev, progress: Number(e.target.value) }))}
              style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer', marginTop: '0.5rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Deadline
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Assigned Team Members */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
            Assigned Team Members
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input
              type="text"
              placeholder="e.g. David K."
              value={teamInput}
              onChange={(e) => setTeamInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTeamMember();
                }
              }}
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '0.8125rem'
              }}
            />
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddTeamMember}>
              <Plus size={14} /> Add
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {formData.team.map((member) => (
              <span
                key={member}
                className="badge badge-primary"
                style={{ cursor: 'pointer' }}
                onClick={() => handleRemoveTeamMember(member)}
                title="Click to remove"
              >
                {member} &times;
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            <span>{isEdit ? 'Save Project' : 'Create Project'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
