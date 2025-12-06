import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isVisible: false,
  message: '',
  type: 'success', // 'success', 'error', 'info'
  duration: 3000,
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.isVisible = true
      state.message = action.payload.message
      state.type = action.payload.type || 'success'
      state.duration = action.payload.duration || 3000
    },
    hideToast: (state) => {
      state.isVisible = false
    },
  },
})

export const { showToast, hideToast } = toastSlice.actions

export default toastSlice.reducer

