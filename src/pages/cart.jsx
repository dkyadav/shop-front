import { useSelector, useDispatch } from "react-redux";
import { removeCart, emptyCart } from "../store/reducers/cart.reducer";
import { incrementQuantity } from "../store/reducers/product.reducer";

export default function Cart() {

    const cartitemlist = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const mainBox = {
        display: "flex",
        flexWrap: "wrap"
    }

    const subBox = {
        width: "200px",
        border: "1px solid black",
        padding: "20px",
        margin: "20px"
    }

    return (
        <>
            <h1>Cart</h1>
            {
                cartitemlist &&
                <div style={mainBox}>

                    {cartitemlist.map((p,i) => {
                        return (
                            <div style={subBox} key={`${i}_${p._id}`}>
                                Name: {p.name}<br />
                                Quantity Added: {p.quantity}<br />
                                Price: {p.price}
                                <hr />
                                {
                                    p.quantity > 0 &&
                                    <button onClick={() => {
                                            dispatch(removeCart(p._id));
                                            dispatch(incrementQuantity(p))
                                        }
                                    }>Remove from cart</button>
                                }
                            </div>
                        )
                    })}

                </div>
            }
            {cartitemlist.length > 0 ? <button onClick={() => dispatch(emptyCart())}>Empty Cart</button> : ''}

        </>
    )
};