"use client";

import React from "react";
import { useRouter } from "next/navigation";
import recipes from "../data/recipes.json";
import styled from "styled-components";

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

const Card = styled.div`
  margin-top: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.06);
  padding: 16px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
`;
const Emoji = styled.div`
  font-size: 1.75rem;
  margin-right: 12px;
`;
const Title = styled.div`
  flex: 1;
`;
const Heading = styled.h3`
  font-weight: 600;
  margin: 0;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
`;
const Meta = styled.p`
  font-size: 14px;
  margin-top: 6px;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
`;
const Actions = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
`;
const Primary = styled.button`
  background: ${(p) => p.theme?.colors?.primary ?? "#2563eb"};
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  &:hover {
    background: ${(p) => p.theme?.colors?.primaryHover ?? "#3b82f6"};
  }
`;
const Secondary = styled.button`
  background: ${(p) => p.theme?.colors?.gray100 ?? "#f3f4f6"};
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

export default function RecipeSuggestion() {
  const router = useRouter();

  const recipe: Recipe =
    Array.isArray(recipes) && recipes.length > 0
      ? (recipes[0] as Recipe)
      : { id: "none", name: "Inget recept", ingredients: [] };

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
    <Card>
      <TopRow>
        <Emoji>{recipe.emoji ?? "🍽️"}</Emoji>
        <Title>
          <Heading>{recipe.name}</Heading>
          <Meta>Förslag: {recipe.ingredients.join(", ")}</Meta>
        </Title>
      </TopRow>

      <Actions>
        <Primary onClick={addShoppingListFromRecipe}>
          Lägg till inköpslista
        </Primary>
        <Secondary
          onClick={() => alert("Visa recept - inte implementerat ännu")}
        >
          Visa recept
        </Secondary>
      </Actions>
    </Card>
  );
}
