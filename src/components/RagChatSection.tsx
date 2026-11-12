import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Settings,
  ShieldCheck,
  RefreshCw,
  Cpu,
  Layers,
  Terminal,
  ExternalLink,
  CheckCircle2,
  Trash2,
  Cloud,
} from 'lucide-react';
import {
  queryResumeRAG,
  RAGResult,
  getStoredLLMSettings,
  saveStoredLLMSettings,
  LLMSettings,
  LLMProvider,
} from '../services/ragService';
import { RESUME_KNOWLEDGE_CHUNKS } from '../data/resumeKnowledge';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  thinking?: string;
  model?: string;
  timestamp: string;
}

const SAMPLE_QUESTIONS = [
  'List all of Sheetal’s key quantifiable achievements & metrics.',
  'How did she reduce reporting cycle time by 55% at TSQUARE?',
  'Explain her Azure Databricks & ADF Sales Optimization project.',
  'What are her technical skills in SQL, Python, and Power BI?',
  'What degrees and certifications has she earned?',
];

export const RagChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I am Sheetal Giridhar's **AI Resume Assistant**.\n\nI answer questions **strictly and exclusively** from Sheetal's verified resume and achievements. I support **Azure OpenAI API**, **NVIDIA Nemotron**, and instant zero-hallucination grounding.",
      sources: ['Verified Resume Knowledge Base', 'Achievements Registry'],
      model: 'Azure API & Grounded Engine',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<LLMSettings>(getStoredLLMSettings());
  const [showConfig, setShowConfig] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const updateSetting = (key: keyof LLMSettings, val: any) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    saveStoredLLMSettings({ [key]: val });
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'reset',
        role: 'assistant',
        content: 'Chat cleared. Ask me any question about Sheetal Giridhar’s verified resume or achievements.',
        sources: ['Resume Knowledge Base'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSubmit = async (e?: React.FormEvent, customQuestion?: string) => {
    if (e) e.preventDefault();
    const query = (customQuestion || input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuestion) setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome' && m.id !== 'reset')
        .map((m) => ({ role: m.role, content: m.content }));

      const result: RAGResult = await queryResumeRAG(query, settings, history);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
        thinking: result.thinking,
        model: result.model,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Error: ${err.message || 'Unable to complete request'}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rag-chat" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Cloud className="w-4 h-4 text-blue-500" />
              <span>Azure API & Nemotron Knowledge Assistant</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive Resume Chatbot
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Ask any question regarding Sheetal's background, metrics, projects, and skills. All responses are strictly verified against her official resume.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-colors shadow-2xs"
            >
              <Settings className="w-3.5 h-3.5 text-indigo-500" />
              <span>Configure Azure / API</span>
            </button>
            <button
              onClick={handleClearChat}
              title="Clear chat history"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* API Settings Panel (Azure & NVIDIA) */}
        {showConfig && (
          <div className="mb-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-blue-500" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  LLM Provider Configuration (Azure API / NVIDIA)
                </h4>
              </div>
              <span className="text-xs text-slate-400">Stored safely in your browser</span>
            </div>

            {/* Provider Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => updateSetting('provider', 'azure')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  settings.provider === 'azure'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Azure OpenAI API
              </button>
              <button
                onClick={() => updateSetting('provider', 'nvidia')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  settings.provider === 'nvidia'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                NVIDIA Nemotron
              </button>
              <button
                onClick={() => updateSetting('provider', 'grounded')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  settings.provider === 'grounded'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Instant Grounded Engine
              </button>
            </div>

            {settings.provider === 'azure' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Azure Endpoint URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://your-resource.openai.azure.com"
                    value={settings.azureEndpoint}
                    onChange={(e) => updateSetting('azureEndpoint', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Azure API Key
                  </label>
                  <input
                    type="password"
                    placeholder="Azure OpenAI API Key"
                    value={settings.azureApiKey}
                    onChange={(e) => updateSetting('azureApiKey', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Deployment Name
                  </label>
                  <input
                    type="text"
                    placeholder="gpt-4o"
                    value={settings.azureDeployment}
                    onChange={(e) => updateSetting('azureDeployment', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    API Version
                  </label>
                  <input
                    type="text"
                    placeholder="2024-08-01-preview"
                    value={settings.azureApiVersion}
                    onChange={(e) => updateSetting('azureApiVersion', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {settings.provider === 'nvidia' && (
              <div className="text-xs space-y-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  NVIDIA NGC API Key
                </label>
                <input
                  type="password"
                  placeholder="nvapi-..."
                  value={settings.nvidiaApiKey}
                  onChange={(e) => updateSetting('nvidiaApiKey', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            )}

            {settings.provider === 'grounded' && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instant Grounded Mode works right out of the box without any keys or network calls, answering questions exclusively from Sheetal's verified resume.
              </p>
            )}
          </div>
        )}

        {/* Status Architecture Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-slate-400">Provider</div>
              <div className="font-semibold text-slate-800 dark:text-slate-200 truncate capitalize">
                {settings.provider === 'azure' ? 'Azure OpenAI' : settings.provider === 'nvidia' ? 'NVIDIA Nemotron' : 'Grounded Engine'}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-slate-400">Deployment</div>
              <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">Vercel Ready</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-slate-400">Scope</div>
              <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{RESUME_KNOWLEDGE_CHUNKS.length} Resume Chunks</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-500 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-slate-400">Grounding</div>
              <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">Strict 100% Resume</div>
            </div>
          </div>
        </div>

        {/* Chat Window Container */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden flex flex-col h-[560px]">
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[88%] ${
                  m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-emerald-600 text-white shadow-xs'
                  }`}
                >
                  {m.role === 'user' ? 'You' : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed space-y-2 shadow-2xs ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-200/70 dark:border-slate-700/70 rounded-tl-none'
                  }`}
                >
                  {m.thinking && (
                    <div className="border border-indigo-200 dark:border-indigo-800/70 rounded-lg p-2.5 bg-indigo-50/50 dark:bg-indigo-950/30 text-xs text-slate-700 dark:text-slate-300">
                      <div className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Reasoning Trace</span>
                      </div>
                      <p className="italic text-[11px] leading-relaxed">{m.thinking}</p>
                    </div>
                  )}

                  <div className="whitespace-pre-line font-normal">
                    {m.content}
                  </div>

                  {m.sources && m.sources.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="font-semibold uppercase tracking-wider text-[10px]">Sources:</span>
                      {m.sources.map((src, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 text-[10.5px]"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{src}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-1">
                    <span>{m.timestamp}</span>
                    {m.model && <span className="font-mono">{m.model}</span>}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                  <span>Processing query with strict resume grounding...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex items-center gap-2 no-scrollbar">
            <span className="text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500 shrink-0">
              Suggested:
            </span>
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSubmit(undefined, q)}
                disabled={loading}
                className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Sheetal's achievements, experience, projects, or degree..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
