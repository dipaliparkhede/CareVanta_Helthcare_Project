import { createSlice } from '@reduxjs/toolkit';

const initialLang = localStorage.getItem('carevanta_lang') || 'en';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    language: initialLang, // 'en', 'hi', 'mr'
    toast: null,
    activeModal: null
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('carevanta_lang', action.payload);
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
