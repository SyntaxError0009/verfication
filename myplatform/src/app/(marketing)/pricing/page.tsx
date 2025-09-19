export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-3 text-neutral-600">Premium, modern, and localized for Kurdistan.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <h2 className="text-2xl font-medium">Monthly</h2>
            <p className="mt-2 text-3xl font-semibold">$29<span className="text-base font-normal text-neutral-500">/mo</span></p>
            <ul className="mt-6 space-y-2 text-sm text-neutral-700">
              <li>AI site or POS preview</li>
              <li>1 deployed site, subdomain included</li>
              <li>Multi-language (Kur/Ar/En)</li>
            </ul>
            <a href="/get-started" className="mt-6 inline-block rounded-lg bg-black px-4 py-2 text-white">Get Started</a>
          </div>
          <div className="rounded-2xl border p-6">
            <h2 className="text-2xl font-medium">Yearly</h2>
            <p className="mt-2 text-3xl font-semibold">$290<span className="text-base font-normal text-neutral-500">/yr</span></p>
            <ul className="mt-6 space-y-2 text-sm text-neutral-700">
              <li>2 months free</li>
              <li>Priority support</li>
              <li>Custom domain ready</li>
            </ul>
            <a href="/get-started" className="mt-6 inline-block rounded-lg bg-black px-4 py-2 text-white">Get Started</a>
          </div>
        </div>
      </div>
    </div>
  );
}

