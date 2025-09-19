export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-medium">MyPlatform</a>
          <div className="flex items-center gap-4 text-sm">
            <a href="/pricing">Pricing</a>
            <a href="/get-started" className="rounded-lg bg-black px-3 py-2 text-white">Get Started</a>
          </div>
        </div>
      </nav>
      {children}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-neutral-600">© {new Date().getFullYear()} MyPlatform</div>
      </footer>
    </div>
  );
}

