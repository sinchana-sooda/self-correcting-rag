import React, { useState, useEffect } from 'react';

/* ============================================================
   Tiny inline icon set (no external icon library, SVG only —
   kept consistent with the rest of the redesigned app)
   ============================================================ */
const Icon = {
  Brain: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.5A2.5 2.5 0 0 1 5 17.5v-1.55A2.5 2.5 0 0 1 3.5 13.5v-3A2.5 2.5 0 0 1 5 8.05V6.5A2.5 2.5 0 0 1 7.5 4a2.5 2.5 0 0 1 2-2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.5A2.5 2.5 0 0 0 19 17.5v-1.55A2.5 2.5 0 0 0 20.5 13.5v-3A2.5 2.5 0 0 0 19 8.05V6.5A2.5 2.5 0 0 0 16.5 4a2.5 2.5 0 0 0-2-2Z" />
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  ),
  Eye: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Bolt: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Cpu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  RefreshCw: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  CheckCircle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  AlertTriangle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  MessageSquare: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" />
    </svg>
  ),
  Layers: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  ArrowDown: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  ),
  ChevronDown: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Code: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  ),
  Empty: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
};

/* ============================================================
   Small helpers — derive presentational metrics from the real
   trace data. Where the backend doesn't provide a metric
   directly (hallucination risk / groundedness aren't produced
   by the API), we compute an honest, clearly-labelled proxy
   from fields that ARE real (confidence score, sufficiency,
   chunk similarity) rather than inventing numbers.
   ============================================================ */
