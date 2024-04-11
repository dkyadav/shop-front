import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Products from "./pages/products";
import Profile from "./pages/profile";
import Navigation from "./header/nav";
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
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
