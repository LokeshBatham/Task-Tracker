import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import filtersReducer from './slices/filtersSlice'
import historyReducer from './slices/historySlice'
import toastReducer from './slices/toastSlice'
import { loadState, saveState } from './persistence'
import { historyMiddleware } from './middleware/historyMiddleware'
import { setTasks } from './slices/tasksSlice'

// Load initial state from localStorage
const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
    history: historyReducer,
    toast: toastReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['tasks/reorderTasks'],
      },
    }).concat(historyMiddleware),
})

// Save state to localStorage on every state change
store.subscribe(() => {
  const state = store.getState()
  
  // Save state to localStorage (excluding internal flags)
  const stateToSave = {
    tasks: state.tasks,
    filters: state.filters,
    history: {
      past: state.history.past,
      future: state.history.future,
      maxHistorySize: state.history.maxHistorySize,
    },
  }
  saveState(stateToSave)
})

export default store
