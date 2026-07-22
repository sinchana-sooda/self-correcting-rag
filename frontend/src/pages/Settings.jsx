import React, { useState, useEffect } from 'react';
import { API_BASE } from "../api";

export default function Settings() {
  const [retrievalK, setRetrievalK] = useState(4);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [clearingHistory, setClearingHistory] = useState(false);
  const [clearingDb, setClearingDb] = useState(false);

  const handleClearHistory = async () => {
    if (!confirm('Are you sure you want to delete all historical logs? This cannot be undone.')) {
      return;
    }
    setClearingHistory(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const response = await fetch(`${API_BASE}/api/chat/history/clear`, { 
        method: 'POST'
      });
      if (response.ok) {
        setSuccessMsg('Query logs successfully cleared.');
      } else {
        throw new Error('Failed to clear logs.');
      }
    } catch (err) {
      setErrorMsg('Failed to clear history log files.');
    } finally {
      setClearingHistory(false);
    }
  };

  const handleClearDatabase = async () => {
    if (!confirm('WARNING: Are you sure you want to delete ALL indexed documents and wipe ChromaDB? This will wipe your vector database.')) {
      return;
    }
    setClearingDb(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      // Fetch list of documents first
      const docsResponse = await fetch(`${API_BASE}/api/documents`);
      const docs = await docsResponse.json();

      // Delete each document
      for (const doc of docs) {
        await fetch(`/api/documents/${doc.filename}`, {
          method: 'DELETE'
        });
      }
      setSuccessMsg('Successfully deleted all indexed document vectors and cleaned database.');
    } catch (err) {
      setErrorMsg('Error occurred while resetting vector store.');
    } finally {
      setClearingDb(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <h2 className="page-title">System Settings</h2>
      <p className="page-subtitle">Configure model execution, vector retrieval parameters, and local data persistence.</p>

      {/* Notices */}
      {successMsg && (
        <div style={styles.alertSuccess}>
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div style={styles.alertError}>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* RAG Pipeline Config */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={styles.cardHeader}>Pipeline Constants</h3>
        
        <div className="form-group">
          <label className="form-label">Retrieval Size (Top K)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <input
              type="range"
              min="2"
              max="8"
              value={retrievalK}
              onChange={(e) => setRetrievalK(parseInt(e.target.value))}
              style={{ flexGrow: 1, accentColor: '#3b82f6' }}
            />
            <span style={{ fontSize: '0.9rem', fontWeight: '700', minWidth: '24px' }}>{retrievalK}</span>
          </div>
          <span style={styles.fieldDesc}>Determines the number of document chunks fetched in each vector database lookup attempt.</span>
        </div>

        <div className="form-group">
          <label className="form-label">Generative AI Model</label>
          <input
            type="text"
            className="form-control"
            value="gemini-2.5-flash (Default)"
            disabled
            style={{ backgroundColor: '#f4f4f5', color: '#71717a' }}
          />
          <span style={styles.fieldDesc}>Standard model utilized for Critic evaluations, query reformulations, and final answers.</span>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Dense Embedding Model</label>
          <input
            type="text"
            className="form-control"
            value="text-embedding-004"
            disabled
            style={{ backgroundColor: '#f4f4f5', color: '#71717a' }}
          />
          <span style={styles.fieldDesc}>Model mapping raw document text chunks into 768-dimensional float vectors.</span>
        </div>
      </div>

      {/* System Actions */}
      <div className="card">
        <h3 style={styles.cardHeader} className="mb-4">System Actions</h3>

        <div style={styles.actionRow}>
          <div style={styles.actionInfo}>
            <div style={styles.actionName}>Clear Execution Logs</div>
            <div style={styles.actionDesc}>Clear the history of conversational queries and evaluations. This clears the dashboard charts and trace pages.</div>
          </div>
          <button 
            className="btn btn-secondary" 
            onClick={handleClearHistory} 
            disabled={clearingHistory}
            style={{ borderColor: '#fecaca', color: '#ef4444' }}
          >
            {clearingHistory ? 'Clearing...' : 'Clear Logs'}
          </button>
        </div>

        <div style={{ ...styles.actionRow, borderBottom: 'none', paddingBottom: 0 }}>
          <div style={styles.actionInfo}>
            <div style={styles.actionName}>Wipe Vector Store</div>
            <div style={styles.actionDesc}>Delete all document vectors from ChromaDB and clear matching PDF files from server disk.</div>
          </div>
          <button 
            className="btn btn-danger" 
            onClick={handleClearDatabase} 
            disabled={clearingDb}
          >
            {clearingDb ? 'Wiping DB...' : 'Reset Vector Store'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  alertSuccess: {
    backgroundColor: '#ecfdf5',
    border: '1px solid #a7f3d0',
    color: '#059669',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '0.85rem'
  },
  alertError: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#ef4444',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '0.85rem'
  },
  cardHeader: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#09090b',
    marginBottom: '16px'
  },
  fieldDesc: {
    display: 'block',
    fontSize: '0.75rem',
    color: '#71717a',
    marginTop: '4px'
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid #f4f4f5',
    marginBottom: '16px',
    gap: '24px'
  },
  actionInfo: {
    flexGrow: 1
  },
  actionName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#18181b',
    marginBottom: '2px'
  },
  actionDesc: {
    fontSize: '0.75rem',
    color: '#71717a',
    lineHeight: '1.4'
  }
};