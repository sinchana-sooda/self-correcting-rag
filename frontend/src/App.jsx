import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Chat from './pages/Chat';
import Evaluation from './pages/Evaluation';
import Settings from './pages/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [devMode, setDevMode] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'documents':
        return <Documents />;
      case 'chat':
        return <Chat devMode={devMode} />;
      case 'evaluation':
        return <Evaluation />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        devMode={devMode} 
        setDevMode={setDevMode} 
      />
      <main className="main-content">
        {/* Top Sticky Header */}
        <header className="top-header glass-header">
          <div className="header-title">
            <h2
              style={{
                margin: 0,
                fontSize: "1.45rem",
                fontWeight: 700,
                color: "#18181b"
              }}
            >
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>

            <p
              style={{
                margin: "4px 0 0",
                fontSize: "0.85rem",
                color: "#71717a",
                fontWeight: 500
              }}
            >
              Self-Correcting Retrieval Augmented Generation Platform
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px"
           }}
          >
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#ECFDF5",
    border: "1px solid #BBF7D0",
    padding: "8px 12px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#15803D"
  }}
>
  <span
    style={{
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#22C55E"
    }}
  />
  System Online
</div>    
            <button
              className={`dev-mode-toggle ${devMode ? 'active' : ''}`}
              onClick={() => setDevMode(!devMode)}
>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ marginRight: "4px" }}
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
</svg>
              {devMode ? 'Developer Tools Enabled' : 'Developer Tools'}
            </button>
            <button
              className="github-btn"
              onClick={() =>
                window.open(
                  "https://github.com/sinchana-sooda/self-correcting-rag",
                  "_blank"
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ marginRight: "4px" }}
          >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Source Code
            </button>
          </div>
        </header>

        {/* Page Mount Body */}
        {renderContent()}
      </main>
    </div>
  );
}
