# Task Tracker Application

A comprehensive Task Tracker application built with ReactJS and Redux Toolkit that allows users to manage their daily tasks efficiently.

## Features

### Core Functionality
- ✅ **Task Management**: Create, read, update, and delete tasks
- ✅ **Task Status**: Toggle completion status of tasks
- ✅ **Filtering**: Filter tasks by status (all, completed, active), category, and priority
- ✅ **Search**: Search functionality to find specific tasks by title, description, or category
- ✅ **Categories**: Organize tasks with categories/tags (with ability to add new categories)
- ✅ **Priority Levels**: Assign priority levels (low, medium, high) to tasks

### Advanced Features
- ✅ **Drag and Drop**: Reorder tasks by dragging and dropping
- ✅ **Data Visualization**: Task completion statistics dashboard with charts
- ✅ **Undo/Redo**: History functionality for actions (Ctrl+Z / Ctrl+Y)
- ✅ **Export/Import**: Export and import task data as JSON files
- ✅ **Persistence**: Automatic saving to localStorage
- ✅ **Responsive Design**: Mobile-first approach with beautiful UI
- ✅ **Accessibility**: Full keyboard navigation and screen reader support

## Technology Stack

- **Frontend Framework**: React 18 with functional components and hooks
- **State Management**: Redux Toolkit
- **Styling**: CSS3 with CSS Variables
- **Drag and Drop**: react-beautiful-dnd
- **Charts**: Recharts
- **Date Formatting**: date-fns
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd "Task Tracker"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
task-tracker/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard/      # Statistics dashboard
│   │   ├── Filters/        # Filter controls
│   │   ├── Header/         # App header with actions
│   │   ├── SearchBar/      # Search input
│   │   ├── TaskForm/       # Add/Edit task form
│   │   ├── TaskItem/       # Individual task item
│   │   └── TaskList/       # Task list with drag-drop
│   ├── store/              # Redux store configuration
│   │   ├── slices/         # Redux slices
│   │   │   ├── tasksSlice.js
│   │   │   ├── filtersSlice.js
│   │   │   └── historySlice.js
│   │   ├── store.js        # Store configuration
│   │   ├── persistence.js  # localStorage utilities
│   │   └── selectors.js    # Redux selectors
│   ├── hooks/              # Custom React hooks
│   │   └── useKeyboardShortcuts.js
│   ├── styles/             # Global styles
│   │   └── buttons.css
│   ├── App.jsx             # Main app component
│   ├── App.css
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Usage

### Adding a Task

1. Click the "Add Task" button in the header or press `Ctrl+N` (or `Cmd+N` on Mac)
2. Fill in the task details:
   - **Title** (required)
   - **Description** (optional)
   - **Category** (select from existing or create new)
   - **Priority** (low, medium, high)
3. Click "Add Task" to save

### Managing Tasks

- **Toggle Completion**: Click the checkbox next to a task
- **Edit Task**: Click the edit icon on a task
- **Delete Task**: Click the delete icon on a task
- **Reorder Tasks**: Drag and drop tasks to reorder them

### Filtering and Searching

- **Status Filter**: Filter by All, Active, or Completed tasks
- **Category Filter**: Filter by specific category
- **Priority Filter**: Filter by priority level
- **Search**: Type in the search bar to find tasks by title, description, or category
- **Sort**: Sort tasks by date created, priority, or title (ascending/descending)

### Keyboard Shortcuts

- `Ctrl+N` / `Cmd+N`: Add new task
- `Ctrl+Z` / `Cmd+Z`: Undo last action
- `Ctrl+Y` / `Cmd+Y` or `Ctrl+Shift+Z`: Redo last action

### Export/Import

- **Export**: Click "Export" in the header to download your tasks as a JSON file
- **Import**: Click "Import" in the header and select a previously exported JSON file

### Dashboard

Click "Dashboard" in the header to view:
- Total tasks, completed tasks, active tasks, and completion rate
- Visual charts showing task distribution by completion, priority, and category
- Recent tasks list

## State Management

The application uses Redux Toolkit for state management with the following slices:

1. **tasksSlice**: Manages tasks, categories, and priorities
2. **filtersSlice**: Manages filter and sort settings
3. **historySlice**: Manages undo/redo history

All state is automatically persisted to localStorage and restored on page load.

## Accessibility Features

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Proper form labels

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Memoized selectors using `createSelector` from Redux Toolkit
- Efficient re-rendering with React hooks
- Optimized drag-and-drop operations
- Lazy loading for charts

## Future Enhancements

Potential features for future versions:
- Task due dates and reminders
- Task sharing and collaboration
- Multiple task lists/projects
- Dark mode
- Task templates
- Recurring tasks
- Task comments and notes
- Integration with calendar apps

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on the repository.

---

Built with using React and Redux Toolkit


