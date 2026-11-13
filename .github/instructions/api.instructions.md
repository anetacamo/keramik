---
applyTo: "anetacamo/src/api/**"
description: "API module conventions: type definitions, fetch functions, and re-exports from index.ts."
---

## Structure

- Each domain gets its own file (e.g., `blogs.ts`, `submissions.ts`)
- All types and functions are re-exported from `src/api/index.ts`
- Shared types live here, not in component files

## Fetch Functions

- All requests go through `/api/...` (Vite proxy strips prefix in dev)
- Always check `response.ok` and throw on failure
- Return typed data, not raw `Response` objects

## Types

- Export interfaces/types for data shapes used by components
- Use `type` imports (`import { type Blog }`) when only the type is needed
