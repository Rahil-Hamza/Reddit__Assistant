import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { browser } from 'wxt/browser';

const resources = {
  en: {
    translation: {
      "api_config": "API Configuration",
      "config_desc": "Configure your LLM endpoint and secret key to activate background scraping and AI Q&A features.",
      "api_endpoint": "API Endpoint",
      "endpoint_help": "Must be a valid HTTPS URL pointing to your AI provider or proxy server.",
      "secret_key": "Secret API Key",
      "key_help_pre": "Your key is stored locally on your device in",
      "save_btn": "Save Configuration",
      "saving": "Saving...",
      "saved_success": "Saved successfully!",
      "err_endpoint_empty": "API Endpoint cannot be empty. Please enter a URL.",
      "err_endpoint_https": "The API Endpoint must be a valid HTTPS URL (starting with https://).",
      "err_endpoint_format": "The API Endpoint is not a valid URL format (e.g., https://...).",
      "err_key_empty": "Secret API Key cannot be empty. Please enter your key.",
      "err_storage": "An unexpected error occurred while saving to storage.",
      "privacy_notice": "Your API credentials are kept private and processed securely on your browser.",
      "copyright": "Copyright Rahil © 2026"
    }
  },
  es: {
    translation: {
      "api_config": "Configuración de API",
      "config_desc": "Configure su endpoint y clave secreta de IA para activar el raspado en segundo plano y las preguntas y respuestas.",
      "api_endpoint": "Endpoint de API",
      "endpoint_help": "Debe ser una URL HTTPS válida que apunte a su proveedor de IA o servidor proxy.",
      "secret_key": "Clave Secreta de API",
      "key_help_pre": "Su clave se almacena localmente en su dispositivo en",
      "save_btn": "Guardar Configuración",
      "saving": "Guardando...",
      "saved_success": "¡Guardado con éxito!",
      "err_endpoint_empty": "El endpoint de la API no puede estar vacío.",
      "err_endpoint_https": "El endpoint debe ser una URL HTTPS válida (comenzando con https://).",
      "err_endpoint_format": "El endpoint no tiene un formato de URL válido.",
      "err_key_empty": "La clave secreta no puede estar vacía.",
      "err_storage": "Ocurrió un error inesperado al guardar.",
      "privacy_notice": "Sus credenciales se mantienen privadas y se procesan de forma segura en su navegador.",
      "copyright": "Derechos de autor Rahil © 2026"
    }
  },
  ar: {
    translation: {
      "api_config": "تكوين واجهة برمجة التطبيقات (API)",
      "config_desc": "قم بتكوين رابط الخادم والمفتاح السري لتفعيل استخراج البيانات والمساعد الذكي.",
      "api_endpoint": "رابط الخادم (Endpoint)",
      "endpoint_help": "يجب أن يكون رابط HTTPS صالحاً يشير إلى مزود الذكاء الاصطناعي الخاص بك.",
      "secret_key": "المفتاح السري (API Key)",
      "key_help_pre": "يتم تخزين مفتاحك محلياً على جهازك في",
      "save_btn": "حفظ التكوين",
      "saving": "جاري الحفظ...",
      "saved_success": "تم الحفظ بنجاح!",
      "err_endpoint_empty": "لا يمكن أن يكون رابط الخادم فارغاً.",
      "err_endpoint_https": "يجب أن يبدأ الرابط بـ https:// وأن يكون صالحاً.",
      "err_endpoint_format": "صيغة الرابط غير صحيحة.",
      "err_key_empty": "لا يمكن أن يكون المفتاح السري فارغاً.",
      "err_storage": "حدث خطأ غير متوقع أثناء الحفظ.",
      "privacy_notice": "يتم حفظ بياناتك بسرية ومعالجتها بأمان داخل متصفحك فقط.",
      "copyright": "حقوق النشر راحيل @ 2026"
    }
  },
  hi: {
    translation: {
      "api_config": "API कॉन्फ़िगरेशन",
      "config_desc": "बैकग्राउंड स्क्रेपिंग और AI सुविधाओं को सक्रिय करने के लिए अपना LLM एंडपॉइंट और सीक्रेट की (Key) कॉन्फ़िगर करें।",
      "api_endpoint": "API एंडपॉइंट",
      "endpoint_help": "यह आपके AI प्रदाता या प्रॉक्सी सर्वर को इंगित करने वाला एक वैध HTTPS URL होना चाहिए।",
      "secret_key": "सीक्रेट API की (Key)",
      "key_help_pre": "आपकी की (Key) आपके डिवाइस पर स्थानीय रूप से यहाँ सुरक्षित है:",
      "save_btn": "कॉन्फ़िगरेशन सहेजें",
      "saving": "सहेजा जा रहा है...",
      "saved_success": "सफलतापूर्वक सहेजा गया!",
      "err_endpoint_empty": "API एंडपॉइंट खाली नहीं हो सकता। कृपया एक URL दर्ज करें।",
      "err_endpoint_https": "API एंडपॉइंट एक वैध HTTPS URL होना चाहिए (https:// से शुरू)।",
      "err_endpoint_format": "API एंडपॉइंट एक वैध URL प्रारूप नहीं है।",
      "err_key_empty": "सीक्रेट API की (Key) खाली नहीं हो सकती।",
      "err_storage": "सहेजते समय एक अज्ञात त्रुटि हुई।",
      "privacy_notice": "आपकी API साख (credentials) निजी रखी जाती हैं और आपके ब्राउज़र पर सुरक्षित रूप से संसाधित की जाती हैं।",
      "copyright": "कॉपीराइट राहिल @ 2026"
    }
  }
};

export const getSystemLanguageCode = (): string => {
  const fullCode = browser.i18n.getUILanguage() || navigator.language || 'en';
  const shortCode = fullCode.split('-')[0].toLowerCase();
  return resources[shortCode as keyof typeof resources] ? shortCode : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;