import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState<'rule_issue' | 'feature' | 'bug' | 'general'>('rule_issue');
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Save submission locally
    try {
      const existing = JSON.parse(localStorage.getItem('user_feedback') || '[]');
      existing.push({ category, message, contact, date: new Date().toISOString() });
      localStorage.setItem('user_feedback', JSON.stringify(existing));
    } catch {}

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setMessage('');
    setContact('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 select-auto">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                Submit Feedback
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                Help us improve NYC street parking accuracy
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white text-base">
              Thank You for Your Feedback!
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 max-w-xs mx-auto leading-relaxed">
              We review every street sign report and feature request to make parking in NYC as stress-free as possible.
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="px-5 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold transition-all shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            {/* Category Selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                What would you like to report?
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'rule_issue', label: '🚗 Sign / Rule Inaccuracy' },
                  { id: 'feature', label: '💡 Feature Request' },
                  { id: 'bug', label: '🐛 Bug / Glitch' },
                  { id: 'general', label: '💬 General Feedback' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-left text-[11px] font-semibold border transition-all ${
                      category === item.id
                        ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold'
                        : 'border-gray-200 dark:border-gray-700/80 bg-gray-50/60 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Details & Street Location
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="E.g., 60th Ave Alternate Side sign is Tuesday 8:30-10am, or suggest a new feature..."
                required
                rows={4}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            {/* Optional Contact */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Your Email or Name (Optional)
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Optional, if you'd like a follow-up"
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1.5 shadow-md shadow-blue-600/20 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
