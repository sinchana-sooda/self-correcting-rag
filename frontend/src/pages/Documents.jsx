import React, { useState, useEffect, useRef } from 'react';

/* ============================================================
   Tiny inline icon set (no external icon library, SVG only —
   kept consistent with Dashboard.jsx / Chat.jsx)
   ============================================================ */
const Icon = {
  Doc: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Upload: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  CheckCircle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Trash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  Eye: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Info: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  AlertCircle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Cpu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  ),
  Layers: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Database: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  ),
  Lock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  ),
  HardDrive: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="22" y1="12" x2="2" y2="12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
      <line x1="6" y1="16" x2="6.01" y2="16" />
      <line x1="10" y1="16" x2="10.01" y2="16" />
    </svg>
  ),
};

/* Simulated visual progress stages shown while the real upload
   request is in flight. This is cosmetic only — it does not
   change what's sent to the backend or when the real fetch
   resolves; it just gives the user a sense of the pipeline
   while they wait, and jumps straight to "Finished" once the
   actual API response comes back. */
const UPLOAD_STAGES = ['Uploading', 'Parsing PDF', 'Generating Embeddings', 'Indexing into ChromaDB', 'Finished'];

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [expandedInfo, setExpandedInfo] = useState(null);
  const fileInputRef = useRef(null);
  const stageTimerRef = useRef(null);
  const dragCounter = useRef(0);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError('Failed to fetch indexed documents from service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Drive the cosmetic staged progress bar while `uploading` is true.
  useEffect(() => {
    if (uploading) {
      setStageIndex(0);
      let i = 0;
      stageTimerRef.current = setInterval(() => {
        i = Math.min(i + 1, UPLOAD_STAGES.length - 2); // never auto-advance to "Finished"
        setStageIndex(i);
      }, 900);
    } else {
      clearInterval(stageTimerRef.current);
    }
    return () => clearInterval(stageTimerRef.current);
  }, [uploading]);

  /* Core upload logic — identical to the original implementation.
     Only refactored to accept a File directly so both the file
     picker AND the new drag-and-drop zone can call the exact
     same code path, same endpoint, same state updates. */
  const uploadFile = async (file) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a valid PDF document.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errDetail = await response.json();
        throw new Error(errDetail.detail || 'Ingestion failed.');
      }

      const docInfo = await response.json();
      setStageIndex(UPLOAD_STAGES.length - 1); // show "Finished"
      setSuccess(`Successfully ingested "${docInfo.filename}" (${docInfo.chunk_count} chunks).`);
      fetchDocuments();
    } catch (err) {
      setError(err.message || 'Error occurred during file processing.');
    } finally {
      setTimeout(() => setUploading(false), 500); // let "Finished" flash briefly
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    await uploadFile(file);
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) setIsDragging(false);
  };

  const handleDelete = async (filename) => {
    if (!confirm(`Are you sure you want to delete and un-index "${filename}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/documents/${filename}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete file.');
      }

      setSuccess(`Successfully deleted and un-indexed "${filename}".`);
      fetchDocuments();
    } catch (err) {
      setError(err.message || 'Failed to delete the document.');
    }
  };

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function formatWhen(timestamp) {
    const ms = timestamp * 1000;
    const diffMin = Math.round((Date.now() - ms) / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.round(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${Math.round(diffHr / 24)}d ago`;
  }

  const totalChunks = documents.reduce((acc, d) => acc + d.chunk_count, 0);
  const totalStorage = documents.reduce((acc, d) => acc + (d.file_size_bytes || 0), 0);

  // Real, data-grounded activity feed (not fabricated placeholder events)
  const activity = [...documents]
    .sort((a, b) => b.upload_time - a.upload_time)
    .slice(0, 5)
    .flatMap((doc) => ([
      { icon: Icon.Upload, color: '#2563EB', label: `Uploaded ${doc.filename}`, time: doc.upload_time },
      { icon: Icon.Sparkle, color: '#4F46E5', label: `Generated ${doc.chunk_count} embeddings`, time: doc.upload_time },
      { icon: Icon.CheckCircle, color: '#10B981', label: 'Indexed into ChromaDB — ready for semantic search', time: doc.upload_time },
    ]))
    .slice(0, 8);

  const pipelineStages = [
    { icon: Icon.Doc, label: 'PDF', color: '#2563EB' },
    { icon: Icon.Layers, label: 'Chunking', color: '#4F46E5' },
    { icon: Icon.Cpu, label: 'Embeddings', color: '#0EA5E9' },
    { icon: Icon.Database, label: 'ChromaDB', color: '#F59E0B' },
    { icon: Icon.CheckCircle, label: 'Ready for Retrieval', color: '#10B981' },
  ];

  return (
    <div className="page-container cdoc-root">
      <CdocStyle />

      {/* ================= HERO ================= */}
      <div className="cdoc-card cdoc-fade" style={styles.hero}>
        <div style={styles.heroRow}>
          <div>
            <h1 style={styles.heroTitle}>📄 Document Intelligence Center</h1>
            <p style={styles.heroSubtitle}>
              Upload documents to build your knowledge base. Every document is automatically parsed,
              chunked, embedded and indexed inside ChromaDB for semantic retrieval.
            </p>
          </div>
          <div style={styles.heroBadges}>
            <span className="cdoc-badge cdoc-badge-blue"><Icon.Sparkle style={styles.badgeIcon} /> AI Ready</span>
            <span className="cdoc-badge cdoc-badge-indigo"><Icon.Database style={styles.badgeIcon} /> Chroma Indexed</span>
            <span className="cdoc-badge cdoc-badge-green"><Icon.Lock style={styles.badgeIcon} /> Secure Upload</span>
          </div>
        </div>
      </div>

      {/* ================= ALERTS ================= */}
      {error && (
        <div className="cdoc-fade" style={styles.alertError}>
          <Icon.AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="cdoc-fade" style={styles.alertSuccess}>
          <Icon.CheckCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
          <span>{success}</span>
        </div>
      )}

      {/* ================= STATISTICS ================= */}
      <div style={styles.statsGrid}>
        <StatCard icon={Icon.Doc} color="#2563EB" label="Uploaded Documents" value={documents.length} />
        <StatCard icon={Icon.Layers} color="#4F46E5" label="Indexed Chunks" value={totalChunks} />
        <StatCard icon={Icon.Sparkle} color="#0EA5E9" label="Embeddings Generated" value={totalChunks} />
        <StatCard icon={Icon.HardDrive} color="#10B981" label="Storage Used" value={formatBytes(totalStorage)} />
      </div>

      {/* ================= UPLOAD ZONE ================= */}
      <div
        className={`cdoc-card cdoc-dropzone ${isDragging ? 'cdoc-dropzone-active' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={uploading}
          style={{ display: 'none' }}
        />

        {!uploading ? (
          <div style={styles.dropzoneInner}>
            <div style={styles.uploadIconWrap}>
              <Icon.Upload style={{ width: 30, height: 30, color: '#2563EB' }} />
            </div>
            <h3 style={styles.dropzoneTitle}>Drag & Drop your PDF here</h3>
            <p style={styles.dropzoneSub}>or click to browse</p>
            <div style={styles.featureRow}>
              <span className="cdoc-feature-pill">Supports PDF documents</span>
              <span className="cdoc-feature-pill">Max 10MB</span>
              <span className="cdoc-feature-pill">Automatic chunking</span>
              <span className="cdoc-feature-pill">Automatic embeddings</span>
              <span className="cdoc-feature-pill">Semantic indexing</span>
            </div>
          </div>
        ) : (
          <div style={styles.progressWrap} onClick={(e) => e.stopPropagation()}>
            {UPLOAD_STAGES.map((stage, i) => {
              const done = i < stageIndex || (stageIndex === UPLOAD_STAGES.length - 1 && i <= stageIndex);
              const active = i === stageIndex && !done;
              return (
                <div key={stage} style={styles.progressRow}>
                  <div style={styles.progressLabelRow}>
                    <span style={styles.progressLabel}>
                      {done ? <Icon.Check style={{ width: 13, height: 13, color: '#10B981' }} /> : null}
                      {stage}
                    </span>
                  </div>
                  <div style={styles.progressBarBg}>
                    <div
                      className={active ? 'cdoc-progress-active' : ''}
                      style={{
                        ...styles.progressBarFill,
                        width: done ? '100%' : active ? '55%' : '0%',
                        backgroundColor: done ? '#10B981' : '#2563EB',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= DOCUMENTS ================= */}
      <SectionHeading>
        Indexed Documents <span style={styles.countChip}>{documents.length}</span>
      </SectionHeading>

      {loading ? (
        <div className="cdoc-card" style={styles.tableLoading}>
          <div style={styles.spinner} />
          <span style={{ color: '#6B7280', fontSize: '0.85rem' }}>Fetching document index…</span>
        </div>
      ) : documents.length === 0 ? (
        <div className="cdoc-card cdoc-fade" style={styles.emptyState}>
          <div style={styles.emptyIconWrap}>
            <Icon.Doc style={{ width: 30, height: 30, color: '#9CA3AF' }} />
          </div>
          <h3 style={styles.emptyTitle}>No Documents Uploaded</h3>
          <p style={styles.emptyDesc}>Upload your first document to start building your AI knowledge base.</p>
          <button className="cdoc-btn cdoc-btn-primary" onClick={() => fileInputRef.current?.click()}>
            <Icon.Upload style={{ width: 15, height: 15 }} /> Upload a Document
          </button>
        </div>
      ) : (
        <div style={styles.docGrid}>
          {documents.map((doc, i) => (
            <div key={doc.filename} className="cdoc-card cdoc-doc-card cdoc-fade" style={{ ...styles.docCard, transitionDelay: `${i * 40}ms` }}>
              <div style={styles.docCardTop}>
                <div style={styles.docIconWrap}>
                  <Icon.Doc style={{ width: 20, height: 20, color: '#2563EB' }} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={styles.docName} title={doc.filename}>{doc.filename}</div>
                  <div style={styles.docDate}>{formatDate(doc.upload_time)}</div>
                </div>
              </div>

              <div style={styles.docMetaRow}>
                <div style={styles.docMetaItem}>
                  <span style={styles.docMetaLabel}>Chunks</span>
                  <span style={styles.docMetaValue}>{doc.chunk_count}</span>
                </div>
                <div style={styles.docMetaItem}>
                  <span style={styles.docMetaLabel}>Size</span>
                  <span style={styles.docMetaValue}>{formatBytes(doc.file_size_bytes)}</span>
                </div>
              </div>

              <div style={styles.docStatusRow}>
                <span className="cdoc-status-badge cdoc-status-green"><Icon.Check style={{ width: 10, height: 10 }} /> Embedded</span>
                <span className="cdoc-status-badge cdoc-status-blue"><Icon.Check style={{ width: 10, height: 10 }} /> Indexed</span>
              </div>

              {expandedInfo === doc.filename && (
                <div style={styles.infoExpand}>
                  <InfoLine label="Text Chunks" value={doc.chunk_count} />
                  <InfoLine label="File Size" value={formatBytes(doc.file_size_bytes)} />
                  <InfoLine label="Ingested At" value={formatDate(doc.upload_time)} />
                  <InfoLine label="Vector Store" value="ChromaDB" />
                </div>
              )}

              <div style={styles.docActions}>
                <button className="cdoc-icon-btn" title="Preview coming soon" disabled>
                  <Icon.Eye style={{ width: 14, height: 14 }} /> View
                </button>
                <button
                  className="cdoc-icon-btn"
                  onClick={() => setExpandedInfo(expandedInfo === doc.filename ? null : doc.filename)}
                >
                  <Icon.Info style={{ width: 14, height: 14 }} /> Info
                </button>
                <button className="cdoc-icon-btn cdoc-icon-btn-danger" onClick={() => handleDelete(doc.filename)}>
                  <Icon.Trash style={{ width: 14, height: 14 }} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= AI PROCESSING PIPELINE ================= */}
      <SectionHeading style={{ marginTop: '36px' }}>AI Processing Pipeline</SectionHeading>
      <div className="cdoc-card cdoc-fade" style={styles.pipelineCard}>
        <div style={styles.pipelineRow}>
          {pipelineStages.map((stage, i) => (
            <React.Fragment key={stage.label}>
              <div style={styles.pipelineStep}>
                <div style={{ ...styles.pipelineIconWrap, backgroundColor: `${stage.color}1F`, color: stage.color }}>
                  <stage.icon style={{ width: 20, height: 20 }} />
                </div>
                <div style={styles.pipelineLabel}>{stage.label}</div>
              </div>
              {i < pipelineStages.length - 1 && (
                <Icon.ArrowRight style={{ width: 18, height: 18, color: '#D1D5DB', flexShrink: 0, marginTop: '18px' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ================= ACTIVITY TIMELINE ================= */}
      {activity.length > 0 && (
        <>
          <SectionHeading style={{ marginTop: '32px' }}>Recent Activity</SectionHeading>
          <div className="cdoc-card" style={styles.timelineCard}>
            {activity.map((item, i) => (
              <div key={i} style={styles.timelineRow}>
                <div style={{ ...styles.timelineDot, backgroundColor: `${item.color}1F`, color: item.color }}>
                  <item.icon style={{ width: 13, height: 13 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={styles.timelineLabel}>{item.label}</div>
                </div>
                <div style={styles.timelineTime}>
                  <Icon.Clock style={{ width: 11, height: 11 }} /> {formatWhen(item.time)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================ */
function SectionHeading({ children, style }) {
  return <h3 style={{ ...styles.sectionHeading, ...style }}>{children}</h3>;
}

function StatCard({ icon: IconComp, color, label, value }) {
  return (
    <div className="cdoc-card cdoc-stat-card cdoc-fade" style={styles.statCard}>
      <div style={{ ...styles.statIconWrap, backgroundColor: `${color}1F`, color }}>
        <IconComp style={{ width: 18, height: 18 }} />
      </div>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function InfoLine({ label, value }) {
  return (
    <div style={styles.infoLineRow}>
      <span style={styles.infoLineLabel}>{label}</span>
      <span style={styles.infoLineValue}>{value}</span>
    </div>
  );
}

function CdocStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

      .cdoc-root { font-family: 'Inter', sans-serif; }

      @keyframes cdocFadeUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .cdoc-fade { animation: cdocFadeUp 0.4s ease; }

      @keyframes cdocSpin { to { transform: rotate(360deg); } }

      @keyframes cdocStripes {
        0% { background-position: 0 0; }
        100% { background-position: 28px 0; }
      }
      .cdoc-progress-active {
        background-image: linear-gradient(45deg, rgba(255,255,255,0.25) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.25) 75%, transparent 75%, transparent);
        background-size: 28px 28px;
        animation: cdocStripes 1s linear infinite;
      }

      .cdoc-card {
        background: #FFFFFF;
        border: 1px solid #E5E7EB;
        border-radius: 20px;
        box-shadow: 0 1px 3px rgba(17,24,39,0.06), 0 1px 2px rgba(17,24,39,0.04);
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      }
      .cdoc-stat-card:hover, .cdoc-doc-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 28px rgba(17,24,39,0.09);
        border-color: #D1D5DB;
      }

      .cdoc-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.76rem;
        font-weight: 600;
        padding: 6px 12px;
        border-radius: 999px;
        border: 1px solid transparent;
        white-space: nowrap;
      }
      .cdoc-badge-blue   { color: #1D4ED8; background: #EEF4FF; border-color: #DBEAFE; }
      .cdoc-badge-indigo { color: #4338CA; background: #EEF2FF; border-color: #E0E7FF; }
      .cdoc-badge-green  { color: #047857; background: #ECFDF5; border-color: #A7F3D0; }

      .cdoc-dropzone {
        border: 2px dashed #C7D2FE;
        background: linear-gradient(180deg, #F8FAFF 0%, #F3F6FF 100%);
        cursor: pointer;
        margin-bottom: 28px;
        padding: 40px 32px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
      }
      .cdoc-dropzone:hover {
        border-color: #93C5FD;
        box-shadow: 0 0 0 6px rgba(37,99,235,0.06);
      }
      .cdoc-dropzone-active {
        border-color: #2563EB;
        background: linear-gradient(180deg, #EEF4FF 0%, #E0EAFF 100%);
        box-shadow: 0 0 0 8px rgba(37,99,235,0.1);
        transform: scale(1.005);
      }

      .cdoc-feature-pill {
        font-size: 0.7rem;
        font-weight: 600;
        color: #4B5563;
        background: #FFFFFF;
        border: 1px solid #E5E7EB;
        padding: 5px 11px;
        border-radius: 999px;
      }

      .cdoc-btn {
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 0.85rem;
        border: none;
        border-radius: 999px;
        padding: 11px 22px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
      }
      .cdoc-btn-primary {
        color: #fff;
        background: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%);
        box-shadow: 0 8px 20px rgba(37,99,235,0.28);
      }
      .cdoc-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.05); }

      .cdoc-status-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 0.66rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 999px;
      }
      .cdoc-status-green { color: #047857; background: #ECFDF5; }
      .cdoc-status-blue  { color: #1D4ED8; background: #EEF4FF; }

      .cdoc-icon-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-family: 'Inter', sans-serif;
        font-size: 0.74rem;
        font-weight: 600;
        color: #374151;
        background: #F9FAFB;
        border: 1px solid #E5E7EB;
        padding: 7px 10px;
        border-radius: 10px;
        cursor: pointer;
        transition: transform 0.15s ease, border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
      }
      .cdoc-icon-btn:hover:not(:disabled) {
        transform: translateY(-1px);
        border-color: #D1D5DB;
        background: #FFFFFF;
      }
      .cdoc-icon-btn:disabled { opacity: 0.45; cursor: not-allowed; }
      .cdoc-icon-btn-danger { color: #DC2626; }
      .cdoc-icon-btn-danger:hover:not(:disabled) { border-color: #FECACA; background: #FEF2F2; }
    `}</style>
  );
}

const styles = {
  hero: {
    padding: '32px 36px',
    marginBottom: '24px',
    background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFF 100%)',
  },
  heroRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '18px',
  },
  heroTitle: {
    fontSize: '1.7rem',
    fontWeight: 800,
    color: '#111827',
    margin: '0 0 8px',
    letterSpacing: '-0.01em',
  },
  heroSubtitle: {
    fontSize: '0.92rem',
    color: '#6B7280',
    lineHeight: 1.6,
    maxWidth: '560px',
    margin: 0,
  },
  heroBadges: { display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' },
  badgeIcon: { width: 12, height: 12 },

  alertError: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    color: '#EF4444',
    padding: '13px 18px',
    borderRadius: '14px',
    marginBottom: '18px',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  alertSuccess: {
    backgroundColor: '#ECFDF5',
    border: '1px solid #A7F3D0',
    color: '#059669',
    padding: '13px 18px',
    borderRadius: '14px',
    marginBottom: '18px',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '14px',
    marginBottom: '24px',
  },
  statCard: { padding: '20px' },
  statIconWrap: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '14px',
  },
  statValue: { fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '2px' },
  statLabel: { fontSize: '0.78rem', color: '#6B7280', fontWeight: 500 },

  dropzoneInner: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  uploadIconWrap: {
    width: '64px',
    height: '64px',
    borderRadius: '18px',
    background: '#EEF4FF',
    border: '1px solid #DBEAFE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '18px',
  },
  dropzoneTitle: { fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '0 0 4px' },
  dropzoneSub: { fontSize: '0.85rem', color: '#6B7280', margin: '0 0 20px' },
  featureRow: { display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '520px' },

  progressWrap: { display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px', margin: '0 auto', cursor: 'default' },
  progressRow: {},
  progressLabelRow: { marginBottom: '6px' },
  progressLabel: { fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '6px' },
  progressBarBg: { width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '5px', overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: '5px', transition: 'width 0.5s ease, background-color 0.3s ease' },

  sectionHeading: {
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#6B7280',
    margin: '0 0 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  countChip: {
    fontSize: '0.68rem',
    fontWeight: 700,
    color: '#4B5563',
    background: '#F3F4F6',
    padding: '2px 8px',
    borderRadius: '999px',
    textTransform: 'none',
    letterSpacing: 'normal',
  },

  tableLoading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '56px',
    gap: '12px',
  },
  spinner: {
    width: '26px',
    height: '26px',
    border: '3px solid #E5E7EB',
    borderTopColor: '#2563EB',
    borderRadius: '50%',
    animation: 'cdocSpin 0.9s linear infinite',
  },

  emptyState: {
    padding: '56px 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyIconWrap: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  emptyTitle: { fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '0 0 6px' },
  emptyDesc: { fontSize: '0.85rem', color: '#6B7280', margin: '0 0 22px', maxWidth: '360px' },

  docGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '14px',
  },
  docCard: { padding: '18px' },
  docCardTop: { display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' },
  docIconWrap: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: '#EEF4FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  docName: {
    fontSize: '0.86rem',
    fontWeight: 700,
    color: '#111827',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  docDate: { fontSize: '0.72rem', color: '#9CA3AF', marginTop: '2px' },
  docMetaRow: { display: 'flex', gap: '18px', marginBottom: '12px' },
  docMetaItem: { display: 'flex', flexDirection: 'column' },
  docMetaLabel: { fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' },
  docMetaValue: { fontSize: '0.85rem', color: '#111827', fontWeight: 700, marginTop: '1px' },
  docStatusRow: { display: 'flex', gap: '6px', marginBottom: '14px' },
  infoExpand: {
    background: '#F9FAFB',
    border: '1px solid #F1F5F9',
    borderRadius: '10px',
    padding: '10px 12px',
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  infoLineRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem' },
  infoLineLabel: { color: '#6B7280' },
  infoLineValue: { color: '#111827', fontWeight: 600 },
  docActions: { display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' },

  pipelineCard: { padding: '28px 24px', marginTop: '4px' },
  pipelineRow: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '4px', overflowX: 'auto' },
  pipelineStep: { display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '90px', flexShrink: 0 },
  pipelineIconWrap: {
    width: '46px',
    height: '46px',
    borderRadius: '13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  pipelineLabel: { fontSize: '0.78rem', fontWeight: 700, color: '#111827', textAlign: 'center' },

  timelineCard: { padding: '10px 20px' },
  timelineRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #F1F5F9',
  },
  timelineDot: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  timelineLabel: { fontSize: '0.82rem', fontWeight: 600, color: '#111827' },
  timelineTime: { fontSize: '0.72rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 },
};
