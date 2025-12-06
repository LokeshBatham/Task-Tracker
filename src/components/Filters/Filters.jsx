import { useDispatch, useSelector } from 'react-redux'
import {
  setStatusFilter,
  setCategoryFilter,
  setPriorityFilter,
  setSortBy,
  setSortOrder,
  resetFilters,
} from '../../store/slices/filtersSlice'
import {
  selectStatusFilter,
  selectCategoryFilter,
  selectPriorityFilter,
  selectSortBy,
  selectSortOrder,
  selectCategories,
} from '../../store/selectors'
import './Filters.css'

const Filters = ({ isModal = false, onClose }) => {
  const dispatch = useDispatch()
  const statusFilter = useSelector(selectStatusFilter)
  const categoryFilter = useSelector(selectCategoryFilter)
  const priorityFilter = useSelector(selectPriorityFilter)
  const sortBy = useSelector(selectSortBy)
  const sortOrder = useSelector(selectSortOrder)
  const categories = useSelector(selectCategories)

  const handleReset = () => {
    dispatch(resetFilters())
    if (isModal && onClose) {
      onClose()
    }
  }

  return (
    <div className={`filters ${isModal ? 'filters-modal' : ''}`} role="group" aria-label="Task filters">
      {isModal && (
        <div className="filters-modal-header">
          <h2>Filters</h2>
          <button
            className="filters-close-btn"
            onClick={onClose}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>
      )}
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="status-filter" className="filter-label">
            Status
          </label>
          <select
            id="status-filter"
            className="filter-select"
            value={statusFilter}
            onChange={(e) => dispatch(setStatusFilter(e.target.value))}
            aria-label="Filter by status"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter" className="filter-label">
            Category
          </label>
          <select
            id="category-filter"
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter" className="filter-label">
            Priority
          </label>
          <select
            id="priority-filter"
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => dispatch(setPriorityFilter(e.target.value))}
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-by" className="filter-label">
            Sort By
          </label>
          <select
            id="sort-by"
            className="filter-select"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            aria-label="Sort tasks"
          >
            <option value="createdAt">Date Created</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-order" className="filter-label">
            Order
          </label>
          <select
            id="sort-order"
            className="filter-select"
            value={sortOrder}
            onChange={(e) => dispatch(setSortOrder(e.target.value))}
            aria-label="Sort order"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <button
          className="btn btn-secondary btn-reset"
          onClick={handleReset}
          aria-label="Reset all filters"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Filters


