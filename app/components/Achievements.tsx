"use client";

import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
`;
const Item = styled.button<{ $unlocked?: boolean }>`
  background: ${(p) =>
    p.$unlocked ? "linear-gradient(135deg,#ecfccb,#bbf7d0)" : "#f3f4f6"};
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.04);
  cursor: default;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
`;

const bounce = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.14); }
  100% { transform: scale(1); }
`;

const Emoji = styled.div<{ $animate?: boolean }>`
  font-size: 22px;
  animation: ${(p) => (p.$animate ? bounce : "none")} 700ms ease;
`;
const Name = styled.div`
  font-size: 12px;
  font-weight: 700;
`;
const Desc = styled.div`
  font-size: 11px;
  color: ${(p) => p.theme?.colors?.text ?? "#374151"};
`;

type Achievement = {
  id: string;
  name: string;
  emoji?: string;
  description?: string;
  criteria: {
    type: string;
    threshold?: number;
  };
};

export default function Achievements({
  achievements,
  weeklyPct,
  pctToGoal,
  streak,
  weeklyDoorSavings,
}: {
  achievements: Achievement[];
  weeklyPct: number;
  pctToGoal: number;
  streak: number;
  weeklyDoorSavings?: number;
}) {
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [animateId, setAnimateId] = useState<string | null>(null);

  // Vi använder en ref för att hålla koll på "unlocked" inuti effekter
  // utan att skapa oändliga loopar i dependency arrayen.
  const unlockedRef = useRef(unlocked);

  // Synkronisera alltid ref med state
  useEffect(() => {
    unlockedRef.current = unlocked;
  }, [unlocked]);

  // Hydrera från localStorage på klienten efter att vi initialt renderat
  useEffect(() => {
    try {
      const raw = localStorage.getItem("energi_achievements");
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, boolean>;
        // Schedule state updates asynchronously to avoid cascading renders warning
        setTimeout(() => {
          setUnlocked(parsed);
          unlockedRef.current = parsed;
          setHydrated(true);
        }, 0);
        return;
      }
    } catch {}
    // No saved state — mark hydrated on next tick
    setTimeout(() => setHydrated(true), 0);
  }, []);

  // 2. Utvärdera achievements (Körs när mätvärden ändras)
  useEffect(() => {
    if (!hydrated) return;

    // OBS: Vi läser från unlockedRef.current istället för state här
    // för att undvika att effekten körs igen när vi sparar.
    const currentUnlocked = unlockedRef.current;
    const next: Record<string, boolean> = { ...currentUnlocked };

    let changed = false;
    let lastNewId: string | null = null;

    achievements.forEach((a) => {
      if (next[a.id]) return; // Redan upplåst

      const crit = a.criteria;
      let satisfied = false;

      if (crit.type === "weekly_pct")
        satisfied = weeklyPct >= (crit.threshold ?? 0);
      if (crit.type === "streak") satisfied = streak >= (crit.threshold ?? 0);
      if (crit.type === "week_goal")
        satisfied = pctToGoal >= (crit.threshold ?? 0);
      if (crit.type === "door_week_savings")
        satisfied = (weeklyDoorSavings ?? 0) >= (crit.threshold ?? 0);

      if (satisfied) {
        next[a.id] = true;
        lastNewId = a.id;
        changed = true;
      }
    });

    if (changed) {
      // Uppdatera state
      setUnlocked(next);

      // Spara till localStorage
      try {
        localStorage.setItem("energi_achievements", JSON.stringify(next));
      } catch {}

      // Trigga animation
      if (lastNewId) {
        setAnimateId(lastNewId);
        setTimeout(() => setAnimateId(null), 1400);
      }
    }

    // Notera: Vi inkluderar INTE 'unlocked' i dependency arrayen här.
    // Det är nyckeln till att slippa "cascading renders".
  }, [achievements, weeklyPct, streak, pctToGoal, weeklyDoorSavings, hydrated]);

  return (
    <div aria-live="polite">
      <Grid>
        {achievements.map((a) => {
          const isUnlocked = hydrated && !!unlocked[a.id];
          return (
            <Item
              key={a.id}
              $unlocked={isUnlocked}
              aria-pressed={isUnlocked}
              aria-label={`${a.name}: ${a.description} ${
                isUnlocked ? "olåst" : "låst"
              }`}
            >
              <Emoji $animate={animateId === a.id}>{a.emoji}</Emoji>
              <Name>{a.name}</Name>
              <Desc>{a.description}</Desc>
            </Item>
          );
        })}
      </Grid>
    </div>
  );
}
