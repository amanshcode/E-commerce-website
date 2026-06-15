import { createSlice } from '@reduxjs/toolkit';

let initialCartItems = [];
try {
  const stored = localStorage.getItem('cartItems');
  if (stored) {
    initialCartItems = JSON.parse(stored);
  }
} catch (error) {
  console.error('Error loading cart from localStorage:', error);
  initialCartItems = [];
}

const initialState = {
  cartItems: initialCartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.productId === item.productId);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productId === existItem.productId ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      try {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.productId !== action.payload);
      try {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      try {
        localStorage.removeItem('cartItems');
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;