"use client";

import React, { useState } from "react";

type Item = { text: string; done?: boolean };
type List = { id: string; name: string; items: Item[]; createdAt: string };

const STORAGE_KEY = "fridge:shoppingLists";

export default function Inkopslista() {
  const [lists, setLists] = useState<List[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as List[]) : [];
    } catch (e) {
      console.error("Failed to load lists", e);
      return [];
    }
  });

  const [expanded, setExpanded] = useState<string[]>([]);

  function updateLists(updated: List[]) {
    setLists(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function toggleItem(listId: string, index: number) {
    const updated = lists.map((l) => {
      if (l.id !== listId) return l;
      const newItems = l.items.map((it, i) =>
        i === index ? { ...it, done: !it.done } : it,
      );
      return { ...l, items: newItems };
    });
    updateLists(updated);
  }

  function removeList(id: string) {
    const updated = lists.filter((l) => l.id !== id);
    updateLists(updated);
    setExpanded((prev) => prev.filter((x) => x !== id));
  }

  function toggleExpand(id: string) {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
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
          {lists.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-4">
              <p className="font-semibold text-black">
                Ingen inköpslista ännu — lägg till en från Innehåll.
              </p>
            </div>
          ) : (
            lists.map((l) => {
              const isOpen = expanded.includes(l.id);
              return (
                <div
                  key={l.id}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onClick={() => toggleExpand(l.id)}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" ||
                        e.key === " " ||
                        e.key === "Spacebar"
                      ) {
                        e.preventDefault();
                        toggleExpand(l.id);
                      }
                    }}
                    className="w-full text-left p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-black">{l.name}</div>
                      <div className="text-xs text-black">
                        {l.items.length} artiklar • Skapad:{" "}
                        {new Date(l.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeList(l.id);
                        }}
                        className="text-sm text-red-600"
                      >
                        Ta bort
                      </button>
                      <svg
                        className={`w-5 h-5 text-black transform transition-transform ${isOpen ? "rotate-90" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 4l6 6-6 6V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="p-4 border-t bg-gray-50">
                      <div className="space-y-2">
                        {l.items.map((it, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-3 p-2 bg-white rounded"
                          >
                            <input
                              type="checkbox"
                              checked={!!it.done}
                              onChange={() => toggleItem(l.id, i)}
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
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
