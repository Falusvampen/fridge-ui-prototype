import React from "react";
import styled from "styled-components";

const Section = styled.section`
  margin-top: 24px;
`;
const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
`;
const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
  padding: 16px;
`;

export default function WeekMenu({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <Title>Denna veckas matsedel</Title>
      <Card>{children}</Card>
    </Section>
  );
}
