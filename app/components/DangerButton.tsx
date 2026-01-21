"use client";

import styled from "styled-components";

const DangerButton = styled.button`
  background: transparent;
  color: #ef4444;
  padding: 6px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  transition:
    background 120ms ease,
    color 120ms ease,
    transform 120ms ease,
    border-color 120ms ease;

  &:hover {
    background: rgba(239, 68, 68, 0.08);
    color: #b91c1c;
    transform: translateY(-1px);
    border-color: rgba(239, 68, 68, 0.12);
  }
`;

export default DangerButton;
