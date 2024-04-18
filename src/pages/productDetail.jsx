import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { decrementQuantity } from "../store/reducers/product.reducer";
import { addCart } from "../store/reducers/cart.reducer";
// import ProductItem from "./components/productItem";
import { useParams } from "react-router-dom"
import Select from './components/select'

export default function ProductDetail() {
    const mainBox = {
        display: "flex",
        flexWrap: "wrap"
    }

    const { productid } = useParams();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products);
    const [curProd, setCurProd] = useState({});
    const [quan, setQuan] = useState(1);
    

    useState(() => {
        console.log('called use state')
        // if (productid) {
            const cur_product = products.filter(v => v._id === productid);
            setCurProd(cur_product[0]);
        //}
    }, [quan])

    const handleAddCart = (p) => {
        const prod = { ...p, quantity: quan }
        dispatch(decrementQuantity(prod));
        dispatch(addCart(prod));
        setCurProd({...p, quantity:p.quantity-quan})
    }

    return (
        <>
            <h1>Products</h1>
            {curProd &&
                <div>
                    <p>
                        Name: {curProd.name}
                    </p>
                    <p>
                        Price: {curProd.price}
                    </p>
                    <p>
                        Detail: {curProd.detail}
                    </p>
                    <p>
                        Category: {curProd.category}
                    </p>
                    <p>
                        Size: {curProd.size}
                    </p>
                    <p>
                        DateAdded: {curProd.insert}
                    </p>
                    <p>
                        Quantity List: {curProd.quantity}
                    </p>

                    {curProd.quantity > 0 && <>
                        <Select
                            quantity={curProd.quantity}
                            OnChange={(event) => setQuan(parseInt(event.target.value))}
                        />
                        {/* <select name="quantity" id="quantity" onChange={(event)=>setQuan(parseInt(event.target.value))}>{
                        Array.from({ length: p.quantity }).map((it, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)
                    }
                    </select> */}
                        <button onClick={() => handleAddCart(curProd)}>Add to cart</button>
                    </>}
                </div>
            }
        </>


    )
};