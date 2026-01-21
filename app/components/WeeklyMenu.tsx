import React from "react";
import recipes from "../data/recipes.json";
import RecipeList from "./RecipeList";
import styled from "styled-components";
import Section from "./Section";

const Card = styled.div``;

export default function WeeklyMenu() {
  return (
    <Section title="Veckans matsedel">
      <Card>
        <RecipeList initialRecipes={recipes} />
      </Card>
    </Section>
  );
}
