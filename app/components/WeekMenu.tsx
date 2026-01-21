import React from "react";
import styled from "styled-components";
import Section from "./Section";

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
  padding: 16px;
`;

export default function WeekMenu({ children }: { children: React.ReactNode }) {
  return (
    <Section title="Denna veckas matsedel">
      <Card>{children}</Card>
    </Section>
  );
}
