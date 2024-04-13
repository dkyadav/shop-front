import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function NavigationDashboard({ uname, cartitems }) {
	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);

	return (

		<ul className="innerMenu">
			<li>
				<Link to="/dashboard/main">Home</Link>
			</li>
			<li>
				<Link to="/dashboard/profile">Account Details</Link>
			</li>
			<li>
				<Link to="/dashboard/product">Products</Link>
			</li>
			<li>
				<Link to="/dashboard/order">Orders</Link>
			</li>
			<li>
				<Link to="/dashboard/logout">Logout</Link>
			</li>
		</ul>
	);
}
