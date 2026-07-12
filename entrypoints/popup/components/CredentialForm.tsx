import React, { useState, useEffect } from 'react';
import { Save, Eye, EyeOff, KeyRound, Globe, CheckCircle2 } from 'lucide-react';
import { browser } from 'wxt/browser'; // Or use standard 'chrome' API if not using WXT import wrapper

interface FormInfo {
  endpoint: string;
  apiKey: string;
}

export default function CredentialForm() {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    endpoint: '',
    apiKey: '',
  });
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // 1. Load existing credentials from storage on mount
  useEffect(() => {
    async function loadStoredCredentials() {
      try {
        // 1. Tell TypeScript exactly what shape to expect from storage
        const stored = (await browser.storage.local.get([
          'llm_endpoint',
          'llm_api_key',
        ])) as {
          llm_endpoint?: string;
          llm_api_key?: string;
        };

        if (stored.llm_endpoint || stored.llm_api_key) {
          setFormInfo({
            endpoint: stored.llm_endpoint || '',
            apiKey: stored.llm_api_key || '',
          });
        }
      } catch (error) {
        console.error('Failed to load credentials from Chrome storage:', error);
      }
    }
    loadStoredCredentials();
  }, []);

  // 2. Handle input changes smoothly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
    if (saveSuccess) setSaveSuccess(false); // Reset success feedback on edit
  };

  // 3. Handle form submission & storage save
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Save directly to native extension storage
      await browser.storage.local.set({
        llm_endpoint: formInfo.endpoint.trim(),
        llm_api_key: formInfo.apiKey.trim(),
      });

      console.log('✅ Credentials successfully saved to chrome.storage.local:', formInfo);
      setSaveSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('❌ Failed to save credentials:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-[600px] min-h-[420px] bg-slate-950 text-slate-100 p-6 font-sans select-none border border-slate-800 shadow-2xl">
      {/* Header Section */}
      <div className="mb-6 border-b border-slate-800 pb-4">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-indigo-400" />
          API Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure your LLM endpoint and secret key to activate background scraping and AI Q&A features.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Endpoint Input */}
        <div className="space-y-1.5">
          <label htmlFor="endpoint" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            API Endpoint <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="url"
              id="endpoint"
              name="endpoint"
              required
              placeholder="https://generativelanguage.googleapis.com/..."
              value={formInfo.endpoint}
              onChange={handleChange}
              className="block w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Must be a valid HTTPS URL pointing to your AI provider or proxy server.
          </p>
        </div>

        {/* API Key Input with Visibility Toggle */}
        <div className="space-y-1.5">
          <label htmlFor="apiKey" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Secret API Key <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type={showApiKey ? 'text' : 'password'}
              id="apiKey"
              name="apiKey"
              required
              placeholder="AIzaSy..."
              value={formInfo.apiKey}
              onChange={handleChange}
              className="block w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors font-mono"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
              title={showApiKey ? 'Hide API Key' : 'Show API Key'}
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Your key is stored locally on your device in <code className="text-slate-400 font-mono">chrome.storage.local</code>.
          </p>
        </div>

        {/* Action Bar / Submit Button */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-800/80 mt-6">
          <div className="flex items-center gap-2 min-h-[24px]">
            {saveSuccess && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Saved successfully!
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSaving || !formInfo.endpoint || !formInfo.apiKey}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all active:scale-[0.98]"
          >
            <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}