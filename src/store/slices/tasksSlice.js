import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
  categories: ['Work', 'Personal', 'Shopping', 'Health', 'Other'],
  priorities: ['low', 'medium', 'high'],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description || '',
        completed: false,
        priority: action.payload.priority || 'medium',
        category: action.payload.category || 'Other',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      state.tasks.push(newTask)
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload
      const task = state.tasks.find((t) => t.id === id)
      if (task) {
        Object.assign(task, updates, { updatedAt: new Date().toISOString() })
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload)
      if (task) {
        task.completed = !task.completed
        task.updatedAt = new Date().toISOString()
      }
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload
      const [removed] = state.tasks.splice(sourceIndex, 1)
      state.tasks.splice(destinationIndex, 0, removed)
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload)
      }
    },
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
  },
})

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  reorderTasks,
  addCategory,
  setTasks,
} = tasksSlice.actions

export default tasksSlice.reducer


