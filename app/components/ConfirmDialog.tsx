"use client";

import React from "react";
import styled from "styled-components";
import DangerButton from "./DangerButton";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.36);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
`;

const Dialog = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: min(520px, 92%);
  box-shadow: 0 12px 40px rgba(2, 6, 23, 0.16);
`;

const EmbeddedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.36);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 700;
`;

const Desc = styled.p`
  margin: 0 0 16px 0;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const Cancel = styled.button`
  background: transparent;
  border: 1px solid ${(p) => p.theme?.colors?.gray100 ?? "#e5e7eb"};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Radera",
  cancelLabel = "Avbryt",
  onConfirm,
  onCancel,
  embedded = false,
}: {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  embedded?: boolean;
}) {
  if (!open) return null;

  const Wrapper = embedded ? EmbeddedOverlay : Overlay;

  return (
    <Wrapper onClick={onCancel} role="presentation">
      <Dialog
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {title && <Title>{title}</Title>}
        {description && <Desc>{description}</Desc>}
        <Actions>
          <Cancel onClick={onCancel}>{cancelLabel}</Cancel>
          <DangerButton onClick={onConfirm}>{confirmLabel}</DangerButton>
        </Actions>
      </Dialog>
    </Wrapper>
  );
}
