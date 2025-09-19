export const locales = ["ckb", "kmr", "ar", "en"] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = "ckb";

export const messages: Record<Locale, Record<string, string>> = {
  ckb: {
    getStarted: "دەست پێبکە",
    pricing: "نرخەکان",
    headline: "وێبسایت و سیستەم بۆ کاروباری کوردستان دروست بکە",
    sub: "ئای.ئای وەرگێڕانی زمان و دیزاینی سەرهێڵ.",
  },
  kmr: {
    getStarted: "Dest pê bike",
    pricing: "Bihayên",
    headline: "Malper û pergal ji bo Kurdistanê biafirîne",
    sub: "AI bi ziman û dizaynek rojane.",
  },
  ar: {
    getStarted: "ابدأ الآن",
    pricing: "الأسعار",
    headline: "ابنِ مواقع وأنظمة للأعمال في كردستان",
    sub: "ذكاء اصطناعي، لغات متعددة، وتصميم حديث.",
  },
  en: {
    getStarted: "Get Started",
    pricing: "Pricing",
    headline: "Build modern sites and systems for Kurdistan",
    sub: "AI, multi-language, and premium design.",
  },
};

