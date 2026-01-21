"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FridgeItem } from "../types/fridge";
import Section from "./Section";
import styled from "styled-components";
import DangerButton from "./DangerButton";
import ConfirmDialog from "./ConfirmDialog";
import Tooltip from "./Tooltip";

const CATEGORY_STYLES: Record<
  string,
  { bg: string; avatarBg: string; daysColor: string }
> = {
  Mejeri: { bg: "#eff6ff", avatarBg: "#bfdbfe", daysColor: "#2563eb" },
  Skafferi: { bg: "#fffbeb", avatarBg: "#fef3c7", daysColor: "#d97706" },
  Grönsaker: { bg: "#f0fdf4", avatarBg: "#bbf7d0", daysColor: "#16a34a" },
  Övrigt: { bg: "#ffffff", avatarBg: "#eeeeee", daysColor: "#6b7280" },
};

// Helpers to interpolate colors between a fresh color and red based on days remaining
function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}
function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((c) => {
        const s = Math.round(c).toString(16);
        return s.length === 1 ? "0" + s : s;
      })
      .join("")
  );
}
function mixColors(hexA: string, hexB: string, t: number) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex(
    a.r + (b.r - a.r) * t,
    a.g + (b.g - a.g) * t,
    a.b + (b.b - a.b) * t,
  );
}

function getExpiryColor(daysRemaining: number) {
  // three-way endpoints for better visual cue: green -> yellow -> red
  const red = "#b91c1c"; // richer red
  const yellow = "#dfd43b"; // amber/yellow
  const green = "#22c55e"; // brighter green

  // Expired items are red
  if (daysRemaining < 0) return red;

  const maxFreshDays = 14; // 14 days or more considered fully fresh
  const n = Math.max(0, Math.min(1, daysRemaining / maxFreshDays));
  // easing so color shift is more visible earlier
  const t = Math.sqrt(n);

  // t in [0,1], map 0 -> red, 0.5 -> yellow, 1 -> green
  if (t <= 0.5) {
    const s = t / 0.5; // 0..1 between red and yellow
    return mixColors(red, yellow, s);
  }
  const s = (t - 0.5) / 0.5; // 0..1 between yellow and green
  return mixColors(yellow, green, s);
}

const List = styled.div`
  display: grid;
  gap: 14px;
`;

const Item = styled.div<{ $bg: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  border-radius: 12px;
  background: ${(p) => p.$bg};
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 6px 18px rgba(12, 12, 12, 0.04);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease;
  will-change: transform;

  //   &:hover {
  //     transform: translateY(-4px);
  //     box-shadow: 0 12px 28px rgba(12, 12, 12, 0.08);
  //   }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div<{ $avatarBg: string }>`
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.$avatarBg};
  font-size: 18px;
  box-shadow: 0 2px 6px rgba(12, 12, 12, 0.04);
`;

const Meta = styled.div``;

const Name = styled.div`
  font-weight: 700;
  font-size: 15px;
`;

const Expiry = styled.div`
  font-size: 12px;
  color: rgba(17, 24, 39, 0.6);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Days = styled.div<{ $color: string }>`
  font-size: 12px;
  color: ${(p) => p.$color};
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 10px;
  letter-spacing: 0.2px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  background: ${(p) =>
    `rgba(${hexToRgb(p.$color).r}, ${hexToRgb(p.$color).g}, ${hexToRgb(p.$color).b}, 0.12)`};
  border: ${(p) =>
    `1px solid rgba(${hexToRgb(p.$color).r}, ${hexToRgb(p.$color).g}, ${hexToRgb(p.$color).b}, 0.22)`};
  transition:
    background 160ms ease,
    color 160ms ease,
    transform 160ms ease;
`;

const SummaryGrid = styled.div`
  display: flex;
  gap: 8px;
`;

const SummaryBox = styled.div<{ $bg?: string; $color?: string }>`
  flex: 1;
  background: ${(p) => p.$bg || "transparent"};
  padding: 12px;
  border-radius: 8px;
  text-align: center;
`;

