export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold">Payment successful</h1>
        <p className="mt-3 text-neutral-600">Your subscription is active. Your site will deploy shortly.</p>
        <a href="/dashboard" className="mt-6 inline-block rounded-lg bg-black px-4 py-2 text-white">Go to Dashboard</a>
      </div>
    </div>
  );
}

