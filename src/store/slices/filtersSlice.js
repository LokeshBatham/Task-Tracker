import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statusFilter: 'all', // 'all', 'active', 'completed'
  categoryFilter: 'all',
  priorityFilter: 'all',
  searchQuery: '',
  sortBy: 'createdAt', // 'createdAt', 'priority', 'title'
  sortOrder: 'desc', // 'asc', 'desc'
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    resetFilters: (state) => {
      return initialState
    },
  },
})

export const {
  setStatusFilter,
  setCategoryFilter,
  setPriorityFilter,
  setSearchQuery,
  setSortBy,
  setSortOrder,
  resetFilters,
} = filtersSlice.actions

export default filtersSlice.reducer


