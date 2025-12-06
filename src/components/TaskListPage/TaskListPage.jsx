import { useState, useEffect } from 'react'
import TaskForm from '../TaskForm/TaskForm'
import TaskList from '../TaskList/TaskList'
import Filters from '../Filters/Filters'
import SearchBar from '../SearchBar/SearchBar'
import FilterButton from '../FilterButton/FilterButton'
import './TaskListPage.css'

const TaskListPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)

  // Keyboard shortcut for adding task (Ctrl/Cmd + N)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        setShowForm(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="task-list-page">
      <div className="task-list-page-header">
        <h2 className="task-list-page-title">Task List</h2>
        <button
          className="btn btn-primary btn-add-task-page"
          onClick={() => setShowForm(true)}
          aria-label="Add new task"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Task</span>
        </button>
      </div>

      <div className="task-list-page-controls">
        <div className="task-list-controls-top">
          <SearchBar />
          <FilterButton onOpenModal={() => setShowFilterModal(true)} />
          <div className="filters-desktop">
            <Filters />
          </div>
        </div>
      </div>

      {showFilterModal && (
        <div className="filter-modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="filter-modal-content" onClick={(e) => e.stopPropagation()}>
            <Filters isModal={true} onClose={() => setShowFilterModal(false)} />
          </div>
        </div>
      )}

      {showForm && (
        <TaskForm 
          onClose={() => setShowForm(false)}
        />
      )}

      <TaskList />
    </div>
  )
}

export default TaskListPage

