# SkillTrack — Personal Learning & Career Dashboard

A frontend-only React dashboard for tracking the skills you're learning, the tasks
you're working through, and the long-term goals behind them.



## Features

- **Dashboard** — greeting, overall progress ring, stat rail, skill and task summaries
- **Skills** — add, edit, delete, and search skills with category + progress
- **Tasks** — add, complete/incomplete, delete, search, and filter by status
- **Goals** — long-term goals with progress and target dates
- **Progress** — overall completion and per-category skill breakdown
- **Settings** — dark mode toggle, reset saved data
- **Persistence** — everything survives a refresh via `localStorage`

## Tech stack

React 18 · React Router · Context API · Custom hooks · CSS3 (no UI framework) · Vite

## React concepts demonstrated

| Concept | Where |
|---|---|
| Components & props | `SkillCard`-style rows, `ProgressBar`, `ProgressRing`, `Topbar` |
| `useState` | Forms, search, filters, modals |
| `useEffect` | Inside `useLocalStorage` and theme sync in `App.jsx` |
| Custom hook | `useLocalStorage` — persistence extracted into one reusable hook |
| Context API | `AppContext` — skills/tasks/goals/theme shared with no prop drilling |
| React Router | `Sidebar` + `Routes` in `App.jsx` |
| Controlled forms | Add/Edit Skill, Add Task, Add Goal |
| `map` / `filter` / `reduce` | Rendering lists, search/filter logic, progress calculations |
| Conditional rendering | Empty states across all pages |
| CRUD | Full create/read/update/delete for skills, tasks, and goals |

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Deploying (for your resume link)

The easiest option is Vercel or Netlify:

```bash
npm run build
```

Drag the generated `dist/` folder into Netlify's deploy page, or run `vercel` /
`vercel --prod` from this folder if you have the Vercel CLI installed. Either way
you'll get a public URL to put on your resume next to the GitHub link.

## Folder structure

```
src/
├── components/    Reusable UI pieces (Sidebar, Topbar, Modal, ProgressBar, ProgressRing)
├── pages/         One component per route (Dashboard, Skills, Tasks, Goals, Progress, Settings)
├── context/        AppContext.jsx — global state + CRUD actions
├── hooks/          useLocalStorage.js — custom persistence hook
├── data/           initialData.js — seed data shown on first run
├── App.jsx         Route definitions
└── main.jsx        App entry point
```



** "SkillTrack is a personal learning dashboard I built to
manage the skills, tasks, and goals I'm working through as a developer. It's a
fully client-side React app — I used the Context API for shared state, React
Router for navigation, and a custom hook to persist everything to localStorage
so data survives a refresh."

**"why no backend?":** "This was scoped as a  frontend project to
demonstrate core React patterns cleanly. The natural next step is React frontend
→ a REST API → a database, which I've outlined as a future upgrade."

**"how would you add an API call?":** point to `AppContext.jsx` — explain
you'd replace the `useLocalStorage` calls with a `useEffect` that fetches from an
endpoint on mount, add `isLoading`/`error` state, and keep the same CRUD function
signatures so no page component would need to change.
