import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { exportState, importState } from '../../store/persistence'
import { setTasks } from '../../store/slices/tasksSlice'
import { selectCanUndo, selectCanRedo } from '../../store/selectors'
import { undo, redo } from '../../store/slices/historySlice'
import { showToast } from '../../store/slices/toastSlice'
import { store } from '../../store/store'
import './Header.css'

const Header = ({ currentPage, onNavigate }) => {
  const dispatch = useDispatch()
  const canUndo = useSelector(selectCanUndo)
  const canRedo = useSelector(selectCanRedo)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        hamburgerRef.current &&
        !menuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMenuOpen])

  const handleExport = () => {
    try {
      exportState()
      dispatch(showToast({
        message: 'Tasks exported successfully as Excel!',
        type: 'success',
        duration: 3000,
      }))
    } catch (error) {
      dispatch(showToast({
        message: `Error exporting data: ${error.message}`,
        type: 'error',
        duration: 4000,
      }))
    }
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      importState(file)
        .then((state) => {
          if (state.tasks?.tasks) {
            dispatch(setTasks(state.tasks.tasks))
            dispatch(showToast({
              message: 'Tasks imported successfully!',
              type: 'success',
              duration: 3000,
            }))
          } else {
            dispatch(showToast({
              message: 'Invalid file format. Please select a valid task tracker file.',
              type: 'error',
              duration: 4000,
            }))
          }
        })
        .catch((error) => {
          dispatch(showToast({
            message: `Error importing data: ${error.message}`,
            type: 'error',
            duration: 4000,
          }))
        })
      e.target.value = '' // Reset input
    }
  }

  const handleUndo = () => {
    const state = store.getState()
    if (state.history.past.length > 0) {
      const previousState = state.history.past[state.history.past.length - 1]
      if (previousState.tasks) {
        dispatch(setTasks(previousState.tasks.tasks))
      }
      dispatch(undo())
    }
  }

  const handleRedo = () => {
    const state = store.getState()
    if (state.history.future.length > 0) {
      const nextState = state.history.future[state.history.future.length - 1]
      if (nextState.tasks) {
        dispatch(setTasks(nextState.tasks.tasks))
      }
      dispatch(redo())
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleMenuAction = (action) => {
    action()
    closeMenu()
  }

  return (
    <>
      <header className="header" role="banner">
        <div className="header-container">
        <div className="header-top">
          <div className="header-title">
            <h1>Task Tracker</h1>
            <p className="header-subtitle">Manage your daily tasks efficiently</p>
          </div>
          
          <button
            ref={hamburgerRef}
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="header-menu"
          >
            <span className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
        
        <nav 
          ref={menuRef}
          className={`header-nav ${isMenuOpen ? 'menu-open' : ''}`} 
          aria-label="Main navigation"
          id="header-menu"
        >
          <div className="header-menu-header">
            <h2 className="header-menu-title">Task Tracker</h2>
            <button
              className="header-menu-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          
          <div className="header-menu-undo-redo">
            <button
              className="btn btn-icon"
              onClick={() => handleMenuAction(handleUndo)}
              disabled={!canUndo}
              aria-label="Undo last action"
              title="Undo (Ctrl+Z)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
              </svg>
            </button>
            
            <button
              className="btn btn-icon"
              onClick={() => handleMenuAction(handleRedo)}
              disabled={!canRedo}
              aria-label="Redo last action"
              title="Redo (Ctrl+Y)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 7v6h-6" />
                <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13" />
              </svg>
            </button>
          </div>

          <div className="header-actions">
            <button
              className={`btn btn-secondary btn-menu-item ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => {
                onNavigate('dashboard')
                closeMenu()
              }}
              aria-label="View Dashboard"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Dashboard</span>
            </button>

            <button
              className={`btn btn-secondary btn-menu-item ${currentPage === 'tasks' ? 'active' : ''}`}
              onClick={() => {
                onNavigate('tasks')
                closeMenu()
              }}
              aria-label="View Tasks"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              <span>Tasks</span>
            </button>

            <label className="btn btn-secondary btn-menu-item" htmlFor="import-file" title="Import tasks from Excel">
              

              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Import Excel</span>
              <input
                id="import-file"
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => {
                  handleImport(e)
                  closeMenu()
                }}
                style={{ display: 'none' }}
                aria-label="Import tasks from Excel file"
              />
            </label>

            <button
              className="btn btn-secondary btn-menu-item"
              onClick={() => {
                handleExport()
                closeMenu()
              }}
              aria-label="Export tasks to Excel"
              title="Export as Excel"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Export Excel</span>
            </button>

          </div>
        </nav>
      </div>
    </header>
    {isMenuOpen && (
      <div 
        className="header-menu-backdrop active"
        onClick={closeMenu}
        aria-hidden="true"
      />
    )}
    </>
  )
}

export default Header

