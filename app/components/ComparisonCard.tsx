import React from "react";
import styled from "styled-components";
import Sparkline from "./Sparkline";

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 6px 16px rgba(2, 6, 23, 0.04);
  display: flex;
  gap: 12px;
  align-items: center;
`;
const Column = styled.div`
  flex: 1;
`;
const Label = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme?.colors?.text ?? "var(--color-muted, #6b7280)"};
`;
const Value = styled.div<{ $good?: boolean }>`
  font-weight: 700;
  font-size: 18px;
  color: ${(p) =>
    p.$good ? "var(--color-success, #16a34a)" : "var(--color-text, #111827)"};
`;
const Change = styled.div<{ $good?: boolean }>`
  font-size: 13px;
  color: ${(p) =>
    p.$good ? "var(--color-success, #16a34a)" : "var(--color-danger, #ef4444)"};
`;

export default function ComparisonCard({
  label,
  current,
  previous,
  unit = "kWh",
  data = [],
}: {
  label: string;
  current: number;
  previous: number;
  unit?: string;
  data?: number[];
}) {
  const diff = current - previous;
  const pct = previous === 0 ? 0 : Math.round((diff / previous) * 100);
  const good = diff <= 0; // less or equal is good - you used less energy

  return (
    <Card>
      <Column>
        <Label>{label}</Label>
        <Value $good={good}>
          {current} {unit}
        </Value>
        <Change $good={good}>
          {good ? `🎉 ${Math.abs(pct)}% sparat` : `⚠️ +${Math.abs(pct)}%`}
        </Change>
      </Column>
      <div style={{ width: 120 }}>
        <Sparkline
          data={data.length ? data : [previous, current]}
          width={120}
          height={40}
          stroke={
            good
              ? "var(--color-success, #16a34a)"
              : "var(--color-danger, #ef4444)"
          }
          fill={good ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.06)"}
        />
      </div>
    </Card>
  );
}
