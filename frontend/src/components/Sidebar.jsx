import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, devMode, setDevMode }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      )
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      )
    },
    {
      id: 'chat',
      label: 'Chat Playground',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      id: 'evaluation',
      label: 'Evaluation & Flow',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    }
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <div style={styles.logo}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 11 11 13 15 9" />
          </svg>
        </div>
        <div>
          <h1 style={styles.title}>CorrectRAG</h1>
          <span style={styles.badge}>v1.0.0</span>
        </div>
      </div>

      <nav style={styles.nav}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              ...styles.navButton,
              ...(activeTab === item.id ? styles.navActive : {})
            }}
          >
            <span style={{
              ...styles.icon,
              ...(activeTab === item.id ? styles.iconActive : {})
            }}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div style={styles.footer}>
        <div style={styles.devToggleContainer}>
          <div style={styles.devInfo}>
            <span style={styles.devLabel}>Developer Mode</span>
            <span style={styles.devDesc}>Exposes full agent traces</span>
          </div>
          <button
            onClick={() => setDevMode(!devMode)}
            style={{
              ...styles.switch,
              ...(devMode ? styles.switchOn : {})
            }}
          >
            <span style={{
              ...styles.switchKnob,
              ...(devMode ? styles.switchKnobOn : {})
            }} />
          </button>
        </div>

        <div style={styles.systemStatus}>
          <div style={styles.statusIndicator}>
            <span style={styles.dot} />
            <span style={styles.statusText}>Local Service Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '260px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e4e4e7',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '24px 16px',
    flexShrink: 0,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    padding: '0 8px',
  },
  logo: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: '#eff6ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #bfdbfe',
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#09090b',
    lineHeight: '1.2',
  },
  badge: {
    fontSize: '0.7rem',
    color: '#71717a',
    fontWeight: '500',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flexGrow: 1,
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#3f3f46',
    fontWeight: '500',
    fontSize: '0.9rem',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  navActive: {
    backgroundColor: '#f4f4f5',
    color: '#09090b',
  },
  icon: {
    color: '#71717a',
    display: 'flex',
    alignItems: 'center',
  },
  iconActive: {
    color: '#1f2937',
  },
  footer: {
    borderTop: '1px solid #f4f4f5',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  devToggleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: '#fafafa',
    border: '1px solid #e4e4e7',
    borderRadius: '8px',
  },
  devInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  devLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#18181b',
  },
  devDesc: {
    fontSize: '0.65rem',
    color: '#71717a',
  },
  switch: {
    width: '36px',
    height: '20px',
    borderRadius: '10px',
    backgroundColor: '#e4e4e7',
    border: 'none',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  switchOn: {
    backgroundColor: '#3b82f6',
  },
  switchKnob: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '2px',
    left: '2px',
    transition: 'transform 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  switchKnobOn: {
    transform: 'translateX(16px)',
  },
  systemStatus: {
    padding: '0 8px',
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
  },
  statusText: {
    fontSize: '0.75rem',
    color: '#71717a',
    fontWeight: '500',
  }
};
