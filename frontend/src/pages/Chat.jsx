import { API_BASE } from "../api";
import React, { useState, useEffect, useRef } from 'react';

/* ============================================================
   Tiny inline icon set (no external icon library, SVG only —
   kept consistent with the Dashboard.jsx redesign)
   ============================================================ */
const Icon = {
  MessageSquare: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Send: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Paperclip: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21.44 11.05 12.25 20.24a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a1.5 1.5 0 0 1-2.12-2.12l8.49-8.48" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  ChevronDown: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  ),
  Bolt: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
  RefreshCw: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Layers: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
};

/* ============================================================
   Tiny markdown-lite renderer for assistant messages.
   Handles **bold**, *italic*, `inline code`, and "- " lists,
   without adding a markdown dependency or using
   dangerouslySetInnerHTML.
   ============================================================ */
function renderInline(text, keyPrefix) {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);
  return tokens.map((tok, i) => {
    const key = `${keyPrefix}-${i}`;
    if (tok.startsWith('**') && tok.endsWith('**')) {
      return <strong key={key}>{tok.slice(2, -2)}</strong>;
    }
    if (tok.startsWith('`') && tok.endsWith('`')) {
      return <code key={key} className="cchat-inline-code">{tok.slice(1, -1)}</code>;
    }
    if (tok.startsWith('*') && tok.endsWith('*')) {
      return <em key={key}>{tok.slice(1, -1)}</em>;
    }
    return <span key={key}>{tok}</span>;
  });
}

function MarkdownLite({ text }) {
  const lines = (text || '').split('\n');
  const blocks = [];
  let listBuffer = [];

  const flushList = (key) => {
    if (listBuffer.length) {
      blocks.push(
        <ul key={`ul-${key}`} className="cchat-md-list">
          {listBuffer.map((item, i) => <li key={i}>{renderInline(item, `li-${key}-${i}`)}</li>)}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listBuffer.push(trimmed.slice(2));
    } else {
      flushList(idx);
      if (trimmed.length === 0) {
        blocks.push(<div key={`sp-${idx}`} style={{ height: '6px' }} />);
      } else {
        blocks.push(<p key={`p-${idx}`} className="cchat-md-p">{renderInline(trimmed, `p-${idx}`)}</p>);
      }
    }
  });
  flushList('end');

  return <div className="cchat-markdown">{blocks}</div>;
}

const SUGGESTIONS = [
  'Who is Lionel Messi?',
  'Summarize this document',
  'List important achievements',
  'Explain this section simply',
];

