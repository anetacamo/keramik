---
applyTo: "anetacamo/src/components/**/*.tsx"
description: "React component conventions: SCSS modules for styling, no inline styles, component folder structure."
---

## Styling

- **Never use inline styles** (`style={{}}`) — all styles go in the component's `.module.scss` file
- Import styles as `import styles from "./ComponentName.module.scss"`
- Use CSS variables (`var(--text)`, `var(--space)`, etc.) in SCSS, not hardcoded values
- Do not use global CSS class names — always use scoped module classes

## Folder Structure

Each component lives in its own folder with two files:

```
ComponentName/
  index.tsx
  ComponentName.module.scss
```

## Component Placement

- `pages/` — route-level components
- `layout/` — structural (Menu, Footer, Logo)
- `ui/` — small reusable (Button, Image, LineDivider)
- `features/` — domain-specific (BlogCard, ShopBadge, ContactForm)

## Conventions

- Use text characters (`×`, `→`, `‹`, `›`) instead of icon libraries
- Links must include `/$lang` prefix for i18n routing
- Use context for shared state (cart, theme, lang), not prop drilling
- Use `type` imports for type-only references: `import { type Blog } from ...`
