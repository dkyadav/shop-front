import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {},
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
	},
});

export const { updateEmail, updateName, updatePhone } = userSlice.actions;

export default userSlice.reducer;