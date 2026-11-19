import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('carevanta_token') || null;
let initialUser = null;
try {
  initialUser = JSON.parse(localStorage.getItem('carevanta_user')) || null;
} catch (e) {
  initialUser = null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    user: initialUser,
    isAuthenticated: !!initialToken,
    loading: false,
    error: null
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('carevanta_token', token);
      localStorage.setItem('carevanta_user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('carevanta_token');
      localStorage.removeItem('carevanta_user');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('carevanta_user', JSON.stringify(state.user));
    }
  }
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
