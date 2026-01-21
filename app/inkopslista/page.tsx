"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Section from "../components/Section";
import DangerButton from "../components/DangerButton";
import ConfirmDialog from "../components/ConfirmDialog";

type Item = { text: string; done?: boolean };
type List = { id: string; name: string; items: Item[]; createdAt: string };

const STORAGE_KEY = "fridge:shoppingLists";

const Page = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 16px 16px 80px;
`;
const Container = styled.div`
  max-width: 420px;
  margin: 0 auto;
`;
const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;
const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
`;
const Count = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
`;
const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
  padding: 16px;
`;
const ListCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
  overflow: hidden;
`;
const HeaderRow = styled.div`
  width: 100%;
  text-align: left;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Meta = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
`;
const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: white;
  border-radius: 8px;
`;

export default function Inkopslista() {
  const [lists, setLists] = useState<List[]>([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setLists(raw ? (JSON.parse(raw) as List[]) : []);
    } catch (e) {
      console.error("Failed to load lists", e);
      setLists([]);
    }
  }, []);

  const [expanded, setExpanded] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: string | null;
    name?: string;
  }>({ open: false, id: null });

  function updateLists(updated: List[]) {
    setLists(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save lists", e);
    }
  }

  function toggleItem(listId: string, index: number) {
    const updated = lists.map((l) => {
      if (l.id !== listId) return l;
      const newItems = l.items.map((it, i) =>
        i === index ? { ...it, done: !it.done } : it,
      );
      return { ...l, items: newItems };
    });
    updateLists(updated);
  }

  function removeList(id: string) {
    const updated = lists.filter((l) => l.id !== id);
    updateLists(updated);
    setExpanded((prev) => prev.filter((x) => x !== id));
  }

  function toggleExpand(id: string) {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <Page>
      <Container>
        <TopBar>
          <Title>Inköpslist{lists.length !== 1 ? "or" : "a"}</Title>
          <Count>
            {lists.length} list{lists.length !== 1 ? "or" : "a"}
          </Count>
        </TopBar>

        <Section title="Sparade listor">
          <div style={{ display: "grid", gap: 12 }}>
            {lists.length === 0 ? (
              <Card>
                <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>
                  Ingen inköpslista ännu — lägg till en från Innehåll.
                </p>
              </Card>
            ) : (
              lists.map((l) => {
                const isOpen = expanded.includes(l.id);
                return (
                  <ListCard key={l.id}>
                    {" "}
                    {/* Confirm dialog for deleting lists */}
                    <ConfirmDialog
                      embedded
                      open={confirmDelete.open && confirmDelete.id === l.id}
                      title={
                        confirmDelete.name
                          ? `Radera ${confirmDelete.name}?`
                          : "Radera lista?"
                      }
                      description={
                        confirmDelete.name
                          ? `Vill du radera inköpslistan "${confirmDelete.name}"? Detta kan inte ångras.`
                          : undefined
                      }
                      onCancel={() =>
                        setConfirmDelete({ open: false, id: null })
                      }
                      onConfirm={() => {
                        if (confirmDelete.id) removeList(confirmDelete.id);
                        setConfirmDelete({ open: false, id: null });
                      }}
                    />{" "}
                    <HeaderRow
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onClick={() => toggleExpand(l.id)}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" ||
                          e.key === " " ||
                          e.key === "Spacebar"
                        ) {
                          e.preventDefault();
                          toggleExpand(l.id);
                        }
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700 }}>{l.name}</div>
                        <Meta>
                          {l.items.length} artiklar • Skapad:{" "}
                          {new Date(l.createdAt).toLocaleDateString()}
                        </Meta>
                      </div>
                      <ActionRow>
                        <DangerButton
                          aria-label={`Radera ${l.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDelete({
                              open: true,
                              id: l.id,
                              name: l.name,
                            });
                          }}
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
                        <svg
                          style={{
                            width: 20,
                            height: 20,
                            transform: isOpen ? "rotate(90deg)" : undefined,
                            transition: "transform 150ms",
                          }}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 4l6 6-6 6V4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </ActionRow>
                    </HeaderRow>
                    {isOpen && (
                      <div
                        style={{
                          padding: 16,
                          borderTop: "1px solid #f3f4f6",
                          background: "#f9fafb",
                        }}
                      >
                        <div style={{ display: "grid", gap: 8 }}>
                          {l.items.map((it, i) => (
                            <ItemRow key={i}>
                              <input
                                type="checkbox"
                                checked={!!it.done}
                                onChange={() => toggleItem(l.id, i)}
                                style={{ width: 18, height: 18 }}
                              />
                              <span
                                style={{
                                  textDecoration: it.done
                                    ? "line-through"
                                    : undefined,
                                }}
                              >
                                {it.text}
                              </span>
                            </ItemRow>
                          ))}
                        </div>
                      </div>
                    )}
                  </ListCard>
                );
              })
            )}
          </div>
        </Section>
      </Container>
    </Page>
  );
}
