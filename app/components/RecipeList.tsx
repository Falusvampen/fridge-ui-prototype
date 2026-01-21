"use client";

import React from "react";
import RecipeCard from "./RecipeCard";

const recipes = [
  {
    id: "omelette",
    name: "Omelett med ost",
    ingredients: ["Ägg", "Ost", "Mjölk", "Smör"],
    emoji: "🍳",
  },
  {
    id: "pasta-tomat",
    name: "Pasta med tomatsås",
    ingredients: ["Pasta", "Tomatsås", "Ost"],
    emoji: "🍝",
  },
  {
    id: "gronsallad",
    name: "Grönsallad med avokado",
    ingredients: ["Sallad", "Avokado", "Tomat", "Olivolja"],
    emoji: "🥗",
  },
  {
    id: "smoothie",
    name: "Banan-smoothie",
    ingredients: ["Banan", "Mjölk", "Yoghurt", "Honung"],
    emoji: "🥤",
  },
];

export default function RecipeList() {
  return (
    <div className="grid gap-3">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
