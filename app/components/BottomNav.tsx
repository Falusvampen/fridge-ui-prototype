"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const Nav = styled.nav`
  background: white;
  border-top: 1px solid ${(p) => p.theme?.colors?.gray100 ?? "#f3f4f6"};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  z-index: 50;
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 64px;
  max-width: 420px;
  margin: 0 auto;
`;

const LinkAnchor = styled(Link)<{ $active?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${(p) =>
    p.$active
      ? (p.theme?.colors?.primary ?? "#2563eb")
      : (p.theme?.colors?.text ?? "#111827")};
  text-decoration: none;
  transition: color 120ms ease-in-out;

  &:hover {
    color: ${(p) => p.theme?.colors?.primaryHover ?? "#3b82f6"};
  }

  svg {
    margin-bottom: 4px;
    width: 24px;
    height: 24px;
  }
  span {
    font-size: 12px;
  }
`;

export default function BottomNav({
  isEmbedded = false,
}: {
  isEmbedded?: boolean;
}) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Nav
      style={
        isEmbedded
          ? { position: "relative" }
          : { position: "fixed", bottom: 0, left: 0, right: 0 }
      }
    >
      <NavInner>
        <LinkAnchor href="/inkopslista" $active={isActive("/inkopslista")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <span>Inköpslista</span>
        </LinkAnchor>

        <LinkAnchor href="/" $active={isActive("/")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <span>Innehåll</span>
        </LinkAnchor>

        <LinkAnchor href="/energi" $active={isActive("/energi")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>Energi</span>
        </LinkAnchor>
      </NavInner>
    </Nav>
  );
}
