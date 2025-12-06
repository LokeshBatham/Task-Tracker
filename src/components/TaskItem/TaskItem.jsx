import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { toggleTask, deleteTask } from '../../store/slices/tasksSlice'
import { showToast } from '../../store/slices/toastSlice'
import TaskForm from '../TaskForm/TaskForm'
import Modal from '../Modal/Modal'
import { format } from 'date-fns'
import './TaskItem.css'

const TaskItem = ({ task, index }) => {
  const dispatch = useDispatch()
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleToggle = () => {
    dispatch(toggleTask(task.id))
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    dispatch(deleteTask(task.id))
    dispatch(showToast({
      message: `Task "${task.title}" deleted successfully`,
      type: 'success',
      duration: 3000,
    }))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'var(--danger-color)'
      case 'medium':
        return 'var(--warning-color)'
      case 'low':
        return 'var(--success-color)'
      default:
        return 'var(--text-secondary)'
    }
  }

  const getPriorityLabel = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1)
  }

  const truncateText = (text, maxLength) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`task-item ${task.completed ? 'completed' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
            style={{
              ...provided.draggableProps.style,
              opacity: snapshot.isDragging ? 0.8 : 1,
            }}
          >
            <div className="task-item-content">
              <div className="task-checkbox-wrapper" onMouseDown={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onChange={(e) => {
                    e.stopPropagation()
                    handleToggle()
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="task-checkbox"
                  aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <label htmlFor={`task-${task.id}`} className="sr-only">
                  Toggle task completion
                </label>
              </div>

              <div className="task-details">
                <div className="task-header">
                  <h3 className="task-title" title={task.title}>
                    {truncateText(task.title, 15)}
                  </h3>
                  <div className="task-badges">
                    <span
                      className="task-priority"
                      style={{ '--priority-color': getPriorityColor(task.priority) }}
                    >
                      {getPriorityLabel(task.priority)}
                    </span>
                    <span className="task-category">{task.category}</span>
                  </div>
                </div>

                {task.description && (
                  <p className="task-description" title={task.description}>
                    {truncateText(task.description, 25)}
                  </p>
                )}

                <div className="task-meta">
                  <span className="task-date">
                    Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}
                  </span>
                  {task.updatedAt !== task.createdAt && (
                    <span className="task-date">
                      Updated: {format(new Date(task.updatedAt), 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
              </div>

              <div className="task-actions">
                <button
                  className="btn-icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowEditForm(true)
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  aria-label={`Edit task "${task.title}"`}
                  title="Edit task"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  className="btn-icon btn-icon-danger"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete()
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  aria-label={`Delete task "${task.title}"`}
                  title="Delete task"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>

      {showEditForm && (
        <TaskForm task={task} onClose={() => setShowEditForm(false)} />
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  )
}

export default TaskItem


