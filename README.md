# MiniGames

A catalog of casual games built with pure **TypeScript + HTML + SCSS** — no JS or CSS frameworks and no ready-made UI libraries. A learning project for [RS School](https://rs.school/courses/short-track).

**Deploy:** <https://gleb-cherepnin.github.io/minigames/>

## About

A single-page application with two pages and two dialogs:

- **Home** — hero section, new games carousel, leaderboard, developer section;
- **Library** — catalog with filters, sorting and pagination;
- **Auth** — sign in and sign up;
- **Game Details** — game information and comments.

The whole interface is generated from JavaScript: the document body in `index.html` is empty and contains only the entry point.

## Stack

| Purpose    | Tool                                               |
| ---------- | -------------------------------------------------- |
| Language   | TypeScript in strict mode                          |
| Styles     | SCSS: tokens, breakpoints, mixins                  |
| Build      | Vite                                               |
| Linting    | ESLint + typescript-eslint + eslint-plugin-unicorn |
| Formatting | Prettier                                           |
| Git hooks  | Husky                                              |

## Getting started

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

The dev server starts at <http://localhost:5173>.

## Scripts

| Command                | What it does                  |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Dev server with hot reload    |
| `npm run build`        | Production build into `dist/` |
| `npm run preview`      | Local preview of the build    |
| `npm run lint`         | ESLint check                  |
| `npm run lint:fix`     | ESLint check with autofix     |
| `npm run format`       | Prettier formatting           |
| `npm run format:check` | Formatting check              |

## Structure

```text
src/
  app/          entry point and router
  components/   UI components
  pages/        pages
  services/     data access
  styles/       tokens, breakpoints, global styles
  types/        shared types
  utils/        helper functions
public/assets/  images and icons
```

## Design

Mockup: [MiniGames in Figma](https://www.figma.com/design/4MnLizE59gZI2DDxaSgZqi/MiniGames?node-id=0-1&m=dev&t=fsxihMHW5MYSxEkW-1)

Pixel Perfect breakpoints: **375**, **768** and **1920** pixels.

## Branching

The base branch is `main`. Each stage is developed in a `story-N` branch, and tasks inside a stage live in separate branches with a Pull Request. Commit messages follow the [RS School Git convention](https://rs.school/docs/git-convention).

---

Author: [Gleb-Cherepnin](https://github.com/Gleb-Cherepnin)
