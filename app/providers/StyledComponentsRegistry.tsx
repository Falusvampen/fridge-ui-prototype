"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create the sheet once per request (state persists per component instance)
  const [sheet] = React.useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    // During SSR this will return the style tags collected from styled-components
    const styles = sheet.getStyleElement();
    return <>{styles}</>;
  });

  // If we're on the server, collect styles during render
  if (typeof window === "undefined") {
    return sheet.collectStyles(<>{children}</>);
  }

  // On the client just render children normally
  return <>{children}</>;
}
