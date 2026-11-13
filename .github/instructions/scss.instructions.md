---
applyTo: "**/*.module.scss"
description: "SCSS module conventions: use CSS variables for spacing, colors, and typography instead of hardcoded values."
---

## Spacing

Use `var(--space-*)` variables instead of hardcoded pixel values:

- `--space-xs` (4px), `--space-sm` (6px), `--space` (8px), `--space-lg` (12px)
- `--space-xl` (16px), `--space-2xl` (32px), `--space-3xl` (48px), `--space-4xl` (80px)

## Colors

Use theme-aware CSS variables, never hardcoded color values:

- Text: `var(--text)`, Background: `var(--bg)`
- Accent: `var(--accent)`, Pink: `var(--pink)`, Blue: `var(--blue)`
- Buttons: `var(--bg-button)`, Borders: `var(--border)`

## Typography

- Font family: `var(--font)`
- Font size: `var(--font-size)`
- Letter spacing: `var(--letter-spacing)` or `var(--letter-spacing-l)`

## Structure

- One `.module.scss` per component — no shared imports between component modules
- If styles are reused across 3+ components, extract to `src/styles/` partial
- Responsive breakpoints: 500px (mobile), 900px (tablet)
- **No inline styles** (`style={{}}`) in components — all styling belongs in the `.module.scss` file
