import { createSlice } from "@reduxjs/toolkit";

// Utility function to get cart from localStorage
const getCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  value: getCartFromLocalStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let product = [...state.value];
      let obj1 = action.payload;
      let matched = product.find((el) => el.id == obj1.id);

      if (matched) {
        product = product.map((el) => {
          if (el.id === obj1.id) {
            return { ...el, quantity: el.quantity + 1 };
          }
          return el;
        });
      } else {
        product.push(obj1);
      }
      state.value = product;
      localStorage.setItem("cart", JSON.stringify(state.value)); // Save to localStorage
    },
    increment: (state, action) => {
      let product = [...state.value];
      product[action.payload].quantity += 1;
      state.value = product;
      localStorage.setItem("cart", JSON.stringify(state.value)); // Save to localStorage
    },
    decrement: (state, action) => {
      let product = [...state.value];
      product[action.payload].quantity -= 1;
      state.value = product;
      localStorage.setItem("cart", JSON.stringify(state.value)); //save to local storage
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
