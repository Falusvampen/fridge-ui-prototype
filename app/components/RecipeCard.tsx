"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Tooltip, { Badge as TooltipBadge } from "./Tooltip";

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  emoji?: string;
};

type FridgeItem = {
  id?: string;
  name: string;
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

const PrimaryButton = styled.button<{ $added?: boolean }>`
  background: ${(p) =>
    p.$added
      ? "var(--color-success, #16a34a)"
      : (p.theme?.colors?.primary ?? "#2563eb")};
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.12);
  transition:
    transform 120ms ease,
    box-shadow 120ms ease,
    background 120ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(37, 99, 235, 0.12);
    background: ${(p) => p.theme?.colors?.primaryHover ?? "#3b82f6"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
  padding: 8px 12px;
  border: 1px solid ${(p) => p.theme?.colors?.gray100 ?? "#e5e7eb"};
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  transition:
    background 120ms ease,
    transform 120ms ease,
    border-color 120ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    transform: translateY(-1px);
  }
`;

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  const [missingCount, setMissingCount] = useState<number | null>(null);
  const [missingIngredients, setMissingIngredients] = useState<string[] | null>(
    null,
  );
  const [isAdded, setIsAdded] = useState(false);
  const [existingListId, setExistingListId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    function computeFromFridgeData(data: unknown) {
      if (!mounted || !Array.isArray(data)) return;
      const fridgeNames = new Set(
        (data as FridgeItem[]).map((f) => String(f.name).toLowerCase().trim()),
      );
      const missing = recipe.ingredients.filter(
        (ing) => !fridgeNames.has(ing.toLowerCase().trim()),
      );
      setMissingIngredients(missing);
      setMissingCount(missing.length);

      // Check localStorage for an existing shopping list matching this recipe (by name or items)
      try {
        const rawLists = localStorage.getItem(STORAGE_KEY);
        if (rawLists) {
          type StoredList = {
            id?: string;
            name?: string;
            items?: { text: string }[];
          };
          const lists = JSON.parse(rawLists) as StoredList[];
          const normalizedMissing = missing
            .map((s) => s.toLowerCase().trim())
            .sort()
            .join("|");
          const match = lists.find((l) => {
            if (l.name === `Inköpslista: ${recipe.name}`) return true;
            if (Array.isArray(l.items)) {
              const itemsNorm = l.items
                .map((it) => String(it.text).toLowerCase().trim())
                .sort()
                .join("|");
              return itemsNorm === normalizedMissing;
            }
            return false;
          });
          if (match) {
            setIsAdded(true);
            setExistingListId(match.id ?? null);
          } else {
            setIsAdded(false);
            setExistingListId(null);
          }
        } else {
          setIsAdded(false);
          setExistingListId(null);
        }
      } catch {
        setIsAdded(false);
        setExistingListId(null);
      }
    }

    try {
      const raw = localStorage.getItem("fridge:data");
      if (raw) {
        computeFromFridgeData(JSON.parse(raw));
      } else {
        fetch("data/fridge.json")
          .then((r) => r.json())
          .then((data) => computeFromFridgeData(data))
          .catch(() => {
            setMissingCount(null);
            setMissingIngredients(null);
          });
      }
    } catch {
      fetch("data/fridge.json")
        .then((r) => r.json())
        .then((data) => computeFromFridgeData(data))
        .catch(() => {
          setMissingCount(null);
          setMissingIngredients(null);
        });
    }

    return () => {
      mounted = false;
    };
  }, [recipe.ingredients, recipe.name]);

  async function addShoppingListFromRecipe() {
    try {
      // If this recipe is already added, open the existing list
      if (isAdded && existingListId) {
        router.push(`/inkopslista?id=${existingListId}`);
        return;
      }

      // Use precomputed missing ingredients if available, otherwise fetch once
      let missing = missingIngredients;
      if (missing === null) {
        // try local storage first
        try {
          const raw = localStorage.getItem("fridge:data");
          if (raw) {
            const data = JSON.parse(raw);
            const fridgeNames = new Set(
              (data as FridgeItem[]).map((f) =>
                String(f.name).toLowerCase().trim(),
              ),
            );
            missing = recipe.ingredients.filter(
              (ing) => !fridgeNames.has(ing.toLowerCase().trim()),
            );
          } else {
            const res = await fetch("data/fridge.json");
            const data = await res.json();
            const fridgeNames = new Set(
              (data as FridgeItem[]).map((f) =>
                String(f.name).toLowerCase().trim(),
              ),
            );
            missing = recipe.ingredients.filter(
              (ing) => !fridgeNames.has(ing.toLowerCase().trim()),
            );
          }
        } catch {
          const res = await fetch("data/fridge.json");
          const data = await res.json();
          const fridgeNames = new Set(
            (data as FridgeItem[]).map((f) =>
              String(f.name).toLowerCase().trim(),
            ),
          );
          missing = recipe.ingredients.filter(
            (ing) => !fridgeNames.has(ing.toLowerCase().trim()),
          );
        }
      }

      if (!missing || missing.length === 0) {
        alert("Alla ingredienser finns redan i kylskåpet");
        return;
      }

      const id = makeId();
      const list = {
        id,
        name: `Inköpslista: ${recipe.name}`,
        items: missing.map((i) => ({ text: i, done: false })),
        createdAt: new Date().toISOString(),
      };

      const raw = localStorage.getItem(STORAGE_KEY);
      const lists = raw ? JSON.parse(raw) : [];
      lists.unshift(list);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));

      // mark as added and store the id so the button can open it later (do not redirect automatically)
      setIsAdded(true);
      setExistingListId(id);
    } catch (err) {
      console.error("Failed to save shopping list", err);
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
            <Meta>
              {recipe.ingredients.length} ingredienser
              {typeof missingCount === "number" && (
                <Tooltip
                  text={
                    missingIngredients === null
                      ? "Uppdaterar..."
                      : missingIngredients.length === 0
                        ? "Inga saknade ingredienser"
                        : missingIngredients.join(", ")
                  }
                  ariaLabel={
                    Array.isArray(missingIngredients) &&
                    missingIngredients.length > 0
                      ? `Saknas: ${missingIngredients.join(", ")}`
                      : undefined
                  }
                >
                  <TooltipBadge
                    $color={
                      missingCount === 0
                        ? "var(--color-success, #16a34a)"
                        : "var(--color-warning, #d97706)"
                    }
                  >
                    {missingCount === 0
                      ? "Alla finns"
                      : `${missingCount} saknas`}
                  </TooltipBadge>
                </Tooltip>
              )}
            </Meta>
          </Header>
          <IngredientsText>{recipe.ingredients.join(", ")}</IngredientsText>
        </TitleRow>
      </TopRow>

      <ButtonRow>
        <PrimaryButton
          $added={isAdded}
          onClick={() => {
            if (isAdded && existingListId) {
              router.push(`/inkopslista?id=${existingListId}`);
            } else {
              addShoppingListFromRecipe();
            }
          }}
        >
          {isAdded ? "✅ Öppna inköpslista" : "Lägg till inköpslista"}
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
