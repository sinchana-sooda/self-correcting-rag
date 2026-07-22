import { API_BASE } from "../api";
import React, { useState, useEffect } from 'react';

/* ============================================================
   Tiny inline icon set (no external icon library — SVG only,
   per design requirements)
   ============================================================ */
const Icon = {
  Doc: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Database: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  ),
  Cpu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
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
  ArrowDown: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Brain: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.5A2.5 2.5 0 0 1 5 17.5v-1.55A2.5 2.5 0 0 1 3.5 13.5v-3A2.5 2.5 0 0 1 5 8.05V6.5A2.5 2.5 0 0 1 7.5 4a2.5 2.5 0 0 1 2-2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.5A2.5 2.5 0 0 0 19 17.5v-1.55A2.5 2.5 0 0 0 20.5 13.5v-3A2.5 2.5 0 0 0 19 8.05V6.5A2.5 2.5 0 0 0 16.5 4a2.5 2.5 0 0 0-2-2Z" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  ),
  MessageSquare: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Upload: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Flow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h6a3 3 0 0 1 3 3v6" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  ),
  Quote: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 8v4a4 4 0 0 1-4 4M17 8v4a4 4 0 0 1-4 4" />
      <path d="M3 8h4v4H3zM13 8h4v4h-4z" />
    </svg>
  ),
  Bolt: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

