import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectStatusFilter,
  selectCategoryFilter,
  selectPriorityFilter,
  selectSortBy,
  selectSortOrder,
} from '../../store/selectors'
import './FilterButton.css'

const FilterButton = ({ onOpenModal }) => {
  const statusFilter = useSelector(selectStatusFilter)
  const categoryFilter = useSelector(selectCategoryFilter)
  const priorityFilter = useSelector(selectPriorityFilter)
  const sortBy = useSelector(selectSortBy)
  const sortOrder = useSelector(selectSortOrder)

  // Count active filters
  const activeFiltersCount = [
    statusFilter !== 'all',
    categoryFilter !== 'all',
    priorityFilter !== 'all',
    sortBy !== 'createdAt',
    sortOrder !== 'desc',
  ].filter(Boolean).length

  return (
    <button
      className="filter-button"
      onClick={onOpenModal}
      aria-label="Open filters"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
      <span>Filters</span>
      {activeFiltersCount > 0 && (
        <span className="filter-badge">{activeFiltersCount}</span>
      )}
    </button>
  )
}

export default FilterButton

