# EasyAlgo - Duolingo for Data Structures & Algorithms

EasyAlgo is a gamified DSA learning app built with Next.js.  
It teaches logic-first understanding through interaction, not full code typing.

## Product Experience

- Drag-and-drop algorithm builder (`react-dnd`)
- Fill-in-the-blank code mode with Python/C++/Java toggle
- Flip flashcards with known/unknown tracking
- Visual explanation panel with beginner-friendly reasoning
- Learning path: Arrays -> Two Pointers -> Stack -> Binary Search
- Gamification: XP, streak, level, and progress bar

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- React DnD (`react-dnd`, `react-dnd-html5-backend`)

## Project Structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    app/
      easyalgo-app.tsx
    dashboard/
      gamification-bar.tsx
    learning/
      algorithm-builder.tsx
      dsa-flashcards.tsx
      fill-blank-code.tsx
      learning-path.tsx
      topic-workspace.tsx
      visual-explanation-panel.tsx
    ui/
      card.tsx
      progress-bar.tsx
  data/
    flashcards.ts
    learning-path.ts
    problems.json
  lib/
    problem-utils.ts
    utils.ts
  state/
    game-store.tsx
  types/
    dsa.ts
```

## Data Model

Problems are stored in `src/data/problems.json` using a production-friendly shape:

```json
{
  "id": "binary-search-classic",
  "topic": "binary-search",
  "difficulty": "Beginner",
  "steps": [],
  "correctOrder": [],
  "explanation": "...",
  "languageTemplates": {}
}
```

Includes starter modules:
- Binary Search
- Two Pointers
- Stack Operations

## Run Locally

1. Install dependencies:
```bash
npm install
```
2. Start development server:
```bash
npm run dev
```
3. Open `http://localhost:3000`

## Production

```bash
npm run lint
npm run build
npm run start
```

## Extension Points

The architecture is modular and ready for:
- visual algorithm animation components
- AI-generated explanation providers
- future code execution or sandbox integration
