import styled from "styled-components";
import Section from "../components/Section";
import Sparkline from "../components/Sparkline";
import ComparisonCard from "../components/ComparisonCard";
import energiData from "../data/energi.json";
import AnimatedNumber from "../components/AnimatedNumber";
import Achievements from "../components/Achievements";

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

const Small = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme?.colors?.text ?? "var(--color-muted, #6b7280)"};
`;
const StatRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
`;
const BigStat = styled.div`
  background: var(--color-primary-50, #eff6ff);
  border-radius: 12px;
  padding: 14px;
`;
const BigValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: var(--color-primary, #2563eb);
`;
const Badge = styled.div`
  display: inline-block;
  background: linear-gradient(
    90deg,
    var(--color-warning-light, #fef3c7),
    var(--color-warning-alt, #fde68a)
  );
  color: var(--color-warning-alt, #92400e);
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 13px;
`;
const ProgressBar = styled.div`
  background: var(--color-gray-200, #e6e6e6);
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  margin-top: 8px;
`;
const Progress = styled.div<{ $pct: number }>`
  width: ${(p) => p.$pct}%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-success, #34d399),
    var(--color-success-alt, #10b981)
  );
  transition: width 700ms ease;
`;

export default function Energi() {
  // Data from data/energi.json
  const daily = energiData.daily;
  const today = daily[daily.length - 1];
  const yesterday = daily[daily.length - 2] ?? daily[0];
  const weekTotal = Math.round(daily.reduce((a, b) => a + b, 0) * 10) / 10;
  const prevWeekTotal = energiData.prevWeekTotal;
  const goal = energiData.goal;
  const streak = energiData.streak;
  const achievementsDef = energiData.achievements;
  const pctToGoal = Math.min(100, Math.round((weekTotal / goal) * 100));

  const weeklyImproved = weekTotal <= prevWeekTotal;
  const weeklyPct = prevWeekTotal
    ? Math.round(((prevWeekTotal - weekTotal) / prevWeekTotal) * 100)
    : 0;

  // Door usage data
  const counts: number[] = energiData.dailyOpenCounts ?? [];
  const durations: number[] = energiData.dailyOpenMinutes ?? [];
  const normalAvgCount =
    energiData.normalAvgCount ??
    Math.round((counts.reduce((a, b) => a + b, 0) || 0) / (counts.length || 1));
  const normalAvgDuration =
    energiData.normalAvgDuration ??
    Math.round(
      (durations.reduce((a, b) => a + b, 0) || 0) / (durations.length || 1),
    );
  const kWhPerMinuteDoorOpen = energiData.kWhPerMinuteDoorOpen ?? 0.02;
  const todayCount = counts[counts.length - 1] ?? 0;
  const todayDuration = durations[durations.length - 1] ?? 0;

  const dailySavingsKWh = Math.max(
    0,
    (normalAvgDuration - todayDuration) * kWhPerMinuteDoorOpen,
  );
  const weeklyNormalMinutes = normalAvgDuration * 7;
  const weeklyMinutes = durations.reduce((a, b) => a + b, 0);
  const weeklySavingsKWh = Math.max(
    0,
    (weeklyNormalMinutes - weeklyMinutes) * kWhPerMinuteDoorOpen,
  );

  return (
    <Page>
      <Container>
        <Heading>Energi ⚡️</Heading>

        <Section title="Översikt">
          <Small>
            Se din användning, jämför mot tidigare perioder och få peppande
            feedback!
          </Small>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 12,
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--color-muted, #6b7280)",
                    }}
                  >
                    Idag
                  </div>
                  <BigValue aria-live="polite">
                    <AnimatedNumber value={today} />{" "}
                    <span style={{ fontSize: 12 }}>kWh</span>
                  </BigValue>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Badge>Energi-hjälte ✨</Badge>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--color-muted, #6b7280)",
                      marginTop: 8,
                    }}
                  >
                    {weeklyImproved
                      ? `Bra jobbat! ${weeklyPct}% bättre än förra veckan`
                      : `Fortsätt — du kan spara mer!`}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <Sparkline data={daily} width={300} height={64} />
              </div>
            </div>
          </div>

          <StatRow>
            <BigStat>
              <div
                style={{ fontSize: 13, color: "var(--color-muted, #6b7280)" }}
              >
                Denna vecka
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, marginTop: 6 }}>
                {weekTotal} kWh
              </div>
              <div
                role="progressbar"
                aria-valuenow={pctToGoal}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ marginTop: 8 }}
              >
                <ProgressBar>
                  <Progress $pct={pctToGoal} />
                </ProgressBar>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--color-muted, #6b7280)",
                    marginTop: 8,
                  }}
                >
                  {pctToGoal}% av veckans mål
                </div>
              </div>
            </BigStat>

            <BigStat
              style={{ background: "var(--color-success-light, #ecfdf5)" }}
            >
              <div
                style={{ fontSize: 13, color: "var(--color-muted, #6b7280)" }}
              >
                Denna månad
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, marginTop: 6 }}>
                {Math.round(weekTotal * 4 * 10) / 10} kWh
              </div>
            </BigStat>
          </StatRow>
        </Section>

        <div style={{ height: 12 }} />

        {/* <div style={{ display: "grid", gap: 10 }}> */}
        <div style={{ display: "none" }}>
          <Section title="Jämförelser">
            <ComparisonCard
              label="Idag vs Igår"
              current={today}
              previous={yesterday}
              data={[yesterday, today]}
            />
            <ComparisonCard
              label="Denna vecka vs Förra vecka"
              current={weekTotal}
              previous={prevWeekTotal}
              data={[prevWeekTotal, weekTotal]}
              unit="kWh"
            />
          </Section>
        </div>

        <div style={{ height: 12 }} />

        <Section title="Dörranvändning">
          <div style={{ display: "grid", gap: 10 }}>
            {/* <div style={{ display: "none" }}> */}
            <Small>
              Se hur ofta och hur länge dörren varit öppen — och hur det
              påverkar energin.
            </Small>

            <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
              <ComparisonCard
                label="Öppningar/dag"
                current={todayCount}
                previous={normalAvgCount}
                data={counts.length ? counts : [normalAvgCount, todayCount]}
                unit="ggr"
              />
              <ComparisonCard
                label="Tid öppen (min/dag)"
                current={todayDuration}
                previous={normalAvgDuration}
                data={
                  durations.length
                    ? durations
                    : [normalAvgDuration, todayDuration]
                }
                unit="min"
              />
            </div>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{ fontSize: 13, color: "var(--color-muted, #6b7280)" }}
                >
                  Estimerad besparing idag
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, marginTop: 6 }}>
                  <AnimatedNumber value={Number(dailySavingsKWh.toFixed(2))} />{" "}
                  <span style={{ fontSize: 12 }}>kWh</span>
                </div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
                  Denna vecka:{" "}
                  <strong>
                    <AnimatedNumber
                      value={Number(weeklySavingsKWh.toFixed(2))}
                    />{" "}
                    kWh
                  </strong>{" "}
                  sparat jämfört med normal
                </div>
              </div>
              <div style={{ width: 120 }}>
                <Sparkline
                  data={(durations.length
                    ? durations
                    : [normalAvgDuration, todayDuration]
                  ).map((d) => d)}
                  width={120}
                  height={64}
                  stroke="var(--color-warning-alt, #f59e0b)"
                  fill="rgba(245,158,11,0.08)"
                />
              </div>
            </div>
          </div>
        </Section>

        <div style={{ height: 12 }} />

        <Section title="Belöningar & tips">
          <Small>Små belöningar för smarta val 💪</Small>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 12,
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>Sparstreak</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>
                {streak} dagar i rad — Fortsätt så!
              </div>
            </div>
            <div
              style={{
                width: 120,
                borderRadius: 12,
                padding: 10,
                background:
                  weeklySavingsKWh >=
                  (achievementsDef.find((a) => a.id === "door-saver")?.criteria
                    ?.threshold ?? 0)
                    ? "linear-gradient(135deg,var(--color-success-light, #ecfccb),var(--color-success, #bbf7d0))"
                    : "var(--color-gray-200, #f3f4f6)",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: 20 }}>
                {achievementsDef.find((a) => a.id === "door-saver")?.emoji ??
                  "🚪"}
              </div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>
                {achievementsDef.find((a) => a.id === "door-saver")?.name ??
                  "Dörr-sparare"}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                {weeklySavingsKWh.toFixed(2)} kWh denna vecka
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 700 }}>Tips</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>
              Ställ temperaturen 1°C lägre för att spara upp till 5% energi utan
              att maten påverkas.
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <Achievements
              achievements={achievementsDef}
              weeklyPct={weeklyPct}
              pctToGoal={pctToGoal}
              streak={streak}
              weeklyDoorSavings={weeklySavingsKWh}
            />
          </div>
        </Section>
      </Container>
    </Page>
  );
}
