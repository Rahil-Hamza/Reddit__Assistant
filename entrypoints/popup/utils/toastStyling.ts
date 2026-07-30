import { ToasterProps } from 'react-hot-toast';

// 1. Define the config object (TypeScript safe!)
export const toasterConfig: ToasterProps = {
  position: "bottom-center",
  toastOptions: {
    // Default / Success Style (Matches your popup_form container)
    className: "!bg-slate-800 !text-slate-100 !border !border-slate-700 !rounded-xl !shadow-2xl !font-sans !text-sm tracking-wide",
    success: {
      iconTheme: {
        primary: "#10b981", // emerald-500
        secondary: "#1e293b", // slate-800
      },
    },
    // Error Style (Matches your floating validation tooltips)
    error: {
      className: "!bg-red-950 !text-red-200 !border !border-red-500/50 !rounded-xl !shadow-2xl !font-sans !text-sm tracking-wide",
      iconTheme: {
        primary: "#f87171", // red-400
        secondary: "#450a0a", // red-950
      },
    },
  },
};
