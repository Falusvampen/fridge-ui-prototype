import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #__next { height: 100%; }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Prefer CSS variable (SSR-visible) with theme fallback to keep hydration consistent */
    color: var(--color-text, ${({ theme }) => theme.colors.text});
    background: var(--background);
  }

  img { display: block; max-width: 100%; }
`;
