# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to the URL shown in the terminal

## Build for Production

```bash
npm run build
```

The production files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Features Overview

### Core Features
- ✅ Create, Read, Update, Delete tasks
- ✅ Toggle task completion status
- ✅ Filter by status (All/Active/Completed), category, and priority
- ✅ Search tasks by title, description, or category
- ✅ Organize tasks with categories (with ability to add new ones)
- ✅ Assign priority levels (Low/Medium/High)

### Advanced Features
- ✅ Drag and drop to reorder tasks
- ✅ Statistics dashboard with visual charts
- ✅ Undo/Redo functionality (Ctrl+Z / Ctrl+Y)
- ✅ Export/Import tasks as JSON
- ✅ Automatic localStorage persistence
- ✅ Fully responsive design
- ✅ Keyboard shortcuts support
- ✅ Accessibility features

## Keyboard Shortcuts

- `Ctrl+N` (or `Cmd+N` on Mac): Add new task
- `Ctrl+Z` (or `Cmd+Z` on Mac): Undo last action
- `Ctrl+Y` (or `Cmd+Y` on Mac): Redo last action
- `Ctrl+Shift+Z` (or `Cmd+Shift+Z` on Mac): Redo (alternative)

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual port number.

### Dependencies Issues
If you encounter dependency issues:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Make sure you're using Node.js version 16 or higher:
```bash
node --version
```

## Project Structure

```
Task Tracker/
├── src/
│   ├── components/       # React components
│   ├── store/           # Redux store and slices
│   ├── hooks/           # Custom React hooks
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── README.md           # Full documentation
```

## Next Steps

1. Start the development server
2. Add your first task
3. Explore the dashboard
4. Try filtering and searching
5. Test drag and drop
6. Export your tasks

Enjoy using Task Tracker! 🎉


