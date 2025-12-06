import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, updateTask, addCategory } from '../../store/slices/tasksSlice'
import { selectCategories, selectPriorities } from '../../store/selectors'
import './TaskForm.css'

const TaskForm = ({ task, onClose }) => {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const priorities = useSelector(selectPriorities)

  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    category: task?.category || categories[0] || 'Other',
    priority: task?.priority || 'medium',
    newCategory: '',
  })

  const [errors, setErrors] = useState({})
  const [showNewCategory, setShowNewCategory] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Add new category if provided
    if (formData.newCategory.trim() && !categories.includes(formData.newCategory.trim())) {
      dispatch(addCategory(formData.newCategory.trim()))
    }

    if (task) {
      dispatch(updateTask({
        id: task.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.newCategory.trim() || formData.category,
        priority: formData.priority,
      }))
    } else {
      dispatch(addTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.newCategory.trim() || formData.category,
        priority: formData.priority,
      }))
    }

    onClose()
  }

  return (
    <div className="task-form-overlay" onClick={onClose}>
      <div className="task-form" onClick={(e) => e.stopPropagation()}>
        <div className="task-form-header">
          <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
          <button
            className="btn-close"
            onClick={onClose}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form-body">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter task title"
              aria-required="true"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <span id="title-error" className="error-message" role="alert">
                {errors.title}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input form-textarea"
              placeholder="Enter task description"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              {!showNewCategory ? (
                <div className="form-select-wrapper">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => setShowNewCategory(true)}
                  >
                    + New
                  </button>
                </div>
              ) : (
                <div className="form-select-wrapper">
                  <input
                    type="text"
                    name="newCategory"
                    value={formData.newCategory}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter new category"
                    autoFocus
                  />
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => {
                      setShowNewCategory(false)
                      setFormData((prev) => ({ ...prev, newCategory: '' }))
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-input form-select"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm


