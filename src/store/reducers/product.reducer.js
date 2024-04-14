import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../data/config.json";

//import data from "../../data/product.json"

async function fetchData() {
	try {
		const products = await axios.get(`${config.baseurl}/allproducts`);
		return products.data
	} catch (error) {
		console.log(error);
	}
}

const productSlice = createSlice({
	name: "products",
	initialState: await fetchData(),
	reducers: {
		decrementQuantity: (state, action) => {
			//console.log(state[0].quantity);
			console.log(action.payload);

			// let temp_state = [...state];
			// let update_prod = temp_state.find(v => v.id ===action.payload.id);
			// update_prod.quantity -= 1;
			//console.log(current(state.find((v) => v._id === action.payload._id)));

			state.find(
				(current_state_item) =>
					current_state_item._id === action.payload._id
			).quantity -= 1;
		},
		incrementQuantity: (state, action) => {
			//console.log(current(state.find((v) => v.id === action.payload.id)));
			state.find((v) => v._id === action.payload._id).quantity += 1;
		},
		addProduct: (state, action) =>{
			state = state.push(action.payload); 
		}
	},
});

export const { decrementQuantity, incrementQuantity, addProduct } = productSlice.actions;

export default productSlice.reducer;