export default function Chat({ devMode }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [latestTrace, setLatestTrace] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function runQuery(queryText) {
    if (!queryText.trim() || loading) return;

    const userQuery = queryText.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userQuery }]);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: userQuery, k: 4 })
      });

      if (!response.ok) {
        throw new Error('Server responded with an error.');
      }

      const traceData = await response.json();
      setLatestTrace(traceData);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: traceData.response,
        trace: traceData
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error: Failed to communicate with RAG engine. Make sure the backend server is operational and your API key is correct.'
      }]);
    } finally {
      setLoading(false);
    }
  }

  const handleSend = async (e) => {
    e.preventDefault();
    await runQuery(input);
  };

  const handleSuggestionClick = (text) => {
    runQuery(text);
  };

  return (
    <div className="page-container cchat-root" style={styles.pageLayout}>
      <CchatStyle />

      {/* ================= HEADER ================= */}
      <div style={styles.chatHeader}>
        <div>
          <h2 style={styles.pageTitle}>🧠 Chat Playground</h2>
          <p style={styles.pageSubtitle}>
            Interact with your Self-Correcting RAG system and inspect how the Critic Loop improves retrieval quality.
          </p>
        </div>
        <div style={styles.headerBadges}>
          <span className="cchat-badge cchat-badge-blue"><Icon.Sparkle style={styles.badgeIcon} /> Gemini AI</span>
          <span className="cchat-badge cchat-badge-indigo"><Icon.Layers style={styles.badgeIcon} /> ChromaDB</span>
          <span className="cchat-badge cchat-badge-amber"><Icon.Brain style={styles.badgeIcon} /> Self-Correcting</span>
          <span className="cchat-badge cchat-badge-green"><span className="cchat-live-dot" /> Live</span>
        </div>
      </div>

      <div style={styles.chatArea}>
        {/* Chat Messages Panel */}
        <div className="cchat-card" style={styles.chatWindow}>
          <div style={styles.messageList}>
            {messages.length === 0 ? (
              <div style={styles.emptyChat}>
                <div style={styles.emptyIconRing}>
                  <div style={styles.emptyIconCore}>
                    <Icon.MessageSquare style={{ width: 26, height: 26, color: '#2563EB' }} />
                  </div>
                </div>
                <h3 style={styles.emptyTitle}>Start chatting with your uploaded documents.</h3>
                <p style={styles.emptyDesc}>
                  The system automatically retrieves, evaluates and self-corrects before answering.
                </p>
                <button
                  className="cchat-btn cchat-btn-primary"
                  style={{ marginTop: '18px' }}
                  onClick={() => inputRef.current?.focus()}
                >
                  Ask your first question
                </button>

                <div style={styles.suggestionsGrid}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className="cchat-suggestion-card"
                      onClick={() => handleSuggestionClick(s)}
                    >
                      <Icon.Search style={{ width: 14, height: 14, color: '#6366F1', flexShrink: 0 }} />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className="cchat-fade-in">
                  <div
                    style={{
                      ...styles.messageRow,
                      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      className={msg.role === 'user' ? 'cchat-bubble-user' : 'cchat-bubble-assistant'}
                      style={styles.messageBubble}
                    >
                      <div style={styles.bubbleHeader}>
                        <span style={styles.bubbleAuthor}>{msg.role === 'user' ? 'You' : 'Assistant'}</span>
                        {msg.trace && (
                          <span style={styles.bubbleTime}>
                            {msg.trace.latency_ms}ms • {msg.trace.final_action === 'answer' ? 'Answered' : 'Clarified'}
                          </span>
                        )}
                      </div>
                      {msg.role === 'assistant' ? (
                        <MarkdownLite text={msg.content} />
                      ) : (
                        <div style={styles.bubbleContent}>{msg.content}</div>
                      )}
                    </div>
                  </div>

                  {/* Per-message developer trace, shown only when Developer Mode is on */}
                  {devMode && msg.role === 'assistant' && msg.trace && (
                    <DevTracePanel trace={msg.trace} />
                  )}
                </div>
              ))
            )}
            {loading && (
              <div style={styles.messageRow}>
                <div className="cchat-bubble-assistant cchat-thinking" style={styles.messageBubble}>
                  <div style={styles.bubbleHeader}>
                    <span style={styles.bubbleAuthor}>Assistant</span>
                  </div>
                  <div style={styles.thinkingRow}>
                    <span className="cchat-shimmer-text">Thinking…</span>
                    <span style={styles.loadingDots}>
                      <span className="cchat-dot" style={{ animationDelay: '0ms' }} />
                      <span className="cchat-dot" style={{ animationDelay: '150ms' }} />
                      <span className="cchat-dot" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={styles.inputForm}>
            <div className="cchat-input-shell">
              <button
                type="button"
                className="cchat-attach-btn"
                title="Attach a file (manage documents from the Documents page)"
                disabled
              >
                <Icon.Paperclip style={{ width: 16, height: 16 }} />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your uploaded documents..."
                disabled={loading}
                className="cchat-text-input"
              />
              <button
                type="submit"
                className="cchat-send-btn"
                disabled={loading || !input.trim()}
                title="Send"
              >
                <Icon.Send style={{ width: 15, height: 15 }} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Developer trace panel — collapsible, colour-coded sections,
   driven entirely by the existing trace object shape.
   No API/data shape changes.
   ============================================================ */
function DevTracePanel({ trace }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="cchat-card cchat-dev-panel">
      <button className="cchat-dev-header" onClick={() => setOpen(o => !o)}>
        <span style={styles.devHeaderLeft}>
          <Icon.Bolt style={{ width: 14, height: 14, color: '#6366F1' }} />
          Developer Trace
        </span>
        <span style={styles.devHeaderRight}>
          <span className="cchat-chip">{trace.latency_ms} ms</span>
          <span className="cchat-chip">{trace.tokens_used} tokens</span>
          <Icon.ChevronDown style={{ width: 15, height: 15, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
        </span>
      </button>

      {open && (
        <div style={styles.devBody}>
          <div style={styles.devMetaRow}>
            <MetaStat label="Latency" value={`${trace.latency_ms} ms`} icon={Icon.Clock} />
            <MetaStat label="Tokens Used" value={trace.tokens_used} icon={Icon.Bolt} />
            <MetaStat label="Attempts" value={trace.retrieval_attempts.length} icon={Icon.RefreshCw} />
          </div>
          <div style={styles.devModelRow}>Model: <strong style={{ color: '#111827' }}>{trace.model_used}</strong></div>

          {trace.retrieval_attempts.map((attempt, index) => {
            const evalResult = trace.critic_evaluations[index];
            return (
              <ExpandableSection
                key={index}
                defaultOpen={index === trace.retrieval_attempts.length - 1}
                title={`Retrieval Attempt ${attempt.attempt}`}
                tone={evalResult ? (evalResult.is_sufficient ? 'success' : 'warning') : 'neutral'}
              >
                <div style={styles.queryUsed}>Query: "{attempt.query_used}"</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '10px 0' }}>
                  {attempt.chunks.map((chunk, cIdx) => (
                    <div key={cIdx} style={styles.chunkItem}>
                      <div style={styles.chunkMetaRow}>
                        <span style={styles.chunkMeta}>{chunk.source} • Page {chunk.page}</span>
                        <span className="cchat-chip">Sim: {chunk.score}</span>
                      </div>
                      <div style={styles.chunkText}>{chunk.text}</div>
                    </div>
                  ))}
                </div>

                {evalResult && (
                  <div
                    style={{
                      ...styles.evalBox,
                      borderLeftColor: evalResult.is_sufficient ? '#10B981' : '#F59E0B',
                      backgroundColor: evalResult.is_sufficient ? '#ECFDF5' : '#FFFBEB',
                    }}
                  >
                    <div style={styles.evalHeaderRow}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: evalResult.is_sufficient ? '#059669' : '#B45309' }}>
                        Critic Evaluation
                      </span>
                      <span className="cchat-chip">Conf: {Math.round(evalResult.confidence_score * 100)}%</span>
                    </div>
                    <div style={styles.evalReason}><strong>Reasoning:</strong> {evalResult.reasoning}</div>
                    {!evalResult.is_sufficient && (
                      <div style={{ ...styles.evalReason, marginTop: '4px', color: '#B45309' }}>
                        <strong>Missing Info:</strong> {evalResult.missing_information}
                      </div>
                    )}
                  </div>
                )}
              </ExpandableSection>
            );
          })}

          {trace.reformulated_query && (
            <ExpandableSection title="Query Reformulation" tone="info" defaultOpen>
              <div style={styles.reformText}>
                Expanded Query: <strong>"{trace.reformulated_query}"</strong>
              </div>
            </ExpandableSection>
          )}

          <ExpandableSection title="Final Decision" tone={trace.final_action === 'answer' ? 'success' : 'warning'} defaultOpen>
            <div style={styles.reformText}>
              Action: <strong style={{ textTransform: 'capitalize' }}>{trace.final_action}</strong>
            </div>
          </ExpandableSection>
        </div>
      )}
    </div>
  );
}

