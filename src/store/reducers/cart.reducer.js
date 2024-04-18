import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addCart: (state, action) => {
			//Immer] An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.

			let new_state = state;
			const exists = state.filter(
				(item) => item._id === action.payload._id
			);
			if (exists[0]) {
				new_state = new_state.map((item) => {
					if (item._id === action.payload._id) {
						const newq = item.quantity + action.payload.quantity;
						const newprice = item.price + (action.payload.price * action.payload.quantity);
						return { ...item, quantity: newq, price: newprice };
					} else {
						return item;
					}
				});
			} else {
				const cart_item = {
					...action.payload,
					price: action.payload.price * action.payload.quantity,
				};
				new_state.push(cart_item);
			}

			return new_state;
		},
		removeCart: (state, action) => {
			return state.filter((item) => item._id !== action.payload);
		},
		emptyCart: (state, action) => {
			return [];
		},
	},
});

export const { addCart, removeCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
