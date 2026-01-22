const theme = {
  colors: {
    // Prefer CSS variables (single source of truth) with a safe fallback
    primary: "var(--color-primary, #2563eb)",
    primaryHover: "var(--color-primary-hover, #3b82f6)",
    primary50: "var(--color-primary-50, #eff6ff)",
    primary200: "var(--color-primary-200, #bfdbfe)",

    success: "var(--color-success, #16a34a)",
    successLight: "var(--color-success-light, #dcfce7)",
    successAlt: "var(--color-success-alt, #22c55e)",

    warning: "var(--color-warning, #d97706)",
    warningLight: "var(--color-warning-light, #fffbeb)",
    warningAlt: "var(--color-warning-alt, #f59e0b)",

    danger: "var(--color-danger, #dc2626)",
    dangerDark: "var(--color-danger-dark, #b91c1c)",
    dangerLight: "var(--color-danger-light, #fee2e2)",

    gray50: "var(--color-gray-50, #f8fafc)",
    gray100: "var(--color-gray-200, #f3f4f6)",

    muted: "var(--color-muted, #6b7280)",
    text: "var(--color-text, #111827)",
  },
};

export default theme;
