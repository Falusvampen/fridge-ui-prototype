"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
  padding: 12px;
  border: 1px solid ${(p) => p.theme?.colors?.gray100 ?? "#f3f4f6"};
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Emoji = styled.div`
  font-size: 1.5rem;
  margin-right: 12px;
`;

const TitleRow = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: 600;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
  margin: 0;
`;

const Meta = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
`;

const IngredientsText = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
  margin-top: 6px;
`;

const ButtonRow = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
`;

const PrimaryButton = styled.button`
  background: ${(p) => p.theme?.colors?.primary ?? "#2563eb"};
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: ${(p) => p.theme?.colors?.primaryHover ?? "#3b82f6"};
  }
`;

const SecondaryButton = styled.button`
  background: ${(p) => p.theme?.colors?.gray100 ?? "#f3f4f6"};
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
`;

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
    <Card>
      <TopRow>
        <Emoji>{recipe.emoji ?? "🍽️"}</Emoji>
        <TitleRow>
          <Header>
            <Name>{recipe.name}</Name>
            <Meta>{recipe.ingredients.length} ingredienser</Meta>
          </Header>
          <IngredientsText>{recipe.ingredients.join(", ")}</IngredientsText>
        </TitleRow>
      </TopRow>

      <ButtonRow>
        <PrimaryButton onClick={addShoppingListFromRecipe}>
          Lägg till inköpslista
        </PrimaryButton>
        <SecondaryButton
          onClick={() => alert("Visa recept - inte implementerat ännu")}
        >
          Visa recept
        </SecondaryButton>
      </ButtonRow>
    </Card>
  );
}
