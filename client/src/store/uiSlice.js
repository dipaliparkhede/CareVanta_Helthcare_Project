import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    language: 'en', // 'en', 'hi', 'mr'
    toast: null, // { type: 'success' | 'error' | 'info', message: string }
    activeModal: null
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    showToast: (state, action) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    }
  }
});

export const { setLanguage, showToast, hideToast, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