function avgChunkScore(chunks) {
  if (!chunks || chunks.length === 0) return null;
  const nums = chunks.map(c => parseFloat(c.score)).filter(n => !Number.isNaN(n));
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function scoreTone(pct) {
  if (pct >= 75) return { color: '#10B981', bg: '#ECFDF5', label: 'success' };
  if (pct >= 45) return { color: '#F59E0B', bg: '#FFFBEB', label: 'warning' };
  return { color: '#EF4444', bg: '#FEF2F2', label: 'danger' };
}

export default function Evaluation({ devMode = false }) {
  const [history, setHistory] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/chat/history');
      const data = await response.json();
      setHistory(data);
      if (data.length > 0 && !selectedQuery) {
        setSelectedQuery(data[0]); // Default to selecting the latest query
      }
    } catch (err) {
      setError('Failed to fetch query logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClear = async () => {
    if (!confirm('Are you sure you want to clear all query logs?')) {
      return;
    }
    try {
      await fetch('/api/chat/history/clear', { method: 'POST' });
      setHistory([]);
      setSelectedQuery(null);
    } catch (err) {
      setError('Failed to clear logs.');
    }
  };

  function formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  const hasCorrection = selectedQuery && (selectedQuery.reformulated_query || selectedQuery.retrieval_attempts.length > 1);
  const lastEval = selectedQuery?.critic_evaluations?.[selectedQuery.critic_evaluations.length - 1];
  const totalChunks = selectedQuery ? selectedQuery.retrieval_attempts.reduce((a, r) => a + r.chunks.length, 0) : 0;
  const overallAvgScore = selectedQuery ? avgChunkScore(selectedQuery.retrieval_attempts.flatMap(r => r.chunks)) : null;

  return (
    <div className="page-container ceval-root">
      <CevalStyle />

      {/* ================= HERO ================= */}
      <div className="ceval-card ceval-fade" style={styles.hero}>
        <div style={styles.heroRow}>
          <div>
            <h1 style={styles.heroTitle}>🧠 Self-Correcting RAG Evaluation</h1>
            <p style={styles.heroSubtitle}>
              Visualize every retrieval attempt, critic evaluation, query reformulation and reasoning
              process performed before generating the final answer.
            </p>
          </div>
          <div style={styles.heroBadges}>
            <span className="ceval-badge ceval-badge-indigo"><Icon.Brain style={styles.badgeIcon} /> Critic Loop</span>
            <span className="ceval-badge ceval-badge-green"><Icon.Shield style={styles.badgeIcon} /> Hallucination Prevention</span>
            <span className="ceval-badge ceval-badge-blue"><Icon.Eye style={styles.badgeIcon} /> Explainable AI</span>
            <span className="ceval-badge ceval-badge-live"><span className="ceval-live-dot" /> Live Evaluation</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="ceval-fade" style={styles.alertError}>
          <Icon.AlertTriangle style={{ width: 16, height: 16, flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="ceval-card" style={styles.centerLoading}>
          <div style={styles.spinner} />
          <span style={{ color: '#6B7280', fontSize: '0.85rem' }}>Loading RAG execution logs…</span>
        </div>
      ) : history.length === 0 ? (
        <div className="ceval-card ceval-fade" style={styles.emptyCard}>
          <div style={styles.emptyIconWrap}>
            <Icon.Empty style={{ width: 30, height: 30, color: '#9CA3AF' }} />
          </div>
          <h3 style={styles.emptyTitle}>No logs available</h3>
          <p style={styles.emptyDesc}>Execute some questions in the Chat Playground. The critic evaluations and search corrections will be traced here.</p>
        </div>
      ) : (
        <>
          {/* ================= LOG LIST + CLEAR ================= */}
          <div style={styles.topBar}>
            <SectionHeading>Query Logs</SectionHeading>
            <button className="ceval-btn ceval-btn-danger-outline" onClick={handleClear}>Clear Logs</button>
          </div>

          <div style={styles.contentLayout}>
            {/* Left: log list */}
            <div className="ceval-card" style={styles.listPanel}>
              <div style={styles.listScroll}>
                {history.map((item, idx) => {
                  const isSelected = selectedQuery && selectedQuery.timestamp === item.timestamp;
                  const requiresCorrection = item.reformulated_query || item.retrieval_attempts.length > 1;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedQuery(item)}
                      className={`ceval-log-item ${isSelected ? 'ceval-log-item-selected' : ''}`}
                    >
                      <div style={styles.logQueryText}>{item.query}</div>
                      <div style={styles.logMetaRow}>
                        <span style={styles.logDate}>{formatDate(item.timestamp)}</span>
                        {requiresCorrection ? (
                          <span className="ceval-chip ceval-chip-warning">Self-Corrected</span>
                        ) : (
                          <span className="ceval-chip ceval-chip-success">Single-Pass</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: pipeline flow for the selected query */}
            <div style={styles.rightCol}>
              {selectedQuery && (
                <>
                  <SectionHeading>Interactive Pipeline Visualization</SectionHeading>
                  <PipelineFlow selectedQuery={selectedQuery} />

                  {selectedQuery.critic_evaluations.length > 0 && (
                    <>
                      <SectionHeading style={{ marginTop: '30px' }}>Critic Evaluation</SectionHeading>
                      <div style={styles.criticGrid}>
                        {selectedQuery.critic_evaluations.map((ev, i) => (
                          <CriticCard key={i} evalData={ev} label={`Attempt ${i + 1}`} />
                        ))}
                      </div>
                    </>
                  )}

                  <SectionHeading style={{ marginTop: '30px' }}>Retrieval Attempts</SectionHeading>
                  <RetrievalAttemptsCompare selectedQuery={selectedQuery} />

                  {selectedQuery.reformulated_query && (
                    <>
                      <SectionHeading style={{ marginTop: '30px' }}>AI Query Reformulation</SectionHeading>
                      <ReformulationCard
                        original={selectedQuery.retrieval_attempts[0]?.query_used || selectedQuery.query}
                        feedback={selectedQuery.critic_evaluations[0]?.missing_information || selectedQuery.critic_evaluations[0]?.reasoning}
                        improved={selectedQuery.reformulated_query}
                      />
                    </>
                  )}

                  <SectionHeading style={{ marginTop: '30px' }}>Performance Metrics</SectionHeading>
                  <PerformanceMetrics selectedQuery={selectedQuery} totalChunks={totalChunks} lastEval={lastEval} />

                  <SectionHeading style={{ marginTop: '30px' }}>Execution Timeline</SectionHeading>
                  <ExecutionTimeline selectedQuery={selectedQuery} />

                  <SectionHeading style={{ marginTop: '30px' }}>Confidence Visualization</SectionHeading>
                  <ConfidenceGauges selectedQuery={selectedQuery} lastEval={lastEval} overallAvgScore={overallAvgScore} />

                  {devMode && (
                    <>
                      <SectionHeading style={{ marginTop: '30px' }}>Developer Insights</SectionHeading>
                      <DeveloperInsights selectedQuery={selectedQuery} />
                    </>
                  )}

                  <SectionHeading style={{ marginTop: '30px' }}>Explainability — How This Pipeline Works</SectionHeading>
                  <ExplainabilityPanel />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   Pipeline Flow — restyled version of the original step-by-step
   mapping. Same branching logic (only shows reformulation +
   second retrieval + second eval if selectedQuery.reformulated_query
   exists), same underlying fields.
   ============================================================ */
function PipelineFlow({ selectedQuery }) {
  const eval1 = selectedQuery.critic_evaluations[0];
  const eval2 = selectedQuery.critic_evaluations[1];

  return (
    <div className="ceval-card ceval-fade" style={styles.flowCard}>
      <FlowNode icon={Icon.MessageSquare} tone="info" title="1. User Query" delay={0}>
        <div style={styles.nodeText}>"{selectedQuery.query}"</div>
      </FlowNode>
      <Connector />

      <FlowNode icon={Icon.Cpu} tone="info" title="2. Embedding Generation" delay={60}>
        <div style={styles.nodeText}>Query converted into a vector representation for similarity search.</div>
      </FlowNode>
      <Connector />

      <FlowNode icon={Icon.Layers} tone="info" title="3. Retrieval Attempt 1" delay={120} badge={`k=${selectedQuery.retrieval_attempts[0]?.chunks.length ?? 0}`}>
        <ChunkPreviewList chunks={selectedQuery.retrieval_attempts[0]?.chunks} />
      </FlowNode>
      <Connector />

      <FlowNode
        icon={Icon.Brain}
        tone={eval1?.is_sufficient ? 'success' : 'warning'}
        title="4. Critic Evaluation"
        delay={180}
        badge={eval1?.is_sufficient ? 'Sufficient' : 'Insufficient'}
      >
        <div style={styles.evalText}><strong>Confidence:</strong> {Math.round((eval1?.confidence_score || 0) * 100)}%</div>
        <div style={styles.evalText}><strong>Reasoning:</strong> {eval1?.reasoning}</div>
        {!eval1?.is_sufficient && (
          <div style={{ ...styles.evalText, color: '#B45309', marginTop: '4px' }}>
            <strong>Missing Info:</strong> {eval1?.missing_information}
          </div>
        )}
      </FlowNode>

      {selectedQuery.reformulated_query ? (
        <>
          <Connector label="insufficient → reformulate" />
          <FlowNode icon={Icon.RefreshCw} tone="info" title="5. Query Reformulation" delay={240}>
            <div style={{ ...styles.nodeText, color: '#2563EB', fontStyle: 'italic' }}>
              Reformulated: "{selectedQuery.reformulated_query}"
            </div>
          </FlowNode>
          <Connector />

          <FlowNode icon={Icon.Layers} tone="info" title="6. Retrieval Attempt 2" delay={300} badge={`k=${selectedQuery.retrieval_attempts[1]?.chunks.length ?? 0}`}>
            <ChunkPreviewList chunks={selectedQuery.retrieval_attempts[1]?.chunks} />
          </FlowNode>
          <Connector />

          <FlowNode
            icon={Icon.Brain}
            tone={eval2?.is_sufficient ? 'success' : 'danger'}
            title="7. Critic Re-Evaluation"
            delay={360}
            badge={eval2?.is_sufficient ? 'Sufficient' : 'Insufficient'}
          >
            <div style={styles.evalText}><strong>Confidence:</strong> {Math.round((eval2?.confidence_score || 0) * 100)}%</div>
            <div style={styles.evalText}><strong>Reasoning:</strong> {eval2?.reasoning}</div>
          </FlowNode>
          <Connector label={selectedQuery.final_action === 'answer' ? 'sufficient → generate' : 'still insufficient → clarify'} />
        </>
      ) : (
        <Connector label={eval1?.is_sufficient ? 'sufficient → generate' : 'clarify'} />
      )}

      <FlowNode
        icon={Icon.Sparkle}
        tone={selectedQuery.final_action === 'answer' ? 'success' : 'info'}
        title={selectedQuery.final_action === 'answer' ? 'Final: Answer Generated' : 'Final: Clarification Requested'}
        delay={420}
        badge={selectedQuery.final_action?.toUpperCase()}
      >
        <div style={styles.nodeText}>{selectedQuery.response}</div>
        {selectedQuery.final_action === 'answer' && (
          <div style={styles.citationBox}>
            <div style={styles.citationLabel}>Sources Used</div>
            <div style={styles.citationList}>
              {Array.from(new Set(
                selectedQuery.retrieval_attempts.flatMap(a => a.chunks).map(c => `${c.source} (Page ${c.page})`)
              )).map((cit, i) => <span key={i} className="ceval-chip ceval-chip-neutral">{cit}</span>)}
            </div>
          </div>
        )}
      </FlowNode>
    </div>
  );
}

function Connector({ label }) {
  return (
    <div style={styles.connectorWrap}>
      <div style={styles.connectorLine} />
      {label && <span style={styles.connectorLabel}>{label}</span>}
    </div>
  );
}

function FlowNode({ icon: IconComp, tone, title, badge, children, delay = 0 }) {
  const toneColors = {
    info: { icon: '#2563EB', bg: '#EEF4FF', border: '#DBEAFE' },
    success: { icon: '#10B981', bg: '#ECFDF5', border: '#A7F3D0' },
    warning: { icon: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A' },
    danger: { icon: '#EF4444', bg: '#FEF2F2', border: '#FECACA' },
  }[tone];

  return (
    <div className="ceval-flow-node ceval-fade" style={{ ...styles.flowNodeRow, transitionDelay: `${delay}ms` }}>
      <div style={{ ...styles.nodeIconBg, backgroundColor: toneColors.bg, borderColor: toneColors.border, color: toneColors.icon }}>
        <IconComp style={{ width: 15, height: 15 }} />
      </div>
      <div className="ceval-node-card" style={{ ...styles.nodeCard, borderLeft: `3px solid ${toneColors.icon}` }}>
        <div style={styles.nodeHeaderRow}>
          <div style={styles.nodeLabel}>{title}</div>
          {badge && <span className="ceval-chip ceval-chip-neutral">{badge}</span>}
        </div>
        {children}
      </div>
    </div>
  );
}

function ChunkPreviewList({ chunks }) {
  if (!chunks || chunks.length === 0) return <div style={styles.nodeText}>No chunks retrieved.</div>;
  return (
    <div style={styles.chunkPreviewList}>
      {chunks.map((c, i) => (
        <div key={i} style={styles.miniChunk}>
          <div style={styles.miniChunkTop}>
            <span style={styles.miniChunkSource}>{c.source} (Page {c.page})</span>
            <span className="ceval-chip ceval-chip-neutral">Sim: {c.score}</span>
          </div>
          <div style={styles.miniChunkText}>{c.text}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Critic Evaluation glass card
   ============================================================ */
function CriticCard({ evalData, label }) {
  const pct = Math.round((evalData?.confidence_score || 0) * 100);
  const tone = evalData?.is_sufficient ? scoreTone(85) : scoreTone(35);

  return (
    <div className="ceval-glass-card ceval-fade" style={styles.criticCard}>
      <div style={styles.criticTopRow}>
        <span style={styles.criticLabel}>{label}</span>
        <span className="ceval-chip" style={{ backgroundColor: tone.bg, color: tone.color }}>
          {evalData?.is_sufficient ? 'Sufficient' : 'Insufficient'}
        </span>
      </div>
      <div style={styles.criticConfRow}>
        <span style={styles.criticConfLabel}>Confidence Score</span>
        <span style={{ ...styles.criticConfValue, color: tone.color }}>{pct}%</span>
      </div>
      <div style={styles.confBarBg}>
        <div className="ceval-conf-bar-fill" style={{ width: `${pct}%`, backgroundColor: tone.color }} />
      </div>
      <div style={{ ...styles.evalText, marginTop: '12px' }}><strong>Reasoning:</strong> {evalData?.reasoning}</div>
      {!evalData?.is_sufficient && evalData?.missing_information && (
        <div style={{ ...styles.evalText, color: '#B45309', marginTop: '6px' }}>
          <strong>Missing Information:</strong> {evalData.missing_information}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Side-by-side retrieval attempt comparison
   ============================================================ */
function RetrievalAttemptsCompare({ selectedQuery }) {
  const attempts = selectedQuery.retrieval_attempts;
  return (
    <div style={{ ...styles.attemptsGrid, gridTemplateColumns: attempts.length > 1 ? '1fr 1fr' : '1fr' }}>
      {attempts.map((att, i) => {
        const avg = avgChunkScore(att.chunks);
        const evalForAttempt = selectedQuery.critic_evaluations[i];
        return (
          <div key={i} className="ceval-card ceval-fade" style={styles.attemptCard}>
            <div style={styles.attemptHeaderRow}>
              <span style={styles.attemptTitle}>Attempt {att.attempt || i + 1}</span>
              {i === 1 && <span className="ceval-chip ceval-chip-success">Improved Retrieval</span>}
            </div>
            <div style={styles.attemptQuery}>Query used: "{att.query_used}"</div>
            <div style={styles.attemptStatsRow}>
              <MiniStat label="Retrieved Chunks" value={att.chunks.length} />
              <MiniStat label="Avg Similarity" value={avg !== null ? avg.toFixed(2) : '—'} />
              <MiniStat label="Confidence" value={evalForAttempt ? `${Math.round(evalForAttempt.confidence_score * 100)}%` : '—'} />
            </div>
            <div style={styles.attemptSourcesLabel}>Retrieved Sources</div>
            <div style={styles.citationList}>
              {Array.from(new Set(att.chunks.map(c => `${c.source} (p.${c.page})`))).map((s, si) => (
                <span key={si} className="ceval-chip ceval-chip-neutral">{s}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={styles.miniStat}>
      <div style={styles.miniStatValue}>{value}</div>
      <div style={styles.miniStatLabel}>{label}</div>
    </div>
  );
}

/* ============================================================
   Query Reformulation showcase
   ============================================================ */
function ReformulationCard({ original, feedback, improved }) {
  return (
    <div className="ceval-card ceval-fade ceval-reform-card" style={styles.reformCard}>
      <div style={styles.reformTitleRow}>
        <Icon.RefreshCw style={{ width: 18, height: 18, color: '#6366F1' }} />
        <span style={styles.reformTitle}>AI Query Reformulation</span>
      </div>
      <div style={styles.reformFlow}>
        <div style={styles.reformStep}>
          <div style={styles.reformStepLabel}>Original Query</div>
          <div style={styles.reformStepBox}>{original}</div>
        </div>
        <Icon.ArrowDown style={{ width: 16, height: 16, color: '#D1D5DB', margin: '4px auto' }} />
        <div style={styles.reformStep}>
          <div style={styles.reformStepLabel}>Critic Feedback</div>
          <div style={{ ...styles.reformStepBox, background: '#FFFBEB', borderColor: '#FDE68A', color: '#92400E' }}>{feedback}</div>
        </div>
        <Icon.ArrowDown style={{ width: 16, height: 16, color: '#D1D5DB', margin: '4px auto' }} />
        <div style={styles.reformStep}>
          <div style={styles.reformStepLabel}>Improved Query</div>
          <div style={{ ...styles.reformStepBox, background: '#EEF4FF', borderColor: '#DBEAFE', color: '#1D4ED8', fontWeight: 700 }}>{improved}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Performance metrics
   ============================================================ */
function PerformanceMetrics({ selectedQuery, totalChunks, lastEval }) {
  const attempts = selectedQuery.retrieval_attempts.length;
  const avgLatency = selectedQuery.latency_ms;
  const confPct = Math.round((lastEval?.confidence_score || 0) * 100);

  return (
    <div style={styles.metricsGrid}>
      <MetricCard icon={Icon.Clock} color="#2563EB" label="Total Latency" value={`${avgLatency} ms`} pct={Math.min((avgLatency / 3000) * 100, 100)} />
      <MetricCard icon={Icon.Layers} color="#6366F1" label="Retrieved Chunks" value={totalChunks} pct={Math.min((totalChunks / 10) * 100, 100)} />
      <MetricCard icon={Icon.Bolt} color="#0EA5E9" label="Estimated Tokens" value={selectedQuery.tokens_used} pct={Math.min((selectedQuery.tokens_used / 2000) * 100, 100)} />
      <MetricCard icon={Icon.Brain} color="#10B981" label="Confidence Score" value={`${confPct}%`} pct={confPct} />
    </div>
  );
}

function MetricCard({ icon: IconComp, color, label, value, pct }) {
  return (
    <div className="ceval-card ceval-metric-card ceval-fade" style={styles.metricCard}>
      <div style={{ ...styles.metricIconWrap, backgroundColor: `${color}1F`, color }}>
        <IconComp style={{ width: 17, height: 17 }} />
      </div>
      <div style={styles.metricValue}>{value}</div>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricBarBg}>
        <div style={{ ...styles.metricBarFill, width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

/* ============================================================
   Execution timeline — real steps, ordered from actual data.
   No fabricated per-step timestamps (backend doesn't provide
   them); each step is simply marked complete in sequence.
   ============================================================ */
function ExecutionTimeline({ selectedQuery }) {
  const steps = [
    'Embedding Generated',
    'Retrieval Complete',
    'Critic Evaluated',
  ];
  if (selectedQuery.reformulated_query) {
    steps.push('Query Reformulated', 'Second Retrieval', 'Second Critic Evaluation');
  }
  steps.push(selectedQuery.final_action === 'answer' ? 'Final Response Generated' : 'Clarification Requested');

  return (
    <div className="ceval-card" style={styles.timelineCard}>
      {steps.map((step, i) => (
        <div key={step} style={styles.timelineRow}>
          <div style={styles.timelineRail}>
            <div className="ceval-fade" style={{ ...styles.timelineDot, transitionDelay: `${i * 60}ms` }}>
              <Icon.CheckCircle style={{ width: 12, height: 12, color: '#fff' }} />
            </div>
            {i < steps.length - 1 && <div style={styles.timelineLine} />}
          </div>
          <div style={styles.timelineLabel}>{step}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Confidence visualization — circular gauges.
   Confidence + Retrieval Quality are directly derived from real
   fields. Groundedness & Hallucination Risk are heuristic
   proxies (clearly labelled "estimated") built from confidence
   and sufficiency, since the backend doesn't emit those metrics
   directly.
   ============================================================ */
function ConfidenceGauges({ selectedQuery, lastEval, overallAvgScore }) {
  const confidence = Math.round((lastEval?.confidence_score || 0) * 100);
  const retrievalQuality = overallAvgScore !== null ? Math.round(overallAvgScore * 100) : 0;
  const groundedness = selectedQuery.final_action === 'answer'
    ? Math.round(((lastEval?.confidence_score || 0.5) * 0.7 + 0.3) * 100)
    : Math.round((lastEval?.confidence_score || 0) * 60);
  const hallucinationRisk = 100 - confidence;

  return (
    <div style={styles.gaugesGrid}>
      <Gauge label="Confidence" value={confidence} />
      <Gauge label="Retrieval Quality" value={retrievalQuality} sub="avg. chunk similarity" />
      <Gauge label="Groundedness" value={groundedness} sub="estimated" />
      <Gauge label="Hallucination Risk" value={hallucinationRisk} invert sub="estimated" />
    </div>
  );
}

function Gauge({ label, value, invert = false, sub }) {
  const tone = invert ? scoreTone(100 - value) : scoreTone(value);
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c;

  return (
    <div className="ceval-card ceval-fade" style={styles.gaugeCard}>
      <svg viewBox="0 0 80 80" width="84" height="84">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#F1F5F9" strokeWidth="8" />
        <circle
          cx="40" cy="40" r={r} fill="none" stroke={tone.color} strokeWidth="8"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 40 40)"
          className="ceval-gauge-arc"
        />
        <text x="40" y="45" textAnchor="middle" fontSize="16" fontWeight="800" fill="#111827" fontFamily="Inter, sans-serif">
          {value}%
        </text>
      </svg>
      <div style={styles.gaugeLabel}>{label}</div>
      {sub && <div style={styles.gaugeSub}>{sub}</div>}
    </div>
  );
}

/* ============================================================
   Developer Insights (Developer Mode only)
   ============================================================ */
function DeveloperInsights({ selectedQuery }) {
  const rows = [
    { label: 'Execution Time', value: `${selectedQuery.latency_ms} ms` },
    { label: 'Estimated Tokens', value: selectedQuery.tokens_used },
    { label: 'LLM Model', value: selectedQuery.model_used },
    { label: 'Embedding Model', value: selectedQuery.embedding_model || null },
    { label: 'Prompt Used', value: selectedQuery.prompt || null },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <DevSection title="Execution Metadata" defaultOpen>
        <div style={styles.devMetaGrid}>
          {rows.map((r) => (
            <div key={r.label} style={styles.devMetaRow}>
              <span style={styles.devMetaLabel}>{r.label}</span>
              <span style={styles.devMetaValue}>{r.value !== null && r.value !== undefined ? r.value : 'Not available in trace data'}</span>
            </div>
          ))}
        </div>
      </DevSection>

      <DevSection title="Retrieved Chunk Metadata">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {selectedQuery.retrieval_attempts.flatMap((att, ai) =>
            att.chunks.map((c, ci) => (
              <div key={`${ai}-${ci}`} style={styles.chunkMetaRow}>
                <span className="ceval-chip ceval-chip-neutral">Attempt {att.attempt || ai + 1}</span>
                <span style={styles.chunkMetaText}>{c.source} • Page {c.page} • Sim {c.score}</span>
              </div>
            ))
          )}
        </div>
      </DevSection>

      <DevSection title="JSON Trace">
        <pre className="ceval-json-pre">{JSON.stringify(selectedQuery, null, 2)}</pre>
      </DevSection>
    </div>
  );
}

function DevSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="ceval-card" style={{ overflow: 'hidden' }}>
      <button className="ceval-dev-header" onClick={() => setOpen(o => !o)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon.Code style={{ width: 14, height: 14, color: '#6366F1' }} />
          {title}
        </span>
        <Icon.ChevronDown style={{ width: 15, height: 15, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
      </button>
      {open && <div style={{ padding: '0 16px 16px' }}>{children}</div>}
    </div>
  );
}

/* ============================================================
   Explainability panel (static, educational — not per-query)
   ============================================================ */
function ExplainabilityPanel() {
  const items = [
    { icon: Icon.Cpu, title: 'Embedding', desc: 'Converts the user query into a numeric vector that captures its meaning.', color: '#2563EB' },
    { icon: Icon.Search, title: 'Retriever', desc: 'Searches ChromaDB for the passages whose vectors are closest to the query.', color: '#0EA5E9' },
    { icon: Icon.Brain, title: 'Critic', desc: 'Checks whether the retrieved information is actually enough to answer confidently.', color: '#F59E0B' },
    { icon: Icon.RefreshCw, title: 'Reformulation', desc: 'If the context falls short, rewrites the search query to close the gap.', color: '#6366F1' },
    { icon: Icon.Sparkle, title: 'Generator', desc: 'Produces the final, grounded answer using only verified retrieved context.', color: '#10B981' },
  ];
  return (
    <div style={styles.explainGrid}>
      {items.map((it) => (
        <div key={it.title} className="ceval-card ceval-fade" style={styles.explainCard}>
          <div style={{ ...styles.explainIconWrap, backgroundColor: `${it.color}1F`, color: it.color }}>
            <it.icon style={{ width: 18, height: 18 }} />
          </div>
          <div style={styles.explainTitle}>{it.title}</div>
          <div style={styles.explainDesc}>{it.desc}</div>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ children, style }) {
  return <h3 style={{ ...styles.sectionHeading, ...style }}>{children}</h3>;
}

/* Scoped styles */
function CevalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

      .ceval-root { font-family: 'Inter', sans-serif; }

      @keyframes cevalFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .ceval-fade { animation: cevalFadeUp 0.4s ease; }

      @keyframes cevalSpin { to { transform: rotate(360deg); } }
      @keyframes cevalPulseDot {
        0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
        70% { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
      }
      .ceval-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #10B981; animation: cevalPulseDot 2s infinite; }

      @keyframes cevalBarGrow { from { width: 0; } }
      .ceval-conf-bar-fill { height: 100%; border-radius: 5px; animation: cevalBarGrow 0.8s cubic-bezier(0.16,1,0.3,1); }

      @keyframes cevalArcDraw { from { stroke-dashoffset: 214; } }
      .ceval-gauge-arc { transition: stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1); }

      .ceval-card {
        background: #FFFFFF;
        border: 1px solid #E5E7EB;
        border-radius: 20px;
        box-shadow: 0 1px 3px rgba(17,24,39,0.06), 0 1px 2px rgba(17,24,39,0.04);
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      }
      .ceval-metric-card:hover, .ceval-node-card:hover, .ceval-reform-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 26px rgba(17,24,39,0.08);
        border-color: #D1D5DB;
      }

      .ceval-glass-card {
        background: rgba(255,255,255,0.7);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid rgba(255,255,255,0.7);
        border-radius: 20px;
        box-shadow: 0 8px 24px rgba(17,24,39,0.07);
      }

      .ceval-badge {
        display: inline-flex; align-items: center; gap: 6px;
        font-size: 0.74rem; font-weight: 600; padding: 6px 12px;
        border-radius: 999px; border: 1px solid transparent; white-space: nowrap;
      }
      .ceval-badge-blue   { color: #1D4ED8; background: #EEF4FF; border-color: #DBEAFE; }
      .ceval-badge-indigo { color: #4338CA; background: #EEF2FF; border-color: #E0E7FF; }
      .ceval-badge-green  { color: #047857; background: #ECFDF5; border-color: #A7F3D0; }
      .ceval-badge-live   { color: #374151; background: #F3F4F6; border-color: #E5E7EB; }

      .ceval-chip {
        display: inline-flex; align-items: center; gap: 4px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.65rem; font-weight: 600; padding: 3px 8px; border-radius: 999px;
      }
      .ceval-chip-neutral { color: #374151; background: #F3F4F6; }
      .ceval-chip-success { color: #047857; background: #ECFDF5; }
      .ceval-chip-warning { color: #B45309; background: #FFFBEB; }
      .ceval-chip-danger  { color: #B91C1C; background: #FEF2F2; }

      .ceval-btn { font-family:'Inter',sans-serif; font-weight:600; font-size:0.82rem; border-radius:999px; padding:9px 18px; cursor:pointer; transition: transform 0.2s ease, background-color 0.2s ease; border: 1px solid transparent; }
      .ceval-btn-danger-outline { color: #EF4444; background: #fff; border-color: #FECACA; }
      .ceval-btn-danger-outline:hover { background: #FEF2F2; transform: translateY(-1px); }

      .ceval-log-item {
        padding: 14px 18px;
        border-bottom: 1px solid #F1F5F9;
        cursor: pointer;
        transition: background-color 0.15s ease;
      }
      .ceval-log-item:hover { background: #F9FAFB; }
      .ceval-log-item-selected { background: #EEF4FF; border-left: 3px solid #2563EB; }

      .ceval-dev-header {
        width: 100%; display: flex; align-items: center; justify-content: space-between;
        background: transparent; border: none; cursor: pointer; padding: 14px 16px;
        font-family: 'Inter', sans-serif; font-weight: 700; font-size: 0.82rem; color: #111827;
      }
      .ceval-json-pre {
        background: #0F172A;
        color: #A5F3FC;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        line-height: 1.6;
        padding: 14px;
        border-radius: 12px;
        overflow: auto;
        max-height: 340px;
      }
    `}</style>
  );
}

const styles = {
  hero: { padding: '32px 36px', marginBottom: '20px', background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFF 100%)' },
  heroRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '18px' },
  heroTitle: { fontSize: '1.6rem', fontWeight: 800, color: '#111827', margin: '0 0 8px', letterSpacing: '-0.01em' },
  heroSubtitle: { fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6, maxWidth: '560px', margin: 0 },
  heroBadges: { display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' },
  badgeIcon: { width: 12, height: 12 },

  alertError: {
    backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444',
    padding: '13px 18px', borderRadius: '14px', marginBottom: '18px', fontSize: '0.85rem',
    display: 'flex', alignItems: 'center', gap: '10px',
  },

  centerLoading: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px', gap: '14px' },
  spinner: { width: '28px', height: '28px', border: '3px solid #E5E7EB', borderTopColor: '#2563EB', borderRadius: '50%', animation: 'cevalSpin 0.9s linear infinite' },

  emptyCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '56px 24px', textAlign: 'center' },
  emptyIconWrap: { width: '64px', height: '64px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' },
  emptyTitle: { fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '0 0 6px' },
  emptyDesc: { fontSize: '0.85rem', color: '#6B7280', maxWidth: '380px', margin: 0 },

  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' },

  sectionHeading: {
    fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
    color: '#6B7280', margin: '0 0 14px',
  },

  contentLayout: { display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: '20px', alignItems: 'start' },
  listPanel: { padding: 0, overflow: 'hidden', maxHeight: '640px', display: 'flex', flexDirection: 'column' },
  listScroll: { overflowY: 'auto' },
  logQueryText: { fontSize: '0.85rem', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  logMetaRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' },
  logDate: { fontSize: '0.68rem', color: '#9CA3AF' },

  rightCol: {},

  flowCard: { padding: '26px' },
  flowNodeRow: { display: 'flex', gap: '14px', alignItems: 'flex-start' },
  nodeIconBg: {
    width: '32px', height: '32px', borderRadius: '10px', border: '1px solid',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px',
  },
  nodeCard: { flexGrow: 1, backgroundColor: '#FAFAFA', borderRadius: '14px', padding: '16px' },
  nodeHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  nodeLabel: { fontSize: '0.76rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.02em' },
  nodeText: { fontSize: '0.86rem', color: '#111827', lineHeight: 1.5 },
  connectorWrap: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '15px', padding: '2px 0' },
  connectorLine: { width: '2px', height: '20px', backgroundColor: '#E5E7EB' },
  connectorLabel: { fontSize: '0.65rem', color: '#9CA3AF', marginLeft: '10px', fontStyle: 'italic' },

  chunkPreviewList: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' },
  miniChunk: { padding: '10px', backgroundColor: '#FFFFFF', border: '1px solid #F1F5F9', borderRadius: '10px' },
  miniChunkTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
  miniChunkSource: { fontSize: '0.68rem', fontWeight: 600, color: '#6B7280' },
  miniChunkText: { fontSize: '0.78rem', color: '#374151', lineHeight: 1.5 },
  evalText: { fontSize: '0.82rem', color: '#27272A', lineHeight: 1.5, marginTop: '4px' },
  citationBox: { borderTop: '1px solid #F1F5F9', paddingTop: '12px', marginTop: '12px' },
  citationLabel: { fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', marginBottom: '6px' },
  citationList: { display: 'flex', flexWrap: 'wrap', gap: '6px' },

  criticGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' },
  criticCard: { padding: '20px' },
  criticTopRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' },
  criticLabel: { fontSize: '0.85rem', fontWeight: 700, color: '#111827' },
  criticConfRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' },
  criticConfLabel: { fontSize: '0.76rem', color: '#6B7280', fontWeight: 600 },
  criticConfValue: { fontSize: '0.9rem', fontWeight: 800 },
  confBarBg: { width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '5px', overflow: 'hidden' },

  attemptsGrid: { display: 'grid', gap: '14px' },
  attemptCard: { padding: '20px' },
  attemptHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  attemptTitle: { fontSize: '0.9rem', fontWeight: 700, color: '#111827' },
  attemptQuery: { fontSize: '0.78rem', color: '#6B7280', fontStyle: 'italic', marginBottom: '14px' },
  attemptStatsRow: { display: 'flex', gap: '20px', marginBottom: '14px' },
  miniStat: {},
  miniStatValue: { fontSize: '1.1rem', fontWeight: 800, color: '#111827' },
  miniStatLabel: { fontSize: '0.66rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' },
  attemptSourcesLabel: { fontSize: '0.7rem', fontWeight: 700, color: '#6B7280', marginBottom: '6px' },

  reformCard: { padding: '28px' },
  reformTitleRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  reformTitle: { fontSize: '1.05rem', fontWeight: 800, color: '#111827' },
  reformFlow: { maxWidth: '520px', margin: '0 auto' },
  reformStep: {},
  reformStepLabel: { fontSize: '0.7rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '6px' },
  reformStepBox: { padding: '12px 16px', borderRadius: '12px', background: '#F9FAFB', border: '1px solid #E5E7EB', fontSize: '0.86rem', color: '#111827' },

  metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' },
  metricCard: { padding: '20px' },
  metricIconWrap: { width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' },
  metricValue: { fontSize: '1.4rem', fontWeight: 800, color: '#111827' },
  metricLabel: { fontSize: '0.76rem', color: '#6B7280', fontWeight: 500, marginBottom: '12px' },
  metricBarBg: { width: '100%', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' },
  metricBarFill: { height: '100%', borderRadius: '4px', transition: 'width 0.6s ease' },

  timelineCard: { padding: '10px 22px' },
  timelineRow: { display: 'flex', gap: '14px' },
  timelineRail: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  timelineDot: { width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, margin: '10px 0' },
  timelineLine: { width: '2px', flex: 1, backgroundColor: '#E5E7EB' },
  timelineLabel: { fontSize: '0.85rem', fontWeight: 600, color: '#111827', padding: '10px 0' },

  gaugesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' },
  gaugeCard: { padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  gaugeLabel: { fontSize: '0.82rem', fontWeight: 700, color: '#111827', marginTop: '10px' },
  gaugeSub: { fontSize: '0.68rem', color: '#9CA3AF', marginTop: '2px' },

  devMetaGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  devMetaRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' },
  devMetaLabel: { color: '#6B7280', fontWeight: 500 },
  devMetaValue: { color: '#111827', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.76rem' },
  chunkMetaRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  chunkMetaText: { fontSize: '0.78rem', color: '#374151' },

  explainGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' },
  explainCard: { padding: '20px' },
  explainIconWrap: { width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' },
  explainTitle: { fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '6px' },
  explainDesc: { fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.55 },
};
