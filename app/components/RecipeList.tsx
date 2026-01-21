"use client";

import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  emoji?: string;
};

const Grid = styled.div`
  display: grid;
  gap: 12px;
`;

export default function RecipeList({
  initialRecipes,
}: {
  initialRecipes?: Recipe[];
}) {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes || []);

  useEffect(() => {
    let mounted = true;
    fetch("/api/recipes")
      .then((r) => r.json())
      .then((data) => {
        if (mounted && Array.isArray(data)) setRecipes(data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Grid>
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </Grid>
  );
}
