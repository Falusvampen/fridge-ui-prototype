import styled from "styled-components";

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
const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
  padding: 24px;
`;
const Small = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
`;
const Stat = styled.div<{ $bg?: string }>`
  background: ${(p) => p.$bg || "transparent"};
  padding: 12px;
  border-radius: 12px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export default function Energi() {
  return (
    <Page>
      <Container>
        <Heading>Energi</Heading>
        <Card>
          <div style={{ marginBottom: 12 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Energiförbrukning
            </h2>
            <Small>Övervaka kylskåpets energiförbrukning.</Small>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <Stat $bg="#eff6ff">
              <div style={{ fontSize: 13 }}>Idag</div>
              <StatValue style={{ color: "#2563eb" }}>0.8 kWh</StatValue>
            </Stat>
            <Stat $bg="#ecfdf5">
              <div style={{ fontSize: 13 }}>Denna vecka</div>
              <StatValue style={{ color: "#16a34a" }}>5.2 kWh</StatValue>
            </Stat>
            <Stat $bg="#f5f3ff">
              <div style={{ fontSize: 13 }}>Denna månad</div>
              <StatValue style={{ color: "#7c3aed" }}>21.5 kWh</StatValue>
            </Stat>
          </div>
        </Card>
      </Container>
    </Page>
  );
}
