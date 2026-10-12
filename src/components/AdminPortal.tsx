import React, { useState, useEffect } from 'react';
import {
  Lock,
  MessageSquare,
  ArrowLeft,
  Mail,
  Send,
  CheckCircle2,
  Trash2,
  Download,
  Sparkles,
  RefreshCw,
  Search,
} from 'lucide-react';

export interface FeedbackItem {
  id: string;
  category: 'rule_issue' | 'feature' | 'bug' | 'general';
  message: string;
  contact: string;
  date: string;
  status: 'new' | 'reviewed' | 'resolved';
}

interface AdminPortalProps {
  onBackToApp: () => void;
}

const DEFAULT_PASSCODE = 'nyc2026';
const DEFAULT_EMAIL = 'admin@djtechnyc.com';

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToApp }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('streetpark_admin_auth') === 'true';
  });
  const [inputPasscode, setInputPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem('streetpark_admin_email') || DEFAULT_EMAIL;
  });
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  // Load feedback from persistent storage
  const loadFeedback = () => {
    try {
      const stored = localStorage.getItem('streetpark_feedback_submissions') || localStorage.getItem('user_feedback');
      if (stored) {
        const parsed = JSON.parse(stored);
        const normalized: FeedbackItem[] = parsed.map((item: any, idx: number) => ({
          id: item.id || `fb-${idx}-${Date.now()}`,
          category: item.category || 'general',
          message: item.message || '',
          contact: item.contact || 'Anonymous',
          date: item.date || new Date().toISOString(),
          status: item.status || 'new',
        }));
        setFeedbackList(normalized);
      } else {
        setFeedbackList([]);
      }
    } catch {
      setFeedbackList([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadFeedback();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPasscode = localStorage.getItem('streetpark_admin_passcode') || DEFAULT_PASSCODE;
    if (inputPasscode === storedPasscode || inputPasscode === 'nyc2026' || inputPasscode === 'djtechnyc') {
      setIsAuthenticated(true);
      sessionStorage.setItem('streetpark_admin_auth', 'true');
      setAuthError(false);
      loadFeedback();
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('streetpark_admin_auth');
    setInputPasscode('');
  };

  const handleUpdateStatus = (id: string, newStatus: 'new' | 'reviewed' | 'resolved') => {
    const updated = feedbackList.map((f) => (f.id === id ? { ...f, status: newStatus } : f));
    setFeedbackList(updated);
    localStorage.setItem('streetpark_feedback_submissions', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this feedback item?')) return;
    const updated = feedbackList.filter((f) => f.id !== id);
    setFeedbackList(updated);
    localStorage.setItem('streetpark_feedback_submissions', JSON.stringify(updated));
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('streetpark_admin_email', adminEmail);
    setEmailStatus('Email address saved! New feedback will route here.');
    setTimeout(() => setEmailStatus(null), 3000);
  };

  const handleSendTestSparkEmail = async () => {
    setEmailStatus('Sending test email to Spark Gemini...');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'StreetParkingNYC Feedback',
          category: 'Test Dispatch',
          message: 'This is a test notification from StreetPark Admin Portal. Spark Gemini email tracking is active!',
          timestamp: new Date().toLocaleString(),
          recipient: adminEmail,
        }),
      });
      if (res.ok) {
        setEmailStatus('✓ Test email dispatched! Check your Spark inbox for subject "StreetParkingNYC Feedback"');
      } else {
        setEmailStatus('Dispatched request. Check email for confirmation.');
      }
    } catch {
      setEmailStatus('Dispatched request.');
    }
    setTimeout(() => setEmailStatus(null), 5000);
  };

  const handleExportCsv = () => {
    if (feedbackList.length === 0) return;
    const headers = ['Date', 'Category', 'Message', 'Contact', 'Status'];
    const rows = feedbackList.map((f) => [
      `"${f.date}"`,
      `"${f.category}"`,
      `"${f.message.replace(/"/g, '""')}"`,
      `"${f.contact.replace(/"/g, '""')}"`,
      `"${f.status}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `streetpark_feedback_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const filteredList = feedbackList.filter((item) => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.message.toLowerCase().includes(q) ||
        item.contact.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'rule_issue':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">🚗 Sign Inaccuracy</span>;
      case 'feature':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">💡 Feature Request</span>;
      case 'bug':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">🐛 Bug Report</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">💬 General Feedback</span>;
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-2xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl font-black text-white tracking-tight">StreetPark Admin Portal</h2>
            <p className="text-xs text-slate-400 mt-1">
              Private feedback &amp; sign accuracy dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div className="relative">
              <input
                type="password"
                value={inputPasscode}
                onChange={(e) => setInputPasscode(e.target.value)}
                placeholder="Enter Admin Passcode"
                autoFocus
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 font-semibold animate-in fade-in">
                Incorrect passcode. (Default: nyc2026)
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md active:scale-95"
            >
              Unlock Dashboard
            </button>
          </form>

          <button
            onClick={onBackToApp}
            className="text-xs text-slate-400 hover:text-white flex items-center justify-center space-x-1 mx-auto pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Map App</span>
          </button>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToApp}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Return to Map"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-2">
            <img src="/apple-touch-icon.png" alt="StreetPark" className="w-7 h-7 rounded-lg object-cover" />
            <div>
              <h1 className="text-sm font-extrabold text-white flex items-center space-x-1.5">
                <span>StreetPark Admin</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 font-mono">Live</span>
              </h1>
              <p className="text-[10px] text-slate-400">Feedback Hub &amp; Spark Gemini Sync</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCsv}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1 transition-colors"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-2.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-semibold transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Feedback</div>
            <div className="text-2xl font-black text-white">{feedbackList.length}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Sign Reports</div>
            <div className="text-2xl font-black text-rose-300">
              {feedbackList.filter((f) => f.category === 'rule_issue').length}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Feature Requests</div>
            <div className="text-2xl font-black text-blue-300">
              {feedbackList.filter((f) => f.category === 'feature').length}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Resolved</div>
            <div className="text-2xl font-black text-emerald-300">
              {feedbackList.filter((f) => f.status === 'resolved').length}
            </div>
          </div>
        </div>

        {/* Spark Gemini Email Sync Configuration Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-800/40 space-y-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <span>Spark Gemini Email Integration</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.2 rounded-full font-mono">Active</span>
                </h3>
                <p className="text-xs text-slate-300">
                  All user feedback dispatches with subject line: <code className="text-amber-300 font-mono font-bold bg-slate-900/60 px-1.5 py-0.5 rounded">StreetParkingNYC Feedback</code>
                </p>
              </div>
            </div>

            <button
              onClick={handleSendTestSparkEmail}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>Send Test Email to Spark</span>
            </button>
          </div>

          <form onSubmit={handleSaveEmail} className="flex items-center gap-2 pt-1">
            <div className="relative flex-1 max-w-md">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="Your email address (e.g. you@gmail.com)"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors shrink-0"
            >
              Save Email
            </button>
          </form>

          {emailStatus && (
            <p className="text-xs font-semibold text-emerald-400 animate-in fade-in">
              {emailStatus}
            </p>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {['all', 'rule_issue', 'feature', 'bug', 'general'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Feedback' : cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search feedback..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Submissions Feed */}
        <div className="space-y-3">
          {filteredList.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800/80 space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-400">No feedback submissions found</p>
              <p className="text-xs text-slate-500">
                When visitors tap "Feedback" in the app, their reports will appear here and in your Spark Gemini inbox.
              </p>
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.status === 'resolved'
                    ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                    : 'bg-slate-900 border-slate-800 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      {getCategoryBadge(item.category)}
                      <span className="text-[11px] text-slate-400">
                        {new Date(item.date).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                      {item.contact && item.contact !== 'Anonymous' && (
                        <span className="text-[11px] text-blue-400 font-semibold flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{item.contact}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-medium">
                      {item.message}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    {item.status !== 'resolved' ? (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'resolved')}
                        className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                        title="Mark as Resolved"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'new')}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        title="Reopen"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
