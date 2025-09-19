"use client";

import { useState } from "react";

export default function GetStartedPage() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState<"site" | "system">("site");
  const [locale, setLocale] = useState("ckb");
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setSchema(null);
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, type, locale }),
    });
    const data = await res.json();
    setSchema(data.schema);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Describe your business</h1>
        <p className="mt-2 text-neutral-600">Example: I have a clothing store in Sulaymaniyah, I need an online shop in Kurdish.</p>
        <div className="mt-6 space-y-4">
          <textarea
            className="w-full rounded-lg border p-3"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your business..."
          />
          <div className="flex items-center gap-3">
            <select className="rounded-lg border p-2" value={type} onChange={(e) => setType(e.target.value as any)}>
              <option value="site">Website</option>
              <option value="system">Business System (POS/Inventory/Invoices)</option>
            </select>
            <select className="rounded-lg border p-2" value={locale} onChange={(e) => setLocale(e.target.value)}>
              <option value="ckb">Kurdish (Sorani)</option>
              <option value="kmr">Kurdish (Kurmanji)</option>
              <option value="ar">Arabic</option>
              <option value="en">English</option>
            </select>
            <button onClick={handleGenerate} className="rounded-lg bg-black px-4 py-2 text-white" disabled={loading}>
              {loading ? "Generating..." : "Generate Preview"}
            </button>
          </div>
        </div>

        {schema && (
          <div className="mt-10 rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">AI Preview (Locked)</h2>
              <a href="/pricing" className="rounded-lg bg-black px-3 py-2 text-white">Unlock with subscription</a>
            </div>
            <pre className="mt-4 max-h-96 overflow-auto text-sm">{schema}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

