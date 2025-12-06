import { useSelector } from 'react-redux'
import Toast from '../Toast/Toast'
import { selectToast } from '../../store/selectors'
import { hideToast } from '../../store/slices/toastSlice'
import { useDispatch } from 'react-redux'
import './ToastContainer.css'

const ToastContainer = () => {
  const dispatch = useDispatch()
  const toast = useSelector(selectToast)

  const handleClose = () => {
    dispatch(hideToast())
  }

  if (!toast.isVisible) return null

  return (
    <div className="toast-container">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={handleClose}
        duration={toast.duration}
      />
    </div>
  )
}

export default ToastContainer

