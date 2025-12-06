import { createSelector } from '@reduxjs/toolkit'

// Base selectors
export const selectAllTasks = (state) => state.tasks.tasks
export const selectCategories = (state) => state.tasks.categories
export const selectPriorities = (state) => state.tasks.priorities
export const selectStatusFilter = (state) => state.filters.statusFilter
export const selectCategoryFilter = (state) => state.filters.categoryFilter
export const selectPriorityFilter = (state) => state.filters.priorityFilter
export const selectSearchQuery = (state) => state.filters.searchQuery
export const selectSortBy = (state) => state.filters.sortBy
export const selectSortOrder = (state) => state.filters.sortOrder
export const selectHistory = (state) => state.history

// Memoized selectors
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectStatusFilter, selectCategoryFilter, selectPriorityFilter, selectSearchQuery, selectSortBy, selectSortOrder],
  (tasks, statusFilter, categoryFilter, priorityFilter, searchQuery, sortBy, sortOrder) => {
    let filtered = [...tasks]

    // Filter by status
    if (statusFilter === 'active') {
      filtered = filtered.filter((task) => !task.completed)
    } else if (statusFilter === 'completed') {
      filtered = filtered.filter((task) => task.completed)
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((task) => task.category === categoryFilter)
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter((task) => task.priority === priorityFilter)
    }

    // Filter by search query (Title and Description only)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          (task.description && task.description.toLowerCase().includes(query))
      )
    }

    // Sort tasks
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority]
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'createdAt':
        default:
          comparison = new Date(a.createdAt) - new Date(b.createdAt)
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }
)

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const active = total - completed
  const completionRate = total > 0 ? (completed / total) * 100 : 0

  const byPriority = {
    high: tasks.filter((t) => t.priority === 'high').length,
    medium: tasks.filter((t) => t.priority === 'medium').length,
    low: tasks.filter((t) => t.priority === 'low').length,
  }

  const byCategory = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1
    return acc
  }, {})

  return {
    total,
    completed,
    active,
    completionRate,
    byPriority,
    byCategory,
  }
})

export const selectCanUndo = (state) => state.history.past.length > 0
export const selectCanRedo = (state) => state.history.future.length > 0
export const selectToast = (state) => state.toast


