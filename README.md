# SmartClean AI POS

**Live Demo:** [https://smartclean-ai-pos.vercel.app/](https://smartclean-ai-pos.vercel.app/)

SmartClean AI is a modern, high-fidelity dark-themed SaaS Laundry Point of Sale (POS) system built with React, Vite, and TailwindCSS. It features dynamic state management via Zustand, beautiful UI animations using Framer Motion, and a robust drag-and-drop Kanban workflow powered by `@dnd-kit`.

## Implementation Summaries

### 1. Dashboard & Core Layout
- **Global State**: Implemented a `zustand` store with mock order data, tracking total revenue and active orders.
- **Routing**: Setup `react-router-dom` with a persistent top navigation bar.
- **Dashboard**: Created animated metric cards using `framer-motion` and a list of recent orders.
- **UI System**: Established a dark theme SaaS aesthetic using Tailwind CSS and `lucide-react` icons.

### 2. AI Order Entry System
- Built the `NewOrder` page featuring a mock "AI parsing" system.
- Users can type natural language (e.g., `1 bed sheet, 2 supreme shirts`). 
- The system gracefully parses quantities and items, intelligently infers prices based on keywords, and categorizes unknown items cleanly with a fallback default price.
- Contains robust error handling, loading states, and smooth slide-down animations for order confirmation.

### 3. Kanban Board Workflow
- Converted the traditional `Orders` page into an interactive, drag-and-drop Kanban board using `@dnd-kit`.
- Created 5 standard pipeline columns: `Received`, `Washing`, `Drying`, `Ready`, `Delivered`.
- Integrated `useSortable` into the order cards allowing smooth dragging across columns, instantly updating the global state and card status badges upon drop.

## Local Development

```bash
npm install
npm run dev
```
