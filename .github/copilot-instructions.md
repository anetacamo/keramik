# Blog / Portfolio Project

## Structure

- **Monorepo** at root with `concurrently` to run both apps (`npm run dev`)
- **Frontend** (`anetacamo/`): React + Vite + TypeScript
- **Backend** (`image-server/`): Fastify serving JSON data + static images

## Frontend Stack

- React 19, Vite, TypeScript, SCSS modules
- Routing: `@tanstack/react-router` with `$lang` prefix for i18n (en, dk)
- Data fetching: `@tanstack/react-query`
- i18n: custom `LangContext` with `useTranslation()` hook
- Theming: `ThemeContext` (light/dark via `data-theme` attribute)
- Cart: `CartContext` with localStorage persistence (client-side only)

## Key Files

- `src/api/` — API module split by domain, re-exported from `src/api/index.ts`
  - `blogs.ts` — `Blog` type, `fetchBlogs`, `fetchBlog`, `imageUrl`, `likeBlog`
  - `submissions.ts` — `SubmissionData`, `Submission` types, `submitForm`, `fetchSubmissions`, `updateSubmissionStatus`, `deleteSubmission`
- `src/helpers/slugify.ts` — reusable slugify utility
- `src/helpers/sortByDate.ts` — `sortByDateDesc` helper for sorting blogs newest-first
- `src/routes.ts` — route definitions (`SimpleRoute` and `NestedRoute`); `/` shows Blog
- `src/router.tsx` — TanStack Router tree built from routes.ts
- `src/main.tsx` — app entry with QueryClient, ThemeProvider, CartProvider, RouterProvider
- `src/CartContext.tsx` — cart state with `addItem`, `removeItem`, `clearCart`; persists to localStorage

## Component Structure

Components are organized into four subfolders under `src/components/`:

- `pages/` — route-level: Blog, BlogDetail, Cart, CV, Shop, Tagged, TaggedDetail, Search, FormSubmits
- `pages/` — route-level: Blog, BlogDetail, Cart, CV, Shop, Tagged, Browse, FormSubmits
- `layout/` — structural: Menu, Footer, Logo, ShopSection
- `ui/` — small reusable: Button, Image, LineDivider, DotDivider, Tags, CategoryTags
- `features/` — domain-specific: BlogCard, Like, ShopBadge, YourBag, ContactForm, AvailableFilter, GlazeFilter

## Backend

- `server.ts`: Fastify, reads `data/blogs.json`, serves `/blogs`, `/blogs/:id`, `/blogs/:id/like`
- Form submissions: `POST /submissions` stores to `data/submissions.json`, `GET /submissions` lists all
- Static images at `/images/` from `images/` folder (.webp, .png)
- Port 3000

## Frontend ↔ Backend

- Vite dev proxy: `/api` → `http://localhost:3000` (strips `/api` prefix)
- All frontend fetch calls use `/api/...` to avoid CORS

## Data Shape

```ts
{ id: string; title: string; description?: string; date?: string; category: string[]; images: string[]; skip?: boolean; likes: number; stock?: number; price?: number; glaze?: string[] }
```

## Conventions

- Package manager: npm (no yarn)
- Shared types and fetch logic go in `src/api.ts`
- Utility functions go in `src/helpers/`
- Components use SCSS modules (`Component.module.scss`), not global classes or inline styles — always create a `.module.scss` file for component-specific styles
- Use CSS variables (`var(--text)`, `var(--accent)`, `var(--bg)`) for theme-aware colors
- Use text characters (`×`, `→`) instead of icon libraries
- Keep components simple — use context for shared state (cart, theme, lang)
- Links must include `/$lang` prefix for i18n routing
- **When making meaningful structural changes (new components, endpoints, helpers, data shape changes, or reorganizations), update this instructions file to reflect the current state of the project**
