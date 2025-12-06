import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { undo, redo } from '../store/slices/historySlice'
import { setTasks } from '../store/slices/tasksSlice'
import { selectCanUndo, selectCanRedo } from '../store/selectors'
import { store } from '../store/store'

export const useKeyboardShortcuts = (onAddTask) => {
  const dispatch = useDispatch()
  const canUndo = useSelector(selectCanUndo)
  const canRedo = useSelector(selectCanRedo)

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in input fields
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return
      }

      // Ctrl/Cmd + Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        const state = store.getState()
        if (state.history.past.length > 0) {
          const previousState = state.history.past[state.history.past.length - 1]
          if (previousState.tasks) {
            dispatch(setTasks(previousState.tasks.tasks))
          }
          dispatch(undo())
        }
      }

      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y for redo
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault()
        const state = store.getState()
        if (state.history.future.length > 0) {
          const nextState = state.history.future[state.history.future.length - 1]
          if (nextState.tasks) {
            dispatch(setTasks(nextState.tasks.tasks))
          }
          dispatch(redo())
        }
      }

      // Ctrl/Cmd + N for new task
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        if (onAddTask) {
          onAddTask()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [dispatch, onAddTask])
}