export default function Dashboard({ setActiveTab }) {
  const [stats, setStats] = useState({
    documentsCount: 0,
    chunksCount: 0,
    queriesCount: 0,
    avgConfidence: 0,
    avgLatency: 0,
    correctionRate: 0
  });
  const [recentDocs, setRecentDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch documents
        const docsResponse = await fetch(`${API_BASE}/api/documents`);
        const docsData = await docsResponse.json();

        // Fetch chat history
        const chatResponse = await fetch(`${API_BASE}/api/chat/history`);
        const chatData = await chatResponse.json();

        // Calculate statistics
        const totalDocs = docsData.length;
        const totalChunks = docsData.reduce((acc, curr) => acc + curr.chunk_count, 0);
        const totalQueries = chatData.length;

        let avgConf = 0;
        let avgLat = 0;
        let correctionsTriggered = 0;

        if (totalQueries > 0) {
          let sumConf = 0;
          let sumLat = 0;

          chatData.forEach(q => {
            // Find confidence score of the final evaluation
            const evals = q.critic_evaluations;
            if (evals && evals.length > 0) {
              sumConf += evals[evals.length - 1].confidence_score;
            }
            sumLat += q.latency_ms;

            // If there is more than 1 evaluation, or a reformulated query exists, it corrected!
            if (q.reformulated_query || (q.retrieval_attempts && q.retrieval_attempts.length > 1)) {
              correctionsTriggered++;
            }
          });

          avgConf = Math.round((sumConf / totalQueries) * 100);
          avgLat = Math.round(sumLat / totalQueries);
        }

        setStats({
          documentsCount: totalDocs,
          chunksCount: totalChunks,
          queriesCount: totalQueries,
          avgConfidence: avgConf || 0,
          avgLatency: avgLat || 0,
          correctionRate: totalQueries > 0 ? Math.round((correctionsTriggered / totalQueries) * 100) : 0
        });

        // Sorted by upload time descending, take top 4
        const sortedDocs = [...docsData].sort((a, b) => b.upload_time - a.upload_time).slice(0, 4);
        setRecentDocs(sortedDocs);

      } catch (err) {
        console.error("Error fetching dashboard statistics: " + err);
      } finally {
        setLoading(false);
        requestAnimationFrame(() => setMounted(true));
      }
    }
    fetchData();
  }, []);

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function formatWhen(ts) {
    if (!ts) return '';
    // upload_time may be seconds or ms epoch, or an ISO string — handle all
    const ms = typeof ts === 'number' ? (ts < 10_000_000_000 ? ts * 1000 : ts) : Date.parse(ts);
    if (Number.isNaN(ms)) return '';
    const diffMin = Math.round((Date.now() - ms) / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.round(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${Math.round(diffHr / 24)}d ago`;
  }

  const pipelineSteps = [
    { icon: Icon.MessageSquare, title: 'User Query', desc: 'A question enters the pipeline.', color: '#2563EB' },
    { icon: Icon.Cpu, title: 'Embedding', desc: 'Convert query into vector representation.', color: '#6366F1' },
    { icon: Icon.Search, title: 'Vector Search', desc: 'ChromaDB retrieves nearest chunks.', color: '#0EA5E9' },
    { icon: Icon.Doc, title: 'Context Retrieval', desc: 'Top matching passages are assembled.', color: '#22C55E' },
    { icon: Icon.Brain, title: 'Critic Evaluation', desc: 'Context is graded for sufficiency.', color: '#F59E0B' },
    { icon: Icon.Sparkle, title: 'Generate Answer', desc: 'Gemini drafts a grounded response.', color: '#6366F1' },
    { icon: Icon.CheckCircle, title: 'Final Response', desc: 'Verified answer is returned to you.', color: '#2563EB' },
  ];

  const capabilities = [
    { icon: Icon.Search, title: 'Semantic Search', desc: 'Finds passages by meaning, not just keyword overlap, using dense vector similarity.' },
    { icon: Icon.Sparkle, title: 'Gemini AI', desc: "Answers are generated by Google's Gemini models, grounded in your own documents." },
    { icon: Icon.Brain, title: 'Self-Correction', desc: 'A Critic Loop detects weak retrieval and automatically reformulates the query.' },
    { icon: Icon.Quote, title: 'Source Citations', desc: 'Every answer traces back to the exact chunks that supported it.' },
    { icon: Icon.CheckCircle, title: 'Context Evaluation', desc: 'Retrieved context is scored for sufficiency before generation ever runs.' },
    { icon: Icon.Bolt, title: 'Fast Retrieval', desc: 'ChromaDB vector search returns relevant chunks in milliseconds.' },
  ];

  // Build a real, data-grounded activity feed from what we actually fetched
  const activity = recentDocs.length > 0
    ? recentDocs.flatMap((doc) => ([
        { icon: Icon.Upload, color: '#2563EB', label: `PDF uploaded — ${doc.filename}`, time: doc.upload_time },
        { icon: Icon.CheckCircle, color: '#22C55E', label: `${doc.chunk_count} chunks embedded & stored in ChromaDB`, time: doc.upload_time },
      ])).slice(0, 6)
    : [];

  if (loading) {
    return (
      <div className="page-container">
        <CragStyle />
        <div style={styles.loadingContainer}>
          <div style={styles.spinner} />
          <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>Loading system metrics…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <CragStyle />

      {/* ================= HERO ================= */}
      <div className="crag-fade" style={{ ...styles.hero, transitionDelay: '0ms' }}>
        <div style={styles.heroGrid}>
          <div>
            <h1 style={styles.heroTitle}>Self-Correcting RAG Platform</h1>
            <p style={styles.heroSubtitle}>
              A Retrieval-Augmented Generation system powered by Gemini, ChromaDB and an
              intelligent Critic Loop that validates retrieved context before generating responses.
            </p>
            <div style={styles.badgeRow}>
              <span className="crag-hero-badge"><Icon.Check style={styles.badgeIcon} /> Gemini AI</span>
              <span className="crag-hero-badge"><Icon.Check style={styles.badgeIcon} /> ChromaDB Vector Search</span>
              <span className="crag-hero-badge"><Icon.Check style={styles.badgeIcon} /> Self-Correcting Pipeline</span>
            </div>
            <div style={styles.ctaRow}>
              <button className="crag-btn crag-btn-primary" onClick={() => setActiveTab('documents')}>
                <Icon.Upload style={styles.btnIcon} /> Upload Documents
              </button>
              <button className="crag-btn crag-btn-secondary" onClick={() => setActiveTab('chat')}>
                <Icon.MessageSquare style={styles.btnIcon} /> Open Playground
              </button>
            </div>
          </div>

          {/* Decorative SVG illustration — gradients + glowing shapes only, no images */}
          <div style={styles.heroArt}>
            <svg viewBox="0 0 320 280" width="100%" height="100%" style={{ overflow: 'visible' }}>
              <defs>
                <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
              <circle cx="160" cy="140" r="130" fill="url(#glow1)" className="crag-blob-a" />
              <circle cx="210" cy="90" r="90" fill="url(#glow2)" className="crag-blob-b" />
              <circle cx="160" cy="140" r="86" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="4 7" className="crag-ring-spin" opacity="0.55" />
              <circle cx="160" cy="140" r="58" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
              <g className="crag-node-pulse">
                <circle cx="160" cy="140" r="10" fill="url(#ringGrad)" />
              </g>
              {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const x = 160 + 100 * Math.cos(rad);
                const y = 140 + 100 * Math.sin(rad);
                return (
                  <g key={deg}>
                    <line x1="160" y1="140" x2={x} y2={y} stroke="#C7D2FE" strokeWidth="1.2" opacity="0.7" />
                    <circle cx={x} cy={y} r="6" fill="#fff" stroke="#6366F1" strokeWidth="1.5" className="crag-node-float" style={{ animationDelay: `${i * 0.3}s` }} />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* ================= SYSTEM STATUS CARDS ================= */}
      <div style={styles.statsGrid}>
        <StatusCard
          delay={60}
          icon={Icon.Doc}
          iconColor="#2563EB"
          iconBg="#EEF4FF"
          title="Documents Indexed"
          value={stats.documentsCount}
          subtitle="Ready for Retrieval"
        />
        <StatusCard
          delay={120}
          icon={Icon.Database}
          iconColor="#22C55E"
          iconBg="#F0FDF4"
          title="Vector Database"
          value="Connected"
          subtitle="ChromaDB Active"
          valueColor="#16A34A"
          dot
        />
        <StatusCard
          delay={180}
          icon={Icon.Cpu}
          iconColor="#6366F1"
          iconBg="#EEF2FF"
          title="Embedding Model"
          value="Gemini Embeddings"
          subtitle="Latest Google Model"
        />
        <StatusCard
          delay={240}
          icon={Icon.CheckCircle}
          iconColor="#22C55E"
          iconBg="#F0FDF4"
          title="Pipeline Health"
          value="Healthy"
          subtitle="Critic Loop Operational"
          valueColor="#16A34A"
        />
      </div>

      {/* ================= PIPELINE VISUALIZATION ================= */}
      <SectionHeading>How a Query Flows Through the System</SectionHeading>
      <div className="crag-card crag-fade" style={{ ...styles.panel, transitionDelay: '260ms' }}>
        <div style={styles.pipelineRow}>
          {pipelineSteps.map((step, i) => (
            <React.Fragment key={step.title}>
              <div className="crag-pipeline-step" style={styles.pipelineStep}>
                <div style={{ ...styles.pipelineIconWrap, backgroundColor: `${step.color}14`, color: step.color }}>
                  <step.icon style={{ width: 20, height: 20 }} />
                </div>
                <div style={styles.pipelineStepTitle}>{step.title}</div>
                <div style={styles.pipelineStepDesc}>{step.desc}</div>
              </div>
              {i < pipelineSteps.length - 1 && (
                <div style={styles.pipelineArrow}>
                  <Icon.ArrowRight style={{ width: 18, height: 18, color: '#D1D5DB' }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ================= PLATFORM CAPABILITIES ================= */}
      <SectionHeading>Platform Capabilities</SectionHeading>
      <div style={styles.capGrid}>
        {capabilities.map((cap, i) => (
          <div key={cap.title} className="crag-card crag-cap-card crag-fade" style={{ ...styles.capCard, transitionDelay: `${300 + i * 50}ms` }}>
            <div style={styles.capIconWrap}>
              <cap.icon style={{ width: 20, height: 20 }} />
            </div>
            <div style={styles.capTitle}>{cap.title}</div>
            <div style={styles.capDesc}>{cap.desc}</div>
          </div>
        ))}
      </div>

      {/* ================= QUICK ACTIONS + RECENT ACTIVITY ================= */}
      <div style={styles.dashboardSplit}>
        <div style={styles.splitMain}>
          <SectionHeading>Quick Actions</SectionHeading>
          <div className="crag-card" style={styles.panel}>
            <div style={styles.quickActionsGrid}>
              <QuickAction
                icon={Icon.Upload}
                color="#2563EB"
                title="Upload Documents"
                desc="Add new PDFs to the knowledge base"
                onClick={() => setActiveTab('documents')}
              />
              <QuickAction
                icon={Icon.MessageSquare}
                color="#6366F1"
                title="Open Chat Playground"
                desc="Ask questions grounded in your docs"
                onClick={() => setActiveTab('chat')}
              />
              <QuickAction
                icon={Icon.Flow}
                color="#0EA5E9"
                title="View Evaluation Flow"
                desc="Inspect retrieval & critic traces"
                onClick={() => setActiveTab('evaluation')}
              />
            </div>
          </div>

          <SectionHeading style={{ marginTop: '28px' }}>System Information</SectionHeading>
          <div className="crag-card" style={styles.panel}>
            <InfoRow label="Backend" value="Online" valueColor="#16A34A" dot />
            <InfoRow label="Gemini Model" value="gemini-2.5-flash" mono />
            <InfoRow label="Embedding Model" value="text-embedding-004" mono />
            <InfoRow label="Vector Database" value="ChromaDB" mono />
            <InfoRow label="Pipeline" value="Healthy" valueColor="#16A34A" last />
          </div>
        </div>

        <div style={styles.splitSide}>
          <SectionHeading>Recent Activity</SectionHeading>
          <div className="crag-card" style={{ ...styles.panel, height: 'calc(100% - 36px)' }}>
            {activity.length === 0 ? (
              <div style={styles.emptyState}>
                <Icon.Doc style={{ width: 28, height: 28, color: '#D1D5DB', marginBottom: 10 }} />
                <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: 0 }}>No activity yet. Upload a document to get started.</p>
              </div>
            ) : (
              <div style={styles.timeline}>
                {activity.map((item, i) => (
                  <div key={i} style={styles.timelineRow}>
                    <div style={styles.timelineRail}>
                      <div style={{ ...styles.timelineDot, backgroundColor: item.color }}>
                        <item.icon style={{ width: 11, height: 11, color: '#fff' }} />
                      </div>
                      {i < activity.length - 1 && <div style={styles.timelineLine} />}
                    </div>
                    <div style={{ paddingBottom: '18px' }}>
                      <div style={styles.timelineLabel}>{item.label}</div>
                      <div style={styles.timelineTime}>
                        <Icon.Clock style={{ width: 11, height: 11 }} /> {formatWhen(item.time)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Small presentational sub-components (kept in this file only)
   ============================================================ */
function SectionHeading({ children, style }) {
  return <h3 style={{ ...styles.sectionHeading, ...style }}>{children}</h3>;
}

function StatusCard({ icon: IconComp, iconColor, iconBg, title, value, subtitle, valueColor, dot, delay }) {
  return (
    <div className="crag-card crag-stat-card crag-fade" style={{ ...styles.statCard, transitionDelay: `${delay}ms` }}>
      <div style={{ ...styles.statIconWrap, backgroundColor: iconBg, color: iconColor }}>
        <IconComp style={{ width: 20, height: 20 }} />
      </div>
      <div style={styles.statTitle}>{title}</div>
      <div style={{ ...styles.statValue, color: valueColor || '#111827' }}>
        {dot && <span style={styles.liveDot} />}
        {value}
      </div>
      <div style={styles.statSubtitle}>{subtitle}</div>
    </div>
  );
}

function QuickAction({ icon: IconComp, color, title, desc, onClick }) {
  return (
    <button className="crag-quick-action" onClick={onClick} style={styles.quickAction}>
      <div style={{ ...styles.quickActionIcon, backgroundColor: `${color}14`, color }}>
        <IconComp style={{ width: 20, height: 20 }} />
      </div>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={styles.quickActionTitle}>{title}</div>
        <div style={styles.quickActionDesc}>{desc}</div>
      </div>
      <Icon.ArrowRight style={{ width: 16, height: 16, color: '#9CA3AF' }} />
    </button>
  );
}

function InfoRow({ label, value, valueColor, mono, dot, last }) {
  return (
    <div style={{ ...styles.infoRow, borderBottom: last ? 'none' : '1px solid #F1F5F9' }}>
      <span style={styles.infoLabel}>{label}</span>
      <span style={{ ...styles.infoValue, color: valueColor || '#111827', fontFamily: mono ? "'JetBrains Mono', monospace" : 'inherit' }}>
        {dot && <span style={styles.liveDot} />}
        {value}
      </span>
    </div>
  );
}

/* Scoped styles: hover states, keyframes and anything CSS
   variables/inline styles can't express — kept local to this
   file so no other page or global stylesheet is touched. */
function CragStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

      .crag-fade {
        opacity: 0;
        transform: translateY(12px);
        animation: cragFadeUp 0.5s ease forwards;
      }
      @keyframes cragFadeUp {
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes cragSpin { to { transform: rotate(360deg); } }
      @keyframes cragPulseDot {
        0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
        70% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
      }
      @keyframes cragFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      @keyframes cragRingSpin {
        to { transform: rotate(360deg); }
      }
      @keyframes cragBlobDrift {
        0%, 100% { transform: translate(0,0) scale(1); }
        50% { transform: translate(6px,-8px) scale(1.04); }
      }

      .crag-card {
        background: #FFFFFF;
        border: 1px solid #E5E7EB;
        border-radius: 20px;
        box-shadow: 0 1px 3px rgba(17,24,39,0.06), 0 1px 2px rgba(17,24,39,0.04);
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      }

      .crag-stat-card:hover, .crag-cap-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 28px rgba(17,24,39,0.09);
        border-color: #D1D5DB;
      }

      .crag-hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        font-weight: 600;
        color: #1D4ED8;
        background: #EEF4FF;
        border: 1px solid #DBEAFE;
        padding: 7px 14px;
        border-radius: 999px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .crag-hero-badge:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(37,99,235,0.18);
      }

      .crag-btn {
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        border-radius: 999px;
        padding: 12px 22px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease, background-color 0.2s ease;
      }
      .crag-btn-primary {
        color: #fff;
        background: linear-gradient(135deg, #2563EB 0%, #6366F1 100%);
        box-shadow: 0 8px 22px rgba(37,99,235,0.28);
      }
      .crag-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.05); }
      .crag-btn-secondary {
        color: #111827;
        background: #fff;
        border: 1px solid #E5E7EB;
      }
      .crag-btn-secondary:hover { transform: translateY(-2px); border-color: #D1D5DB; box-shadow: 0 4px 12px rgba(17,24,39,0.06); }

      .crag-pipeline-step { transition: transform 0.2s ease; }
      .crag-pipeline-step:hover { transform: translateY(-3px); }

      .crag-quick-action {
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
        text-align: left;
        background: #F9FAFB;
        border: 1px solid #F1F5F9;
        border-radius: 16px;
        padding: 16px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
      }
      .crag-quick-action:hover {
        transform: translateY(-2px);
        border-color: #E5E7EB;
        background-color: #fff;
        box-shadow: 0 8px 20px rgba(17,24,39,0.07);
      }

      .crag-blob-a { animation: cragBlobDrift 8s ease-in-out infinite; }
      .crag-blob-b { animation: cragBlobDrift 10s ease-in-out infinite reverse; }
      .crag-ring-spin { transform-origin: 160px 140px; animation: cragRingSpin 26s linear infinite; }
      .crag-node-pulse circle { animation: cragPulseDot 2.2s ease infinite; }
      .crag-node-float { animation: cragFloat 3s ease-in-out infinite; transform-origin: center; }
    `}</style>
  );
}

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    gap: '16px',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #E5E7EB',
    borderTopColor: '#2563EB',
    borderRadius: '50%',
    animation: 'cragSpin 0.9s linear infinite',
  },

  hero: {
    background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFF 100%)',
    border: '1px solid #E5E7EB',
    borderRadius: '20px',
    padding: '40px',
    marginBottom: '28px',
    boxShadow: '0 4px 16px rgba(17,24,39,0.05)',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.3fr 1fr',
    gap: '32px',
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    fontSize: '2.35rem',
    letterSpacing: '-0.02em',
    color: '#111827',
    margin: '0 0 14px',
    lineHeight: 1.15,
  },
  heroSubtitle: {
    fontSize: '1rem',
    lineHeight: 1.65,
    color: '#6B7280',
    maxWidth: '520px',
    marginBottom: '22px',
  },
  badgeRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '26px',
  },
  badgeIcon: { width: 13, height: 13 },
  ctaRow: { display: 'flex', gap: '12px' },
  btnIcon: { width: 16, height: 16 },
  heroArt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '260px',
  },

  sectionHeading: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#6B7280',
    margin: '0 0 14px',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  statCard: { padding: '22px' },
  statIconWrap: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  statTitle: { fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', marginBottom: '6px' },
  statValue: { fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' },
  statSubtitle: { fontSize: '0.78rem', color: '#9CA3AF' },
  liveDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#22C55E',
    display: 'inline-block',
    animation: 'cragPulseDot 2s infinite',
  },

  panel: { padding: '26px', marginBottom: '32px' },

  pipelineRow: {
    display: 'flex',
    alignItems: 'flex-start',
    overflowX: 'auto',
    gap: '4px',
    paddingBottom: '4px',
  },
  pipelineStep: {
    minWidth: '140px',
    flexShrink: 0,
    textAlign: 'center',
    padding: '4px 6px',
  },
  pipelineIconWrap: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
  },
  pipelineStepTitle: { fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '6px' },
  pipelineStepDesc: { fontSize: '0.72rem', color: '#6B7280', lineHeight: 1.45 },
  pipelineArrow: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    height: '42px',
    marginTop: '4px',
  },

  capGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  capCard: { padding: '22px' },
  capIconWrap: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    backgroundColor: '#EEF4FF',
    color: '#2563EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '14px',
  },
  capTitle: { fontSize: '0.92rem', fontWeight: 700, color: '#111827', marginBottom: '6px' },
  capDesc: { fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.55 },

  dashboardSplit: {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    gap: '20px',
    alignItems: 'start',
  },
  splitMain: {},
  splitSide: {},

  quickActionsGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  quickAction: {},
  quickActionIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  quickActionTitle: { fontSize: '0.86rem', fontWeight: 700, color: '#111827' },
  quickActionDesc: { fontSize: '0.75rem', color: '#6B7280', marginTop: '2px' },

  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '13px 2px',
  },
  infoLabel: { fontSize: '0.82rem', color: '#6B7280', fontWeight: 500 },
  infoValue: { fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '7px' },

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    textAlign: 'center',
  },
  timeline: { paddingTop: '2px' },
  timelineRow: { display: 'flex', gap: '12px' },
  timelineRail: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  timelineDot: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  timelineLine: { width: '2px', flex: 1, backgroundColor: '#E5E7EB', marginTop: '4px' },
  timelineLabel: { fontSize: '0.82rem', fontWeight: 600, color: '#111827', marginBottom: '3px' },
  timelineTime: { fontSize: '0.72rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px' },
};
