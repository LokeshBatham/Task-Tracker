import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  past: [],
  future: [],
  maxHistorySize: 50,
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      // Add current state to past
      state.past.push(action.payload)
      
      // Limit history size
      if (state.past.length > state.maxHistorySize) {
        state.past.shift()
      }
      
      // Clear future when new action is performed
      state.future = []
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previousState = state.past.pop()
        state.future.push(previousState)
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop()
        state.past.push(nextState)
      }
    },
    clearHistory: (state) => {
      state.past = []
      state.future = []
    },
  },
})

export const { addToHistory, undo, redo, clearHistory } = historySlice.actions

export default historySlice.reducer
