import { createSlice,current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addCart: (state, action) => {
			//Immer] An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.
			state.push(action.payload);
		},
		removeCart: (state, action) => {
			return state.filter(item=>item.id != action.payload);
		},
		emptyCart:(state,action) =>{
			return [];
		}
	},
});

export const { addCart, removeCart,emptyCart } = cartSlice.actions;

export default cartSlice.reducer;