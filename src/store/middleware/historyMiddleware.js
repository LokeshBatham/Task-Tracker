import { addToHistory } from '../slices/historySlice'

// Actions that should be tracked for undo/redo
const trackedActions = [
  'tasks/addTask',
  'tasks/updateTask',
  'tasks/deleteTask',
  'tasks/toggleTask',
  'tasks/reorderTasks',
]

// Don't track setTasks as it's used for undo/redo restoration
const ignoredActions = ['tasks/setTasks', 'history/undo', 'history/redo', 'history/addToHistory']

export const historyMiddleware = (store) => (next) => (action) => {
  // Skip tracking for ignored actions
  if (ignoredActions.includes(action.type)) {
    return next(action)
  }
  
  // Capture current state before action if it's a tracked action
  if (trackedActions.includes(action.type)) {
    const currentState = store.getState()
    const stateSnapshot = {
      tasks: JSON.parse(JSON.stringify(currentState.tasks)),
    }
    
    // Dispatch the action first
    const result = next(action)
    
    // Then add the previous state to history
    store.dispatch(addToHistory(stateSnapshot))
    
    return result
  }
  
  return next(action)
}
