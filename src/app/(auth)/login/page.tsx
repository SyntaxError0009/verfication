"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-sm px-6 py-24">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input className="w-full rounded-lg border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-lg border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full rounded-lg bg-black p-2 text-white" disabled={loading}>{loading ? "Loading..." : "Log in"}</button>
        </form>
        <p className="mt-4 text-sm text-neutral-600">No account? <a className="underline" href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

