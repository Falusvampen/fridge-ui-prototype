import React from "react";
import styled from "styled-components";

const Root = styled.section`
  margin-top: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
  padding: 16px;
`;
const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${(p) => p.theme?.colors?.text ?? "#111827"};
`;

export default function Section({
  title,
  children,
  className,
}: {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Root className={className}>
      {title ? <Title>{title}</Title> : null}
      {children}
    </Root>
  );
}
