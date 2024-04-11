import { Link } from "react-router-dom";

import { useSelector } from "react-redux"

export default function Navigation({uname,cartitems}) {

	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);

	return (
		<ul>
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
				<Link to="/profile">Profile</Link>
			</li>
			<li>
				<Link to="/cart">Cart {cart.length}</Link>
			</li>
            <li style={{color:'red'}}>
                Welcome {user.name}
            </li>
		</ul>
	);
}
