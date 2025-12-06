import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../../store/slices/filtersSlice'
import { selectSearchQuery } from '../../store/selectors'
import './SearchBar.css'

const SearchBar = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery)

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value))
  }

  return (
    <div className="search-bar">
      <label htmlFor="search-input" className="sr-only">
        Search tasks
      </label>
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleChange}
          aria-label="Search tasks by title and description"
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => dispatch(setSearchQuery(''))}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar


