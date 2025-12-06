import { useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { reorderTasks } from '../../store/slices/tasksSlice'
import { selectFilteredTasks, selectAllTasks } from '../../store/selectors'
import TaskItem from '../TaskItem/TaskItem'
import './TaskList.css'

const TaskList = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectFilteredTasks)
  const allTasks = useSelector(selectAllTasks)

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    if (result.source.index === result.destination.index) {
      return
    }

    // Map filtered task indices to actual indices in full tasks array
    const draggedTaskId = tasks[result.source.index].id
    const destinationTaskId = tasks[result.destination.index].id
    
    const sourceIndex = allTasks.findIndex(task => task.id === draggedTaskId)
    const destinationIndex = allTasks.findIndex(task => task.id === destinationTaskId)

    if (sourceIndex === -1 || destinationIndex === -1) {
      return
    }

    dispatch(
      reorderTasks({
        sourceIndex: sourceIndex,
        destinationIndex: destinationIndex,
      })
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-state">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="empty-icon"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          <h3>No tasks found</h3>
          <p>Try adjusting your filters or add a new task to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {tasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TaskList


