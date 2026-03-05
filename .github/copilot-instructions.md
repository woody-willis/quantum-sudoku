# Copilot Instructions

## Big Picture
- This repo is a Nuxt 4 + Vue 3 marketing shell for a future game, not an active gameplay app.
- Route flow: `app/app.vue` → `NuxtLayout` (`app/layouts/default.vue`) → page (`app/pages/*.vue`).
- `app/pages/index.vue` is composition-only: it assembles `LandingHero` and multiple `LandingFeatureSection` blocks with slotted visual demos.
- `app/pages/game.vue` is intentionally a placeholder; keep messaging explicit that gameplay is unavailable.

## Architecture + Data Flow
- There is no global store and no backend/API boundary yet.
- Cross-component communication is mostly props + slots:
  - `LandingFeatureSection` accepts `name`, `description`, `index`, `reversed`.
  - Visual components in `app/components/visuals/*` are presentational children rendered in slots.
- Interaction state is local and lightweight:
  - Theme toggle via `useColorMode()` in `app/layouts/default.vue`.
  - Hero glitch effect via local timer in `app/components/landing/Hero.vue`.

## Styling + Theming Patterns
- Global tokens live in `app/assets/css/main.css` (`--primary-color`, backgrounds, text colors).
- Theme variants are done with `html.dark` / `html.light` selectors (not utility classes).
- Component styles are usually `<style scoped>` and rely on shared CSS vars + `color-mix(...)` for glow effects.
- Preserve existing visual language: scanlines, pulse rings, subtle motion, monospace accents.

## Agent Conventions (Project-Specific)
- Keep components as Vue SFCs with `<script setup>` only when needed.
- Keep naming consistent: PascalCase components, kebab-case CSS classes.
- Prefer `NuxtLink` for navigation and `button` for in-place actions (example: hero CTA vs tutorial button).
- Reuse existing tokens before introducing new CSS variables.
- Avoid broad restyling or new design systems unless explicitly requested.

## Critical Refactor Safety
- In `app/layouts/default.vue`, preserve mousemove listener setup/cleanup behavior when touching lifecycle code.
- Keep visual demo components lightweight (SVG + CSS animation); avoid introducing canvas/WebGL unless requested.
- Do not imply game mechanics exist unless implementing them end-to-end.

## Workflows
- Install: `npm install`
- Dev server: `npm run dev` (default: `http://localhost:3000`)
- Build/preview: `npm run build` then `npm run preview`
- Static output: `npm run generate`
- Note: there is currently no dedicated `test` or `lint` npm script; ESLint is configured via `@nuxt/eslint` in `nuxt.config.ts`.
