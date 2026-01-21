"use client";

import { useRouter } from "next/navigation";

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
};

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

const STORAGE_KEY = "fridge:shoppingLists";

export default function RecipeSuggestion() {
  const router = useRouter();

  const recipe: Recipe = {
    id: "omelette",
    name: "Omelett med ost",
    ingredients: ["Ägg", "Ost", "Mjölk", "Smör"],
  };

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

      // Navigate to inköpslista page and open the new list
      router.push(`/inkopslista?id=${id}`);
    } catch (e) {
      console.error("Failed to save shopping list", e);
      alert("Kunde inte spara inköpslistan");
    }
  }

  return (
    <div className="mt-6 bg-white rounded-lg shadow p-4">
      <div className="flex items-start">
        <div className="text-3xl mr-3">🍳</div>
        <div className="flex-1">
          <h3 className="font-semibold text-black">{recipe.name}</h3>
          <p className="text-sm text-black mt-1">
            Förslag: {recipe.ingredients.join(", ")}
          </p>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button
          onClick={addShoppingListFromRecipe}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Lägg till inköpslista
        </button>
        <button
          onClick={() => alert("Visa recept - inte implementerat ännu")}
          className="bg-gray-100 px-4 py-2 rounded"
        >
          Visa recept
        </button>
      </div>
    </div>
  );
}
