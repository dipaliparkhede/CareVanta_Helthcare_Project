import { createSlice } from '@reduxjs/toolkit';

let initialCart = [];
try {
  initialCart = JSON.parse(localStorage.getItem('carevanta_cart')) || [];
} catch (e) {
  initialCart = [];
}

const calculateTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const grandTotal = subtotal + delivery;
  return { subtotal, delivery, grandTotal };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialCart,
    ...calculateTotals(initialCart)
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i._id === item._id);
      if (existing) {
        existing.quantity += (item.quantity || 1);
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      localStorage.setItem('carevanta_cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(i => i._id !== id);
      } else {
        const item = state.items.find(i => i._id === id);
        if (item) item.quantity = quantity;
      }
      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      localStorage.setItem('carevanta_cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      localStorage.setItem('carevanta_cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.delivery = 0;
      state.grandTotal = 0;
      localStorage.removeItem('carevanta_cart');
    }
  }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
