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


function App() { 
	return (
		<div>
			<BrowserRouter>
				<Navigation />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />}>
						<Route
							path="/products/:productid"
							element={<Products />}
						/>
					</Route>
					<Route path="/cart" element={<Cart />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* <Route path="/dashboard" element={<ProtectedRoute/>}>
						<Route path="main" element={<Main />} />
                        <Route path="profile" element={<Profile />} />
						<Route path="logout" element={<Logout />} />
						<Route path="*" element={<Main />} />
					</Route> */}
					
					<Route path="/dashboard">
						<Route path="main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
                        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
						<Route path="product" element={<ProtectedRoute><Product /></ProtectedRoute>} />
						<Route path="order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
						<Route path="logout" element={<Logout />} />
						<Route path="*" element={<ProtectedRoute><Main /></ProtectedRoute>} />
                    </Route>

				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
