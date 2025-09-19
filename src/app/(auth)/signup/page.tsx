"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    setLoading(false);
    if (res.ok) router.push("/login");
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-sm px-6 py-24">
        <h1 className="text-2xl font-semibold">Sign up</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input className="w-full rounded-lg border p-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full rounded-lg border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-lg border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full rounded-lg bg-black p-2 text-white" disabled={loading}>{loading ? "Loading..." : "Create account"}</button>
        </form>
        <p className="mt-4 text-sm text-neutral-600">Have an account? <a className="underline" href="/login">Log in</a></p>
      </div>
    </div>
  );
}

