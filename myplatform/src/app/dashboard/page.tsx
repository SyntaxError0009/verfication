import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  // Placeholder: list sites
  const sites = await prisma.site.findMany({ orderBy: { createdAt: "desc" }, take: 10 });
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="mt-8 grid gap-4">
          {sites.map((s) => (
            <div key={s.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{s.name}</p>
                  {s.subdomain && (
                    <a className="text-sm text-neutral-600 underline" href={`https://${s.subdomain}.${process.env.PRIMARY_DOMAIN ?? "localhost:3000"}`}>{s.subdomain}</a>
                  )}
                </div>
                <a className="rounded-lg border px-3 py-2" href={`/s/${s.subdomain ?? ""}`}>Open</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

