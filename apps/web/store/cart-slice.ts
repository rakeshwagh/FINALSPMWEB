import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, ICartProduct } from "../lib/types/cart";
import { IProduct, SProduct } from "../lib/types/products";
import { calculateDiscountPercentage } from "../utilities/calculateDiscountPercentage";

const setItemFunc = (item, totalAmount, totalQuantity) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(item));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  }
};

const initialState: ICart = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(
      state: ICart | any,
      action: PayloadAction<{ product: IProduct | any; quantity: number }>
    ) {
      const newItem = action.payload.product;

      const existingItem = state.items.find((item) => item._id === newItem._id);

      state.totalQuantity = state.totalQuantity + action.payload.quantity;

      state.totalAmount =
        state.totalAmount +
        action.payload.quantity *
          (action.payload.product.discount
            ? calculateDiscountPercentage(
                action.payload.product.price,
                action.payload.product.discount
              )
            : action.payload.product.price);

      if (!existingItem) {
        const totalPrice =
          (newItem.discount
            ? calculateDiscountPercentage(newItem.price, newItem.discount)
            : newItem.price) * action.payload.quantity;

        state.items.push({
          ...newItem,
          quantity: action.payload.quantity,
          totalPrice,
        });
      } else {
        const totalPrice =
          existingItem.totalPrice +
          (existingItem.discount
            ? calculateDiscountPercentage(
                existingItem.price,
                existingItem.discount
              ) * action.payload.quantity
            : existingItem.price * action.payload.quantity);

        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = totalPrice;
      }
      setItemFunc(
        state.items.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    removeItemFromCart(
      state: ICart,
      action: PayloadAction<string> //_id as payload
    ) {
      const productSlug = action.payload;
      const existingItem = state.items.find((item) => item._id === productSlug);

      state.totalQuantity--;

      state.totalAmount =
        state.totalAmount -
        (existingItem?.discount
          ? calculateDiscountPercentage(
              existingItem.price,
              existingItem.discount
            )
          : existingItem?.price)!;

      if (existingItem?.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== productSlug);
      } else {
        existingItem!.quantity--;
        existingItem!.totalPrice =
          existingItem!.totalPrice -
          (existingItem?.discount
            ? calculateDiscountPercentage(
                existingItem.price,
                existingItem.discount
              )
            : existingItem?.price)!;
      }
      setItemFunc(
        state.items.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // Remove cart items from local storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("totalAmount");
        localStorage.removeItem("totalQuantity");
      }
    },
    setItemsFromLocalStorage(
      state: ICart,
      action: PayloadAction<{
        items: ICartProduct[];
        totalAmount: number;
        totalQuantity: number;
      }>
    ) {
      console.log("Setting Item From Local Storage");
      const { items, totalAmount, totalQuantity } = action.payload;
      console.log(items, totalAmount, totalQuantity);
      state.items = items;
      state.totalAmount = totalAmount;
      state.totalQuantity = totalQuantity;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
