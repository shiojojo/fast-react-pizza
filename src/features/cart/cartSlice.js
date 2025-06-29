import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: 'Mediterranean',
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // action.payload: { pizzaId, name, quantity, unitPrice, totalPrice }
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // action.payload: pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // action.payload: pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    decreaseItemQuantity(state, action) {
      // action.payload: pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

// カート内の全商品の合計数量を返すセレクタ関数
export const totalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// カート内の全商品の合計金額を返すセレクタ関数
export const totalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// カートの中身を取得するセレクタ
export const getCart = (state) => state.cart.cart;

// 指定したpizzaIdのカート内数量を返すセレクタ
export const getCurrentQuantityById = (pizzaId) => (state) => {
  const item = state.cart.cart.find((item) => item.pizzaId === pizzaId);
  return item?.quantity ?? 0;
};

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
