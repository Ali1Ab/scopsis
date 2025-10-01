## To-Do List App

A simple, responsive To-Do app built with Next.js App Router and Tailwind CSS. Features:

- Add, complete, delete tasks
- Filter by All / Active / Completed
- Optional description and due date; sort by due date or created
- LocalStorage persistence
- Dark mode toggle (persisted)
- Subtle animations on task add
- Charts for Analytics
- Chatbot Trained on Scopsis website crawled data

### Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Project Structure

- `src/types/task.ts`: shared `Task` types
- `src/hooks/`: `useLocalStorage`, `useTasks`, `useTheme`
- `src/components/`: `TaskForm`, `TaskItem`, `TaskList`, `FilterBar`
- `src/app/page.tsx`: wires everything together

### Testing

We use Vitest + React Testing Library.

Run tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

### Deployment

Any static-compatible host (e.g., Vercel). Build with:

```bash
npm run build
npm start
```