export default function FridgeList({
  initialItems,
}: {
  initialItems: FridgeItem[];
}) {
  const [items, setItems] = useState<FridgeItem[]>(initialItems || []);

  const [loading, setLoading] = useState(true);

  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    index: number | null;
    name?: string;
  }>({
    open: false,
    index: null,
  });

  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    // Keep a short-lived timestamp to update daysRemaining every minute
    const id = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Prefer persisted fridge state from localStorage, otherwise use server-provided initialItems
    let mounted = true;
    try {
      const raw = localStorage.getItem("fridge:data");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (mounted && Array.isArray(parsed)) setItems(parsed);
      } else {
        // Use initialItems (injected from the server) instead of fetching the same JSON again
        if (mounted) setItems(initialItems || []);
      }
    } catch (e) {
      // If localStorage access fails, fall back to initialItems
      if (mounted) setItems(initialItems || []);
    } finally {
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [initialItems]);

  // compute daysRemaining and derive category style for presentation
  const itemsWithDays = useMemo(() => {
    return items.map((it) => {
      const daysRemaining = Math.ceil(
        (new Date(it.expiry).getTime() - now) / (1000 * 60 * 60 * 24),
      );
      const style =
        CATEGORY_STYLES[it.category || "Övrigt"] || CATEGORY_STYLES["Övrigt"];
      return { ...it, daysRemaining, style } as FridgeItem & {
        daysRemaining: number;
        style: { bg: string; avatarBg: string; daysColor: string };
      };
    });
  }, [items, now]);

  async function persist(newItems: FridgeItem[]) {
    try {
      // Persist locally in the browser for the static-export friendly app
      localStorage.setItem("fridge:data", JSON.stringify(newItems));
    } catch (e) {
      console.error(e);
    }
  }

  function removeItem(index: number) {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    persist(newItems);
  }

  // Summary calculations
  const expired = itemsWithDays.filter((i) => i.daysRemaining < 0).length;
  const expiringSoon = itemsWithDays.filter(
    (i) => i.daysRemaining >= 0 && i.daysRemaining <= 5,
  ).length;
  const fresh = itemsWithDays.length - expired - expiringSoon;

  return (
    <div>
      <Section title="Kylskåpet">
        {loading ? (
          <div>Loading…</div>
        ) : (
          <List>
            {itemsWithDays.map((it, idx) => {
              const color = getExpiryColor(it.daysRemaining);
              return (
                <Item key={it.name + idx} $bg={it.style.bg}>
                  <Left>
                    <Avatar $avatarBg={it.style.avatarBg}>{it.icon}</Avatar>
                    <Meta>
                      <Name>{it.name}</Name>
                      <Expiry>Utgår: {it.expiry}</Expiry>
                    </Meta>
                  </Left>
                  <Actions>
                    <Days $color={color}>
                      {it.daysRemaining < 0
                        ? "Utgått"
                        : `${it.daysRemaining} dagar`}
                    </Days>
                    <Tooltip text={`Radera ${it.name}`}>
                      <DangerButton
                        $iconOnly
                        aria-label={`Radera ${it.name}`}
                        onClick={() =>
                          setConfirmState({
                            open: true,
                            index: idx,
                            name: it.name,
                          })
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <path d="M3 6h18v2H3V6zm2 3h14l-1.2 11.3A2 2 0 0 1 15.8 22H8.2a2 2 0 0 1-1.99-1.7L5 9zm3-5h8l1 1H7l1-1z" />
                        </svg>
                      </DangerButton>
                    </Tooltip>
                  </Actions>
                </Item>
              );
            })}
          </List>
        )}
      </Section>

      <Section title="Sammanfattning">
        <p style={{ marginBottom: 16 }}>
          Du har {itemsWithDays.length} produkter i kylskåpet.{" "}
          {expiringSoon === 1
            ? "1 produkt utgår snart."
            : `${expiringSoon} produkter utgår snart.`}
        </p>
        <SummaryGrid>
          <SummaryBox $bg="#dcfce7" $color="#16a34a">
            <div style={{ fontSize: 20, fontWeight: 700, color: "#16a34a" }}>
              {fresh}
            </div>
            <div style={{ fontSize: 12 }}>Färska</div>
          </SummaryBox>
          <SummaryBox $bg="#fffbeb" $color="#d97706">
            <div style={{ fontSize: 20, fontWeight: 700, color: "#d97706" }}>
              {expiringSoon}
            </div>
            <div style={{ fontSize: 12 }}>Utgår snart</div>
          </SummaryBox>
          <SummaryBox $bg="#fee2e2" $color="#dc2626">
            <div style={{ fontSize: 20, fontWeight: 700, color: "#dc2626" }}>
              {expired}
            </div>
            <div style={{ fontSize: 12 }}>Utgångna</div>
          </SummaryBox>
        </SummaryGrid>
      </Section>

      <ConfirmDialog
        embedded
        open={confirmState.open}
        title={
          confirmState.name ? `Radera ${confirmState.name}?` : "Radera produkt?"
        }
        description={
          confirmState.name
            ? `Vill du radera ${confirmState.name}? Detta går inte att ångra.`
            : undefined
        }
        onCancel={() => setConfirmState({ open: false, index: null })}
        onConfirm={() => {
          if (confirmState.index !== null) {
            removeItem(confirmState.index);
          }
          setConfirmState({ open: false, index: null });
        }}
      />
    </div>
  );
}
