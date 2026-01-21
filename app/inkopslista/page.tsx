"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Item = { text: string; done?: boolean };
type List = { id: string; name: string; items: Item[]; createdAt: string };

const STORAGE_KEY = "fridge:shoppingLists";

export default function Inkopslista() {
  const [lists, setLists] = useState<List[]>([]);
  const [selected, setSelected] = useState<List | null>(null);
  const search = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: List[] = raw ? JSON.parse(raw) : [];
      setLists(parsed);

      const id = search?.get("id");
      if (id) {
        const found = parsed.find((l) => l.id === id);
        if (found) setSelected(found);
        else router.replace("/inkopslista");
      } else if (parsed.length) {
        setSelected(parsed[0]);
      }
    } catch (e) {
      console.error("Failed to load lists", e);
    }
  }, [search]);

  function updateLists(updated: List[]) {
    setLists(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function toggleItem(index: number) {
    if (!selected) return;
    const newItems = selected.items.map((it, i) =>
      i === index ? { ...it, done: !it.done } : it,
    );
    const newSelected = { ...selected, items: newItems };
    setSelected(newSelected);

    const updated = lists.map((l) =>
      l.id === newSelected.id ? newSelected : l,
    );
    updateLists(updated);
  }

  function removeList(id: string) {
    const updated = lists.filter((l) => l.id !== id);
    updateLists(updated);
    setSelected(updated[0] ?? null);
    router.replace("/inkopslista");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-black">Inköpslista</h1>
          <div className="text-sm text-black">
            {lists.length} list{lists.length !== 1 ? "or" : "a"}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            {lists.length ? (
              <div className="space-y-2">
                <label className="block text-sm text-black">Välj lista</label>
                <select
                  value={selected?.id ?? ""}
                  onChange={(e) => {
                    const id = e.target.value;
                    const found = lists.find((l) => l.id === id) ?? null;
                    setSelected(found);
                    if (id) router.replace(`/inkopslista?id=${id}`);
                  }}
                  className="mt-1 block w-full rounded border font-semibold text-black"
                >
                  {lists.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="font-semibold text-black">
                Ingen inköpslista ännu — lägg till en från Innehåll.
              </p>
            )}
          </div>

          {selected && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-black">
                    {selected.name}
                  </div>
                  <div className="text-xs text-black">
                    Skapad: {new Date(selected.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => removeList(selected.id)}
                  className="text-sm text-red-600"
                >
                  Ta bort
                </button>
              </div>

              <div className="space-y-2">
                {selected.items.map((it, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-2 bg-gray-50 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={!!it.done}
                      onChange={() => toggleItem(i)}
                      className="w-5 h-5"
                    />
                    <span
                      className={`${it.done ? "line-through text-black" : "text-black"}`}
                    >
                      {it.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
