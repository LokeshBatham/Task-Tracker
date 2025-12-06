import { useState } from 'react'
import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import TaskListPage from './components/TaskListPage/TaskListPage'
import ToastContainer from './components/ToastContainer/ToastContainer'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard') // 'dashboard' or 'tasks'

  // Enable keyboard shortcuts globally (undo/redo work everywhere)
  useKeyboardShortcuts(null) // onAddTask is handled in TaskListPage

  return (
    <div className="app">
      <Header 
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
      />
      <main className="app-main">
        <div className="app-container">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'tasks' && <TaskListPage />}
        </div>
      </main>
      <ToastContainer />
    </div>
  )
}

export default App

