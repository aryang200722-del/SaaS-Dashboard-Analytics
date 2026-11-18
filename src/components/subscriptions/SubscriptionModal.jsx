import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { CreditCard, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SubscriptionModal({ isOpen, onClose, onSubmit, editingSub = null }) {
  const { customers } = useApp();
  const isEdit = !!editingSub;

  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    company: '',
    plan: 'Professional',
    billingCycle: 'Monthly',
    price: 299,
    status: 'Active',
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  useEffect(() => {
    if (editingSub) {
      setFormData({
        customerId: editingSub.customerId || '',
        customerName: editingSub.customerName || '',
        company: editingSub.company || '',
        plan: editingSub.plan || 'Professional',
        billingCycle: editingSub.billingCycle || 'Monthly',
        price: editingSub.price || 299,
        status: editingSub.status || 'Active',
        renewalDate: editingSub.renewalDate || ''
      });
    } else {
      const firstCust = customers[0];
      setFormData({
        customerId: firstCust?.id || '',
        customerName: firstCust?.name || '',
        company: firstCust?.company || '',
        plan: 'Professional',
        billingCycle: 'Monthly',
        price: 299,
        status: 'Active',
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }
  }, [editingSub, isOpen, customers]);

  const handlePlanChange = (plan) => {
    let price = 299;
    if (plan === 'Free') price = 0;
    else if (plan === 'Starter') price = 49;
    else if (plan === 'Enterprise') price = 999;

    if (formData.billingCycle === 'Annual') {
      price = price * 10; // 2 months free discount
    }

    setFormData((prev) => ({ ...prev, plan, price }));
  };

  const handleCycleChange = (billingCycle) => {
    let base = 299;
    if (formData.plan === 'Free') base = 0;
    else if (formData.plan === 'Starter') base = 49;
    else if (formData.plan === 'Enterprise') base = 999;

    const price = billingCycle === 'Annual' ? base * 10 : base;
    setFormData((prev) => ({ ...prev, billingCycle, price }));
  };

  const handleCustomerSelect = (customerId) => {
    const cust = customers.find((c) => c.id === customerId);
    if (cust) {
      setFormData((prev) => ({
        ...prev,
        customerId: cust.id,
        customerName: cust.name,
        company: cust.company
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Modify Subscription Tier' : 'Create New Subscription'}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {!isEdit && (
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Select Customer
            </label>
            <select
              value={formData.customerId}
              onChange={(e) => handleCustomerSelect(e.target.value)}
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
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.company}
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Subscription Tier
            </label>
            <select
              value={formData.plan}
              onChange={(e) => handlePlanChange(e.target.value)}
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
              <option value="Free">Free Plan ($0)</option>
              <option value="Starter">Starter Plan ($49/mo)</option>
              <option value="Professional">Professional Plan ($299/mo)</option>
              <option value="Enterprise">Enterprise Plan ($999/mo)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Billing Frequency
            </label>
            <select
              value={formData.billingCycle}
              onChange={(e) => handleCycleChange(e.target.value)}
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
              <option value="Monthly">Monthly</option>
              <option value="Annual">Annual (2 Months Free)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              Billing Rate ($)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
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
              Renewal Date
            </label>
            <input
              type="date"
              value={formData.renewalDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, renewalDate: e.target.value }))}
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

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            <span>{isEdit ? 'Save Changes' : 'Activate Subscription'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
