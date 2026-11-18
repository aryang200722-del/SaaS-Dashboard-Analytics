import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { Save, UserPlus, Check } from 'lucide-react';

export default function CustomerModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subscriptionPlan: 'Professional',
    status: 'Active',
    totalRevenue: 0,
    registrationDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        company: initialData.company || '',
        phone: initialData.phone || '',
        subscriptionPlan: initialData.subscriptionPlan || 'Professional',
        status: initialData.status || 'Active',
        totalRevenue: initialData.totalRevenue || 0,
        registrationDate: initialData.registrationDate || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subscriptionPlan: 'Professional',
        status: 'Active',
        totalRevenue: 0,
        registrationDate: new Date().toISOString().split('T')[0]
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.company.trim()) errs.company = 'Company name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Customer Record' : 'Register New Customer'}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Sarah Connor"
            value={formData.name}
            onChange={handleChange}
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
              Work Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="sarah@company.com"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${errors.email ? 'var(--danger)' : 'var(--border-default)'}`,
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            {errors.email && <span style={{ color: 'var(--danger-text)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.email}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              placeholder="e.g. Cyberdyne"
              value={formData.company}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${errors.company ? 'var(--danger)' : 'var(--border-default)'}`,
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            {errors.company && <span style={{ color: 'var(--danger-text)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.company}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
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

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Total Revenue ($)
            </label>
            <input
              type="number"
              name="totalRevenue"
              value={formData.totalRevenue}
              onChange={handleChange}
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
              Subscription Tier
            </label>
            <select
              name="subscriptionPlan"
              value={formData.subscriptionPlan}
              onChange={handleChange}
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
              <option value="Free">Free Plan</option>
              <option value="Starter">Starter Plan ($49)</option>
              <option value="Professional">Professional Plan ($299)</option>
              <option value="Enterprise">Enterprise Plan ($999+)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Account Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
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
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? <Save size={16} /> : <UserPlus size={16} />}
            <span>{isEdit ? 'Save Changes' : 'Create Customer'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
