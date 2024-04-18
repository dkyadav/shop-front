import React from 'react'
import Select from './select'
import { useDispatch } from "react-redux"
import { decrementQuantity } from "../../store/reducers/product.reducer";
import { addCart } from "../../store/reducers/cart.reducer";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"

export default function ProductItem({ p }) {

    const dispatch = useDispatch();
    const [quan, setQuan] = useState(1);
    const navigate = useNavigate();

    const subBox = {
        width: "200px",
        border: "1px solid black",
        padding: "20px",
        margin: "20px"
    }

    const handleAddCart = (p) => {
        const prod = { ...p, quantity: quan }
        dispatch(decrementQuantity(prod));
        dispatch(addCart(prod))
    }

    function clicked(id){
        console.log('clicked'); 
        navigate(`/products/${id}`)
    }

    return (
        // <div style={subBox} onClick={()=>clicked(p._id)}>
        <div style={subBox}>
            <Link to={`/products/${p._id}`}>
            Name: {p.name}<br />
            Quantity left:{p.quantity}<br />
            Price: {p.price}
            </Link>
            <hr />
            {
                p.quantity > 0 && <>
                    <Select
                        quantity={p.quantity}
                        OnChange={(event) => setQuan(parseInt(event.target.value))}
                    />
                    {/* <select name="quantity" id="quantity" onChange={(event)=>setQuan(parseInt(event.target.value))}>{
                        Array.from({ length: p.quantity }).map((it, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)
                    }
                    </select> */}
                    <button onClick={() => handleAddCart(p)}>Add to cart</button>
                </>
            }
        </div>
    )
}