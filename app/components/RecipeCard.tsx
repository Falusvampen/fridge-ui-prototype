"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  emoji?: string;
};

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

const STORAGE_KEY = "fridge:shoppingLists";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  function addShoppingListFromRecipe() {
    const id = makeId();
    const list = {
      id,
      name: `Inköpslista: ${recipe.name}`,
      items: recipe.ingredients.map((i) => ({ text: i, done: false })),
      createdAt: new Date().toISOString(),
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const lists = raw ? JSON.parse(raw) : [];
      lists.unshift(list);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));

      router.push(`/inkopslista?id=${id}`);
    } catch (e) {
      console.error("Failed to save shopping list", e);
      alert("Kunde inte spara inköpslistan");
    }
  }

  return (
    <div className="p-3 border border-gray-100 rounded-md shadow-sm">
      <div className="flex items-start">
        <div className="text-3xl mr-3">{recipe.emoji ?? "🍽️"}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-black">{recipe.name}</h3>
            <div className="text-xs text-black">
              {recipe.ingredients.length} ingredienser
            </div>
          </div>
          <div className="text-sm text-black mt-1">
            {recipe.ingredients.join(", ")}
          </div>
        </div>
      </div>

      <div className="mt-3 flex space-x-2">
        <button
          onClick={addShoppingListFromRecipe}
          className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-500"
        >
          Lägg till inköpslista
        </button>
        <button
          onClick={() => alert("Visa recept - inte implementerat ännu")}
          className="bg-gray-100 px-3 py-1.5 rounded text-sm"
        >
          Visa recept
        </button>
      </div>
    </div>
  );
}
