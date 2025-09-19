export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight">Build modern sites and business systems for Kurdistan</h1>
            <p className="mt-4 text-neutral-600">AI-powered builder for websites or POS/inventory. Localized in Kurdish (Sorani & Kurmanji), Arabic, and English.</p>
            <div className="mt-8 flex gap-3">
              <a href="/get-started" className="rounded-lg bg-black px-5 py-3 text-white">Get Started</a>
              <a href="/pricing" className="rounded-lg border px-5 py-3">Pricing</a>
            </div>
          </div>
          <div>
            <div className="rounded-2xl border p-6">
              <div className="h-64 w-full rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200" />
              <p className="mt-3 text-sm text-neutral-500">Preview of a generated site/system</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

