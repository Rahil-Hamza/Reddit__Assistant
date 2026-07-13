import React, { useState, useRef, useEffect } from 'react';
import { Languages, Check, ChevronDown } from 'lucide-react';
import { browser } from 'wxt/browser';
import { useTranslation } from 'react-i18next';
import { getSystemLanguageCode } from '../utils/i18n';

const AVAILABLE_LANGUAGES = [
  { code: 'system', label: 'System Default', native: 'Auto', dir: 'auto' },
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { code: 'es', label: 'Spanish', native: 'Español', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', dir: 'ltr' },
];

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(AVAILABLE_LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initLanguage() {
      const stored = await browser.storage.local.get('user_language_preference');
      const savedCode = stored.user_language_preference || 'system';
      const foundLang = AVAILABLE_LANGUAGES.find(l => l.code === savedCode) || AVAILABLE_LANGUAGES[0];
      setSelectedLang(foundLang);
      applyLanguageChange(foundLang, false);
    }
    initLanguage();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyLanguageChange = (lang: typeof AVAILABLE_LANGUAGES[0], saveToStorage = true) => {
    let targetCode = lang.code;
    let targetDir = lang.dir;

    if (targetCode === 'system') {
      targetCode = getSystemLanguageCode();
      targetDir = ['ar', 'he', 'fa'].includes(targetCode) ? 'rtl' : 'ltr';
    }

    i18n.changeLanguage(targetCode);
    document.documentElement.dir = targetDir;
    document.documentElement.lang = targetCode;

    if (saveToStorage) {
      browser.storage.local.set({ user_language_preference: lang.code });
    }
  };

  const handleSelect = (lang: typeof AVAILABLE_LANGUAGES[0]) => {
    setSelectedLang(lang);
    setIsOpen(false);
    applyLanguageChange(lang, true);
  };

  return (
    <div className="relative inline-block text-start z-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 hover:bg-slate-800 border border-slate-800/80 text-sm font-medium text-slate-300 transition-colors focus:outline-none"
      >
        <Languages className="w-4 h-4 text-emerald-400" />
        <span>{selectedLang.native}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        /* Added max-h-48 and overflow-y-auto here so long lists scroll cleanly inside the popup! */
        <div className="absolute top-full end-0 mt-2 w-48 max-h-48 overflow-y-auto rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-50 animate-fade-in">
          <div className="py-1">
            {AVAILABLE_LANGUAGES.map((lang) => {
              const isSelected = selectedLang.code === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors text-start ${
                    isSelected ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{lang.native}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-emerald-500/70' : 'text-slate-500'}`}>{lang.label}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 shrink-0 ms-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};