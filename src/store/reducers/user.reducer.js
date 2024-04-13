import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import storage from "redux-persist/lib/storage";

const default_token = await storage.getItem("token");
const {
	email: default_email,
	name: default_name,
	id: default_id,
} = default_token ? jwtDecode(default_token) : "";

const userSlice = createSlice({
	name: "user",
	initialState: {
		_id: default_id ? default_id : "",
		name: default_name ? default_name : "",
		email: default_email ? default_email : "",
		phone: "",
		token: default_token ? default_token : "",
	},
	reducers: {
		updateName: (state, action) => {
			state.name = action.payload;
			//const temp_State = state;
			//temp_State.name = action.payload;
			//return temp_State;
		},
		updateEmail: (state, action) => {
			state.email = action.payload;
		},
		updatePhone: (state, action) => {
			state.phone = action.payload;
		},
		updateToken: (state, action) => {
			state.token = action.payload;
		},
		updateId: (state, action) => {
			state._id = action.payload;
		},
	},
});

export const { updateEmail, updateName, updatePhone, updateToken, updateId } =
	userSlice.actions;

export default userSlice.reducer;
