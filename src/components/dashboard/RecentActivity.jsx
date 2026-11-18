import React from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2, UserPlus, CreditCard, RefreshCw } from 'lucide-react';
import { RECENT_ACTIVITIES } from '../../data/mockData';

export default function RecentActivity() {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'upgrade':
        return <ArrowUpRight size={15} style={{ color: 'var(--brand-primary)' }} />;
      case 'renewal':
        return <RefreshCw size={15} style={{ color: 'var(--success-text)' }} />;
      case 'signup':
        return <UserPlus size={15} style={{ color: 'var(--info-text)' }} />;
      case 'payment':
        return <CreditCard size={15} style={{ color: 'var(--warning-text)' }} />;
      default:
        return <Sparkles size={15} style={{ color: 'var(--brand-primary)' }} />;
    }
  };

  return (
    <div className="nex-card recent-activity-card">
      <div className="nex-card-header">
        <span className="nex-card-title">
          <Sparkles size={18} style={{ color: 'var(--brand-primary)' }} />
          <span>Recent Live Activity</span>
        </span>
        <span className="badge badge-success">Live Stream</span>
      </div>
      <div className="recent-activity-list">
        {RECENT_ACTIVITIES.map((act) => (
          <div key={act.id} className="activity-item">
            <div className="activity-icon-badge">
              {getActivityIcon(act.type)}
            </div>
            <div className="activity-content">
              <div className="activity-text">
                <span className="activity-user">{act.user}</span>{' '}
                <span className="activity-action">{act.action}</span>
              </div>
              <span className="activity-time">{act.time}</span>
            </div>
            <div className="activity-amount">{act.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
