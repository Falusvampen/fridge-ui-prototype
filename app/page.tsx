import FridgeList from "./components/FridgeList";
import type { FridgeItem } from "./types/fridge";
import styled from "styled-components";
import fridgeData from "./data/fridge.json";
import recipes from "./data/recipes.json";
import RecipeList from "./components/RecipeList";

const Page = styled.div`
  min-height: 100vh;
  background: var(--color-gray-50, #f8fafc);
  padding: 16px 16px 80px;
`;
const Container = styled.div`
  max-width: 420px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
`;

export default function Home() {
  return (
    <Page>
      <Container>
        <Heading>Hem</Heading>

        <FridgeList initialItems={fridgeData as FridgeItem[]} />

        {/* Recipe suggestion */}
        <RecipeList initialRecipes={recipes} />
      </Container>
    </Page>
  );
}
