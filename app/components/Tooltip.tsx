"use client";

import React from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  outline: none;
`;

export const Badge = styled.span<{ $color?: string }>`
  margin-left: 8px;
  font-size: 12px;
  color: ${(p) => p.$color || "var(--color-warning, #d97706)"};
  padding: 4px 8px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.03);
`;

const Text = styled.span`
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%) translateY(6px);
  background: var(--tooltip-bg, #111827);
  color: white;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 6px 18px rgba(12, 12, 12, 0.16);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 150ms ease,
    transform 150ms ease;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: var(--tooltip-bg, #111827) transparent transparent transparent;
  }

  ${Wrapper}:hover &,
  ${Wrapper}:focus-within & {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

export default function Tooltip({
  children,
  text,
  ariaLabel,
}: {
  children: React.ReactNode;
  text?: string;
  ariaLabel?: string;
}) {
  return (
    <Wrapper
      tabIndex={0}
      aria-label={ariaLabel || (text ? String(text) : undefined)}
    >
      {children}
      <Text role="tooltip">{text}</Text>
    </Wrapper>
  );
}
