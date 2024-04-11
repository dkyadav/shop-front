import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { decrementQuantity } from "../store/reducers/product.reducer";

import { addCart } from "../store/reducers/cart.reducer";

export default function Products() {

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

    // const [prods, SetProds] = useState(props.productlist);

    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();

    return (
        <>
            <h1>Products</h1>
            {
                products &&
                <div style={mainBox}>
                    {products.map(p => {
                        return (
                            <div style={subBox} key={p.id}>
                                Name: {p.name}<br/>
                                Quantity left: {p.quantity}<br/>
                                Price: {p.price}
                                <hr/>
                                {
                                    p.quantity > 0 &&
                                    <button onClick={()=>{dispatch(decrementQuantity(p));dispatch(addCart(p))}}>Add to cart</button>
                                }
                            </div>

                        )
                    })}
                </div>

            }
        </>


    )
};