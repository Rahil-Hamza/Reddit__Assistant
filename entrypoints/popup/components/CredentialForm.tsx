import React, { useState, useEffect, useRef } from "react";
import {
  Save,
  Eye,
  EyeOff,
  KeyRound,
  Globe,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { browser } from "wxt/browser";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import type {FormData} from '../../hooks/formData.ts'
import  {useFormData} from '../../hooks/formData.ts'
import { toast } from "react-hot-toast/headless";


export default function CredentialForm() {
  const { t } = useTranslation();
  const {formData, setFormData} = useFormData();

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  
  // 1. Preserve previous data and dynamically update the field being typed in
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  
  // 2. Clear out any error messages
  clearErrors();
  
  // 3. Hide the success message if the user starts typing again
  if (saveSuccess) {
    setSaveSuccess(false);
  }
};

  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<keyof FormData | null>(null);

  const endpointRef = useRef<HTMLInputElement>(null);
  const apiKeyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setError(null);
      setErrorField(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [error]);

  const clearErrors = () => {
    if (error || errorField) {
      setError(null);
      setErrorField(null);
    }
  };


  const validateForm = (): {
    isValid: boolean;
    message?: string;
    field?: keyof FormData;
  } => {
    const trimmedEndpoint = formData.endpoint.trim();
    const trimmedApiKey = formData.apiKey.trim();

    if (!trimmedEndpoint) {
      return { isValid: false, message: t("err_endpoint_empty"), field: "endpoint" };
    }

    try {
      const url = new URL(trimmedEndpoint);
      if (url.protocol !== "https:") {
        return { isValid: false, message: t("err_endpoint_https"), field: "endpoint" };
      }
    } catch {
      return { isValid: false, message: t("err_endpoint_format"), field: "endpoint" };
    }

    if (!trimmedApiKey) {
      return { isValid: false, message: t("err_key_empty"), field: "apiKey" };
    }

    return { isValid: true };
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSaveSuccess(false);

    // 1. Run validation
    const validation = validateForm();
    if (!validation.isValid) {
      setError(validation.message || "Please check your inputs.");
      setErrorField(validation.field || null);

      if (validation.field === "endpoint") endpointRef.current?.focus();
      else if (validation.field === "apiKey") apiKeyRef.current?.focus();
      return;
    }

    clearErrors();
    setIsSaving(true);

    try {
      // 2. Save using the modern async/await Promise approach (cleaner than callbacks)
      await browser.storage.local.set({
        formData: {
          endpoint: formData.endpoint.trim(),
          apiKey: formData.apiKey.trim(),
        }
      });

      // 3. Trigger both UI success states (Local CheckCircle + Global Toast)
      setSaveSuccess(true);
      toast.success("Saved successfully!"); 
      
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("❌ Failed to save credentials:", error);
      setError(t("err_storage"));
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div
      onClick={clearErrors}
      className="w-[600px] min-h-[420px] bg-slate-950 text-slate-100 p-6 font-sans select-none border border-slate-800 shadow-2xl"
    >
      <div className="mb-6 border-b border-slate-800 pb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{t("api_config")}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 text-start">
            {t("config_desc")}
          </p>
        </div>

        <div className="ms-auto shrink-0 z-50">
          <LanguageSelector />
        </div>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="popup_form w-[400px] flex justify-center mx-auto bg-slate-800 py-4 rounded-2xl"
      >
        <form onSubmit={handleSubmit} noValidate className="space-y-5 w-full px-6">
          
          {/* Endpoint Input */}
          <div className="relative space-y-1.5">
            <label
              htmlFor="endpoint"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 text-start"
            >
              {t("api_endpoint")} <span className="text-rose-500">*</span>
            </label>

            <div className="relative rounded-lg shadow-sm">
              {/* Locked physical left-0 for globe icon so it stays on the left of URL */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Globe className="w-4 h-4" />
              </div>
              
              {/* Forced dir="ltr" and physical text-left pl-9 so URL never flips in Arabic */}
              <input
                ref={endpointRef}
                type="url"
                id="endpoint"
                name="endpoint"
                required
                placeholder="https://generativelanguage.googleapis.com/..."
                value={formData?.endpoint}
                onChange={handleChange}
                onFocus={clearErrors}
                dir="ltr"
                aria-invalid={errorField === "endpoint"}
                aria-describedby={errorField === "endpoint" ? "endpoint-error" : undefined}
                className={`block w-full pl-9 pr-3 py-2.5 bg-slate-900 border rounded-lg text-sm text-left text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  errorField === "endpoint"
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                }`}
              />

              {errorField === "endpoint" && error && (
                <div
                  id="endpoint-error"
                  role="alert"
                  className="absolute bottom-full start-0 mb-2 z-50 max-w-xs px-3 py-2 text-xs font-medium text-red-200 bg-red-950 border border-red-500/50 rounded-lg shadow-xl animate-fade-in flex items-center gap-2 pointer-events-none"
                >
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-start">{error}</span>
                  <div className="absolute top-full start-4 -mt-1 border-4 border-transparent border-t-red-500/50" />
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 text-start">
              {t("endpoint_help")}
            </p>
          </div>

          {/* API Key Input */}
          <div className="relative space-y-1.5">
            <label
              htmlFor="apiKey"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 text-start"
            >
              {t("secret_key")} <span className="text-rose-500">*</span>
            </label>

            <div className="relative rounded-lg shadow-sm">
              {/* Locked physical left-0 for key icon */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <KeyRound className="w-4 h-4" />
              </div>
              
              {/* Forced dir="ltr" and physical text-left pl-9 pr-10 so API key never flips in Arabic */}
              <input
                ref={apiKeyRef}
                type={showApiKey ? "text" : "password"}
                id="apiKey"
                name="apiKey"
                required
                placeholder="AIzaSy..."
                value={formData?.apiKey}
                onChange={handleChange}
                onFocus={clearErrors}
                dir="ltr"
                aria-invalid={errorField === "apiKey"}
                aria-describedby={errorField === "apiKey" ? "apiKey-error" : undefined}
                className={`block w-full pl-9 pr-10 py-2.5 bg-slate-900 border rounded-lg text-sm text-left text-slate-100 placeholder-slate-500 focus:outline-none transition-colors font-mono ${
                  errorField === "apiKey"
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                }`}
              />
              
              {/* Locked physical right-0 for eye button */}
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
                title={showApiKey ? "Hide API Key" : "Show API Key"}
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              {errorField === "apiKey" && error && (
                <div
                  id="apiKey-error"
                  role="alert"
                  className="absolute bottom-full start-0 mb-2 z-50 max-w-xs px-3 py-2 text-xs font-medium text-red-200 bg-red-950 border border-red-500/50 rounded-lg shadow-xl animate-fade-in flex items-center gap-2 pointer-events-none"
                >
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-start">{error}</span>
                  <div className="absolute top-full start-4 -mt-1 border-4 border-transparent border-t-red-500/50" />
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 text-start">
              {t("key_help_pre")}{" "}
              <code className="text-slate-400 font-mono">chrome.storage.local</code>.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between border-t border-slate-800/80 mt-2 pt-4">
            <div className="flex items-center gap-2 min-h-[24px]">
              {saveSuccess && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  {t("saved_success")}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition-all active:scale-[0.98]"
            >
              <Save className={`w-4 h-4 ${isSaving ? "animate-spin" : ""}`} />
              {isSaving ? t("saving") : t("save_btn")}
            </button>
          </div>
        </form>
      </div>

      <div className="policies mt-7">
        <p className="text-center text-sm text-gray-400">
          {t("privacy_notice")}
        </p>
        <p className="text-center text-sm mt-0.5 text-gray-500">
          {t("copyright")} {new Date().getFullYear() > 2026 ? `- ${new Date().getFullYear()}` : ""}
        </p>
      </div>
    </div>
  );
}