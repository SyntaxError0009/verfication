"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  contentKey: string;
  defaultValue: string;
  className?: string;
};

export function InlineEditable({ contentKey, defaultValue, className }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [saving, setSaving] = useState(false);
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: contentKey, value }),
    });
    setSaving(false);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void save();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [value]);

  return (
    <div
      className={`relative rounded-md ${hover ? "ring-1 ring-blue-400" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <textarea
        ref={inputRef}
        className={`w-full resize-none border-0 bg-transparent p-0 outline-none ${className ?? ""}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {hover && (
        <button
          onClick={save}
          className="absolute right-0 top-0 m-1 rounded bg-black px-2 py-1 text-xs text-white"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      )}
    </div>
  );
}

