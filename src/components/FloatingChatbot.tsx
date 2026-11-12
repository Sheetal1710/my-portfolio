import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  ChevronDown,
  Minimize2,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import {
  queryResumeRAG,
  RAGResult,
  getStoredLLMSettings,
  saveStoredLLMSettings,
  LLMSettings,
} from '../services/ragService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
}

const INITIAL_SUGGESTED_QUESTIONS = [
  'What are Sheetal’s primary technical skills?',
  'Explain the 55% reduction in reporting cycle time.',
  'Tell me about her experience at Microline and TSQUARE.',
  'What projects has Sheetal built using Power BI and Azure?',
  'What is Sheetal’s educational background?',
];

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I'm Sheetal's AI Assistant. I can answer any questions about Sheetal Giridhar's verified resume, measurable achievements, technical skills, and professional experience.",
      sources: ['Resume Knowledge Base'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [settings, setSettings] = useState<LLMSettings>(getStoredLLMSettings());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const updateSetting = (key: keyof LLMSettings, val: any) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    saveStoredLLMSettings({ [key]: val });
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }));

      const result: RAGResult = await queryResumeRAG(query, settings, history);

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `Unable to process request: ${err.message || 'Error connecting to service'}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="floating-chat-trigger-btn"
          aria-label="Open Sheetal's AI Assistant"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 focus:outline-hidden"
        >
          {/* Google colors subtle indicator */}
          <div className="flex -space-x-1 items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
          </div>
          <span className="text-sm font-medium tracking-tight pr-1">Ask Sheetal's AI Assistant</span>
          <MessageSquare className="w-4 h-4 text-[#4285F4] transition-transform group-hover:scale-110" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="floating-chat-window"
          className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#4285F4]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                  Ask Sheetal's AI Assistant
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                  <span>Verified Resume Grounding</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-500">
              <button
                onClick={() => setShowConfig(!showConfig)}
                title="Configure Azure OpenAI API / Settings"
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <Sliders className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Optional Azure OpenAI / Provider Configuration Drawer */}
          {showConfig && (
            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-xs space-y-2.5 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                <span>LLM Engine Settings</span>
                <span className="text-[10px] text-slate-400">Azure OpenAI Ready</span>
              </div>
              
              <div className="flex gap-1.5">
                <button
                  onClick={() => updateSetting('provider', 'grounded')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    settings.provider === 'grounded'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Direct Grounded
                </button>
                <button
                  onClick={() => updateSetting('provider', 'azure')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    settings.provider === 'azure'
                      ? 'bg-[#4285F4] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Azure OpenAI API
                </button>
              </div>

              {settings.provider === 'azure' && (
                <div className="space-y-1.5 pt-1">
                  <input
                    type="text"
                    placeholder="Azure Endpoint (https://your-resource.openai.azure.com)"
                    value={settings.azureEndpoint}
                    onChange={(e) => updateSetting('azureEndpoint', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white"
                  />
                  <input
                    type="password"
                    placeholder="Azure API Key"
                    value={settings.azureApiKey}
                    onChange={(e) => updateSetting('azureApiKey', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Deployment (e.g. gpt-4o)"
                      value={settings.azureDeployment}
                      onChange={(e) => updateSetting('azureDeployment', e.target.value)}
                      className="w-1/2 px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Api Version"
                      value={settings.azureApiVersion}
                      onChange={(e) => updateSetting('azureApiVersion', e.target.value)}
                      className="w-1/2 px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-white dark:bg-slate-900 text-xs sm:text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[90%] ${
                  m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    m.role === 'user'
                      ? 'bg-slate-800 text-white'
                      : 'bg-blue-50 dark:bg-blue-950 text-[#4285F4]'
                  }`}
                >
                  {m.role === 'user' ? 'U' : 'SG'}
                </div>

                <div
                  className={`rounded-2xl px-3.5 py-2.5 leading-relaxed space-y-1.5 ${
                    m.role === 'user'
                      ? 'bg-[#4285F4] text-white rounded-tr-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-750 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line text-xs sm:text-[13px]">{m.content}</p>

                  {m.sources && m.sources.length > 0 && (
                    <div className="pt-1.5 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-wrap gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                      <span>Source: {m.sources.join(', ')}</span>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 text-right">
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#4285F4]" />
                <span>Checking verified resume facts...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 overflow-x-auto flex gap-1.5 no-scrollbar">
            {INITIAL_SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="shrink-0 px-2.5 py-1 rounded-full text-[11px] bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Sheetal's resume..."
              disabled={loading}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:border-[#4285F4] transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-full bg-[#4285F4] hover:bg-blue-600 disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
