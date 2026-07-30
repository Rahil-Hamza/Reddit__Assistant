import { useState, useEffect } from "react";
import { browser } from "wxt/browser"; // <-- Use WXT's universal wrapper

export interface FormData {
  endpoint: string;
  apiKey: string;
}

export function useFormData() {
  const [formData, setFormData] = useState<FormData>({
    endpoint: "",
    apiKey: "",
  });

  useEffect(() => {
    // Async function to fetch from cross-browser storage
    async function loadData() {
      try {
        const result = await browser.storage.local.get("formData");
        if (result.formData) {
          setFormData(result.formData as FormData);
        }
      } catch (error) {
        console.error("Failed to load formData from storage:", error);
      }
    }
    
    loadData();
  }, []);

  return { formData, setFormData };
}