import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function Navigation({ uname, cartitems }) {
	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);

	return (
		<ul className="mainnav">
			<li>
				{/* <a class="active" href=""> */}

				<Link to="/">
					<span>My Shop</span>
				</Link>

				{/* </a> */}
			</li>
			<li>
				<Link to="/products">Product</Link>
			</li>
			<li>
				<Link to="/img">Img</Link>
			</li>
			<li>
				<Link to="/cart">Cart {cart.length}</Link>
			</li>
			<li>
				{user.name ? (
					<Link to="/dashboard/main">Welcome1 {user.name}</Link>
				) : (
					<Link to="/login">Login</Link>
				)}
			</li>
		</ul>
	);
}
