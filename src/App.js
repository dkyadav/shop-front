import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Products from "./pages/products";
import Navigation from "./header/nav";
import Login from "./pages/login";
import Register from "./pages/register";
import Main from "./pages/dashboard/main";
import Profile from "./pages/dashboard/profile";
import Logout from "./pages/dashboard/logout";
import NavigationDashboard from "./pages/dashboard/dashboard_nav";
import ProtectedRoute from "../src/utils/ProtectedRoutes";
import Product from "./pages/dashboard/product";
import Order from "./pages/dashboard/order";
import ProductView from "./pages/dashboard/productView";
import { ImageUpload } from "./pages/preview";
import ProductDetail from "./pages/productDetail";
// import axios from "axios";

// axios.interceptors.request.use(
// 	(config) => {
// 		config.headers.Authorization = `Bearer ${localStorage.getItem(
// 			"token"
// 		)}`;
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

function App() {
	return (
		<div>
			<BrowserRouter>
				<Navigation />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="products">
						<Route path="/products" element={<Products />} />
						<Route path="/products/:productid" element={<ProductDetail />} />
					</Route>
					<Route path="/cart" element={<Cart />} />
					<Route path="/img" element={<ImageUpload />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route path="/dashboard">
						<Route path="main" element={<ProtectedRoute><Main /></ProtectedRoute>}/>
						<Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
						<Route path="addproduct" element={<ProtectedRoute><Product /></ProtectedRoute>}>
							<Route path=":productid" element={<ProtectedRoute><Product /></ProtectedRoute>}/>
						</Route>
						<Route path="products" element={<ProtectedRoute><ProductView /></ProtectedRoute>}/>
						<Route path="order" element={<ProtectedRoute><Order /></ProtectedRoute>}/>
						<Route path="logout" element={<Logout />} />
						<Route path="*" element={<ProtectedRoute><Main /></ProtectedRoute>}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
