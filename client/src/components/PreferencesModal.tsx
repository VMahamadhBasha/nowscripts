import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Settings, X, Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-now-primary" /> Preferences
            </h2>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Appearance
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => setTheme('light')}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  theme === 'light' 
                    ? 'border-now-primary bg-now-primary/5' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-now-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <Sun className="w-5 h-5" />
                  </div>
                  <span className={`font-medium ${theme === 'light' ? 'text-now-primary dark:text-now-primary' : 'text-slate-700 dark:text-slate-300'}`}>
                    Light Mode
                  </span>
                </div>
                {theme === 'light' && (
                  <div className="w-3 h-3 rounded-full bg-now-primary" />
                )}
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  theme === 'dark' 
                    ? 'border-now-primary bg-now-primary/5' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-now-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <Moon className="w-5 h-5" />
                  </div>
                  <span className={`font-medium ${theme === 'dark' ? 'text-now-primary dark:text-now-primary' : 'text-slate-700 dark:text-slate-300'}`}>
                    Dark Mode
                  </span>
                </div>
                {theme === 'dark' && (
                  <div className="w-3 h-3 rounded-full bg-now-primary" />
                )}
              </button>

              <button
                onClick={() => setTheme('system')}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  theme === 'system' 
                    ? 'border-now-primary bg-now-primary/5' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme === 'system' ? 'bg-now-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <Monitor className="w-5 h-5" />
                  </div>
                  <span className={`font-medium ${theme === 'system' ? 'text-now-primary dark:text-now-primary' : 'text-slate-700 dark:text-slate-300'}`}>
                    System Default
                  </span>
                </div>
                {theme === 'system' && (
                  <div className="w-3 h-3 rounded-full bg-now-primary" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
              System Default follows your device's operating system theme.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