function MetaStat({ label, value, icon: IconComp }) {
  return (
    <div style={styles.metaStat}>
      <IconComp style={{ width: 13, height: 13, color: '#6B7280' }} />
      <div>
        <div style={styles.metaLabel}>{label}</div>
        <div style={styles.metaValue}>{value}</div>
      </div>
    </div>
  );
}

function ExpandableSection({ title, tone = 'neutral', defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const dotColor = { success: '#10B981', warning: '#F59E0B', info: '#2563EB', neutral: '#9CA3AF' }[tone];

  return (
    <div style={styles.section}>
      <button className="cchat-section-header" onClick={() => setOpen(o => !o)} style={styles.sectionHeader}>
        <span style={styles.sectionHeaderLeft}>
          <span style={{ ...styles.sectionDot, backgroundColor: dotColor }} />
          {title}
        </span>
        <Icon.ChevronDown style={{ width: 14, height: 14, color: '#9CA3AF', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
      </button>
      {open && <div style={styles.sectionBody}>{children}</div>}
    </div>
  );
}

/* Scoped styles: hover states, keyframes, bubble gradients —
   kept local to this file, matching the palette and type scale
   used in Dashboard.jsx so both pages feel like one product. */
function CchatStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

      .cchat-root { font-family: 'Inter', sans-serif; background: #F8FAFC; }

      @keyframes cchatFadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .cchat-fade-in { animation: cchatFadeIn 0.35s ease; }

      @keyframes cchatDotBounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
        30% { transform: translateY(-4px); opacity: 1; }
      }
      .cchat-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: #6366F1; display: inline-block;
        animation: cchatDotBounce 1.2s infinite ease-in-out;
      }

      @keyframes cchatShimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .cchat-shimmer-text {
        font-size: 0.85rem;
        font-weight: 600;
        background: linear-gradient(90deg, #9CA3AF 25%, #2563EB 50%, #9CA3AF 75%);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: cchatShimmer 1.8s linear infinite;
      }

      @keyframes cchatPulseDot {
        0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
        70% { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
      }
      .cchat-live-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: #10B981;
        animation: cchatPulseDot 2s infinite;
      }

      .cchat-card {
        background: #FFFFFF;
        border: 1px solid #E5E7EB;
        border-radius: 20px;
        box-shadow: 0 1px 3px rgba(17,24,39,0.06), 0 1px 2px rgba(17,24,39,0.04);
      }

      .cchat-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.72rem;
        font-weight: 600;
        padding: 6px 12px;
        border-radius: 999px;
        border: 1px solid transparent;
      }
      .cchat-badge-blue   { color: #1D4ED8; background: #EEF4FF; border-color: #DBEAFE; }
      .cchat-badge-indigo { color: #4338CA; background: #EEF2FF; border-color: #E0E7FF; }
      .cchat-badge-amber  { color: #B45309; background: #FFFBEB; border-color: #FDE68A; }
      .cchat-badge-green  { color: #047857; background: #ECFDF5; border-color: #A7F3D0; }

      .cchat-bubble-user {
        background: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%);
        color: #fff;
        border-radius: 20px 20px 4px 20px;
        box-shadow: 0 6px 16px rgba(37,99,235,0.25);
      }
      .cchat-bubble-assistant {
        background: #FFFFFF;
        color: #111827;
        border: 1px solid #E5E7EB;
        border-radius: 20px 20px 20px 4px;
        box-shadow: 0 1px 3px rgba(17,24,39,0.05);
      }
      .cchat-thinking { display: inline-block; }

      .cchat-inline-code {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.82em;
        background: rgba(37,99,235,0.08);
        color: #1D4ED8;
        padding: 1px 6px;
        border-radius: 5px;
      }
      .cchat-md-p { margin: 0 0 6px; line-height: 1.6; }
      .cchat-md-p:last-child { margin-bottom: 0; }
      .cchat-md-list { margin: 4px 0 8px; padding-left: 20px; line-height: 1.6; }

      .cchat-suggestion-card {
        display: flex;
        align-items: center;
        gap: 8px;
        text-align: left;
        font-family: 'Inter', sans-serif;
        font-size: 0.82rem;
        font-weight: 500;
        color: #374151;
        background: #F9FAFB;
        border: 1px solid #E5E7EB;
        border-radius: 14px;
        padding: 12px 14px;
        cursor: pointer;
        transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
      }
      .cchat-suggestion-card:hover {
        transform: translateY(-2px);
        border-color: #C7D2FE;
        background: #FFFFFF;
        box-shadow: 0 8px 18px rgba(17,24,39,0.06);
      }

      .cchat-btn {
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 0.85rem;
        border: none;
        border-radius: 999px;
        padding: 11px 22px;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
      }
      .cchat-btn-primary {
        color: #fff;
        background: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%);
        box-shadow: 0 8px 20px rgba(37,99,235,0.28);
      }
      .cchat-btn-primary:hover { transform: translateY(-2px) scale(1.02); filter: brightness(1.05); }
      .cchat-btn-primary:active { transform: scale(0.98); }

      .cchat-input-shell {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        background: #F9FAFB;
        border: 1px solid #E5E7EB;
        border-radius: 24px;
        padding: 6px 6px 6px 14px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .cchat-input-shell:focus-within {
        border-color: #93C5FD;
        box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        background: #fff;
      }
      .cchat-text-input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font-size: 0.9rem;
        font-family: 'Inter', sans-serif;
        padding: 10px 0;
        color: #111827;
      }
      .cchat-text-input::placeholder { color: #9CA3AF; }
      .cchat-attach-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background: transparent;
        color: #9CA3AF;
        cursor: not-allowed;
        flex-shrink: 0;
      }
      .cchat-send-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: none;
        color: #fff;
        background: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%);
        cursor: pointer;
        flex-shrink: 0;
        transition: transform 0.15s ease, filter 0.2s ease, opacity 0.2s ease;
        box-shadow: 0 4px 12px rgba(37,99,235,0.3);
      }
      .cchat-send-btn:hover:not(:disabled) { transform: scale(1.07); filter: brightness(1.05); }
      .cchat-send-btn:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }

      .cchat-dev-panel { margin-top: 8px; overflow: hidden; }
      .cchat-dev-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 14px 16px;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 0.82rem;
        color: #111827;
      }
      .cchat-chip {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.68rem;
        font-weight: 600;
        color: #374151;
        background: #F3F4F6;
        border: 1px solid #E5E7EB;
        padding: 3px 8px;
        border-radius: 999px;
      }

      .cchat-section-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #F9FAFB;
        border: 1px solid #F1F5F9;
        border-radius: 12px;
        padding: 10px 12px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
        color: #111827;
        transition: background-color 0.2s ease, border-color 0.2s ease;
      }
      .cchat-section-header:hover { background: #F3F4F6; border-color: #E5E7EB; }
    `}</style>
  );
}

const styles = {
  pageLayout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '24px 28px',
    maxWidth: '100%',
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '14px',
    marginBottom: '20px',
  },
  pageTitle: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#111827',
    margin: '0 0 4px',
    letterSpacing: '-0.01em',
  },
  pageSubtitle: {
    fontSize: '0.88rem',
    color: '#6B7280',
    margin: 0,
    maxWidth: '520px',
    lineHeight: 1.5,
  },
  headerBadges: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  badgeIcon: { width: 12, height: 12 },

  chatArea: {
    display: 'flex',
    gap: '20px',
    flexGrow: 1,
    height: 'calc(100vh - 160px)',
    overflow: 'hidden',
  },
  chatWindow: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  messageList: {
    flexGrow: 1,
    padding: '24px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  emptyChat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    padding: '20px',
  },
  emptyIconRing: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #EEF4FF, #EEF2FF)',
    border: '1px solid #DBEAFE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '18px',
  },
  emptyIconCore: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(37,99,235,0.15)',
  },
  emptyTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '6px',
    maxWidth: '380px',
  },
  emptyDesc: {
    fontSize: '0.85rem',
    color: '#6B7280',
    maxWidth: '380px',
    lineHeight: 1.55,
    margin: 0,
  },
  suggestionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(180px, 240px))',
    gap: '10px',
    marginTop: '28px',
  },

  messageRow: {
    display: 'flex',
    width: '100%',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: '14px 18px',
    fontSize: '0.9rem',
  },
  bubbleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
  },
  bubbleAuthor: {
    fontSize: '0.72rem',
    fontWeight: 700,
    opacity: 0.85,
  },
  bubbleTime: {
    fontSize: '0.68rem',
    opacity: 0.65,
  },
  bubbleContent: {
    lineHeight: '1.55',
    whiteSpace: 'pre-wrap',
  },
  thinkingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '4px 0',
  },
  loadingDots: { display: 'flex', gap: '4px' },

  inputForm: {
    padding: '16px 20px 20px',
  },

  /* Dev trace panel */
  devHeaderLeft: { display: 'flex', alignItems: 'center', gap: '8px' },
  devHeaderRight: { display: 'flex', alignItems: 'center', gap: '8px' },
  devBody: { padding: '0 16px 16px' },
  devMetaRow: {
    display: 'flex',
    gap: '18px',
    padding: '10px 0 14px',
    borderBottom: '1px solid #F1F5F9',
    marginBottom: '12px',
  },
  devModelRow: {
    fontSize: '0.76rem',
    color: '#6B7280',
    marginBottom: '14px',
  },
  metaStat: { display: 'flex', alignItems: 'center', gap: '6px' },
  metaLabel: { fontSize: '0.62rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.03em' },
  metaValue: { fontSize: '0.82rem', fontWeight: 700, color: '#111827' },

  section: { marginBottom: '10px' },
  sectionHeader: {},
  sectionHeaderLeft: { display: 'flex', alignItems: 'center', gap: '8px' },
  sectionDot: { width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0 },
  sectionBody: { padding: '12px 4px 4px' },

  queryUsed: {
    fontSize: '0.78rem',
    color: '#6B7280',
    fontStyle: 'italic',
  },
  chunkItem: {
    padding: '10px',
    border: '1px solid #F1F5F9',
    borderRadius: '10px',
    backgroundColor: '#FAFAFA',
  },
  chunkMetaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px',
  },
  chunkMeta: {
    fontSize: '0.68rem',
    fontWeight: 600,
    color: '#52525B',
  },
  chunkText: {
    fontSize: '0.78rem',
    color: '#27272A',
    lineHeight: '1.5',
    maxHeight: '60px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  evalBox: {
    borderLeft: '3px solid transparent',
    padding: '12px',
    borderRadius: '8px',
    marginTop: '10px',
  },
  evalHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  evalReason: {
    fontSize: '0.78rem',
    color: '#27272A',
    lineHeight: '1.5',
    marginTop: '6px',
  },
  reformText: {
    fontSize: '0.82rem',
    color: '#374151',
  },
};
