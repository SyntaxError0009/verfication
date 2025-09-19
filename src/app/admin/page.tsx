import { prisma } from "@/lib/prisma";
import { InlineEditable } from "@/components/InlineEditable";

export default async function AdminPage() {
  const entries = await prisma.contentEntry.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Admin Inline Content</h1>
        <div className="mt-8 grid gap-4">
          {entries.map((e) => (
            <div key={e.id} className="rounded-xl border p-4">
              <p className="text-sm text-neutral-500">{e.key}</p>
              <InlineEditable contentKey={e.key} defaultValue={e.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

