import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SiteViewerPage({ params }: { params: { sub: string } }) {
  const site = await prisma.site.findFirst({ where: { subdomain: params.sub } });
  if (!site) return notFound();

  const pages = await prisma.page.findMany({ where: { siteId: site.id }, orderBy: { order: "asc" } });

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-5xl px-6 py-6">
        <h1 className="text-2xl font-semibold">{site.name}</h1>
        <p className="text-neutral-600">Locale: {site.locale}</p>
      </header>
      <main className="mx-auto max-w-5xl px-6 pb-24">
        {pages.map((p) => (
          <section key={p.id} className="my-8 rounded-xl border p-6">
            <h2 className="text-xl font-medium">{p.name}</h2>
            <pre className="mt-3 text-sm overflow-auto">{JSON.stringify(p.content, null, 2)}</pre>
          </section>
        ))}
      </main>
    </div>
  );
}

