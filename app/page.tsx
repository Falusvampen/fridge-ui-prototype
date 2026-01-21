import WeeklyMenu from "./components/WeeklyMenu";
import FridgeList from "./components/FridgeList";
import type { FridgeItem } from "./types/fridge";
import styled from "styled-components";
import fridgeData from "./data/fridge.json";

const Page = styled.div`
  min-height: 100vh;
  background: #f8fafc;
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
        <Heading>Innehåll</Heading>

        <FridgeList initialItems={fridgeData as FridgeItem[]} />

        {/* Recipe suggestion */}
        <WeeklyMenu />
      </Container>
    </Page>
  );
}
