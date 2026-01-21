"use client";

import React from "react";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";

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

const Grid = styled.div`
  display: grid;
  gap: 12px;
`;

export default function RecipeList() {
  return (
    <Grid>
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </Grid>
  );
}
