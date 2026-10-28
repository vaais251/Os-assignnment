# Taskflow — Task Management and Activity Dashboard

Web Engineering / Frontend Development, Assignment 01, Section B (CLO1 and CLO2).

**Live application:** https://vaais251.github.io/Os-assignnment/

**Repository:** https://github.com/vaais251/Os-assignnment

## Run locally

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. To verify and build:

```sh
npm test
npm run build
npm run preview
```

## Features

- Add tasks with a title, optional description, priority, due date and category.
- Move tasks between To do, In progress and Completed; complete/reopen or delete a task.
- Combine status, priority and text filters, including informative empty states.
- View task metrics and completion progress.
- Switch between persistent light and dark themes.
- Restore tasks and activity from browser localStorage; continue in session memory if storage is unavailable.
- Receive activity notifications and see the five most recent events; retain up to 30 events.

Four clearly illustrative tasks are supplied on first use. Deleting all tasks preserves an empty workspace. Data stays in the current browser and is not synchronized between devices. Do not store sensitive data in this demonstration app.

## Required architecture

```text
src/
  components/
    class/
      ActivityLogger.jsx
    functional/
      Header.jsx
      ThemeToggle.jsx
      MetricsSummary.jsx
      TaskForm.jsx
      TaskList.jsx
      TaskCard.jsx
      CardWrapper.jsx
  context/
    ThemeContext.jsx
  hooks/
    usePersistentTasks.js
  App.jsx
  main.jsx
  styles.css
```

## Requirement mapping

| Assignment concept | Implementation |
| --- | --- |
| Functional components and callback props | App supplies data and stable handlers to TaskForm, TaskList and TaskCard. |
| React children | CardWrapper renders its children inside a reusable panel. |
| Class state | ActivityLogger uses this.state and this.setState. |
| componentDidMount | Restores validated saved activity entries. |
| componentDidUpdate | Observes new event IDs, updates logs, saves them and shows a timed notification. |
| componentWillUnmount | Clears the notification timer. |
| JSX expressions and conditions | Counts, percentages, ternary empty states and && priority indicators. |
| map and unique keys | Tasks use UUIDs; events use UUIDs; fixed option lists use their unique text. |
| Synthetic events | onSubmit, onChange and onClick in forms, filters and task controls. |
| useState | Tasks, filters, form fields, theme and event state. |
| useEffect | Storage synchronization, document title and initial input focus. |
| useContext | ThemeToggle reads ThemeContext without prop drilling. |
| useRef | TaskForm focuses its input on mount and after successful submission. |
| useMemo | Computes filtered task collections only when dependencies change. |
| useCallback and memo | Stabilize task callbacks and skip unchanged TaskCard renders. |

## Deployment and submission

The compiled static site is in `docs/` and is served by GitHub Pages from `main /docs`.
After code changes, run `npm run build`, replace `docs/assets` and `docs/index.html` with the new `dist` output, and commit the updated source and deployment files. Keep `docs/.nojekyll`.

The Word submission is `submission/Assignment_01_Section_B.docx`. It includes the repository link, live link, implementation explanation and screenshots. Upload that file to Google Classroom as required by the assignment; the repository itself does not submit it to Classroom.

## Validation

`npm test` checks task creation/completion/reopening/deletion, combined filters, validation, persistence, theme restoration, corrupted/unavailable storage and the logger lifecycle including timer cleanup.

Built with React, Vite and Lucide React. Fonts: DM Sans and Manrope via Google Fonts, with local sans-serif fallbacks. No backend or API key is required.
