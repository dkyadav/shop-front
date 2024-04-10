import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import productReducer from "./reducers/product.reducer";
import cartReducer from "./reducers/cart.reducer";

export default configureStore({
	reducer: {
        profile: userReducer,
        products: productReducer,
        cart: cartReducer,
    },
});
