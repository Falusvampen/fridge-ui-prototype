const theme = {
  colors: {
    // Prefer CSS variables (single source of truth) with a safe fallback
    primary: "var(--color-primary, #2563eb)",
    primaryHover: "var(--color-primary-hover, #3b82f6)",
    gray100: "var(--color-gray-100, #f3f4f6)",
    text: "var(--color-text, #111827)",
  },
};

export default theme;
