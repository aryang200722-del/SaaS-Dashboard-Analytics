import React, { useRef, useEffect } from 'react';
import { Bell, CheckCheck, Trash2, ArrowUpRight, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatRelativeTime } from '../../utils/formatters';

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, unreadCount, markAllNotificationsAsRead, markNotificationAsRead, clearNotification } = useApp();
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <ArrowUpRight size={16} className="text-success" />;
      case 'warning':
        return <ShieldAlert size={16} className="text-warning" />;
      default:
        return <Sparkles size={16} className="text-info" />;
    }
  };

  return (
    <div className="dropdown-menu notification-panel" ref={panelRef}>
      <div className="notification-header">
        <div className="notification-title">
          <Bell size={16} />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="badge badge-primary">{unreadCount} new</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={markAllNotificationsAsRead}
            title="Mark all as read"
          >
            <CheckCheck size={14} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div style={{ padding: '2rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Layers size={32} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
            <p style={{ fontSize: '0.875rem' }}>No notifications to display</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${!notif.read ? 'unread' : ''}`}
              onClick={() => markNotificationAsRead(notif.id)}
            >
              {!notif.read && <div className="notification-dot" />}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span className="notification-item-title">{notif.title}</span>
                  <button
                    className="btn-icon"
                    style={{ width: '22px', height: '22px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      clearNotification(notif.id);
                    }}
                    title="Dismiss"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="notification-item-msg">{notif.message}</div>
                <div className="notification-item-time">{formatRelativeTime(notif.timestamp)}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="notification-footer">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Real-time SaaS event stream active
        </span>
      </div>
    </div>
  );
}
