import React from 'react'
import { useState } from 'react';
import NavigationDashboard from './dashboard_nav'
import { useSelector, useDispatch } from "react-redux"
import config from "../../data/config.json";
import axios from 'axios';
import { useParams } from "react-router-dom"
import { useEffect } from 'react';
import { addProduct } from '../../store/reducers/product.reducer';

export default function Product() {

    const profile = useSelector((state) => state.user);
    const [inputs, setInputs] = useState('');
    const [submit_status_message, set_submit_status_message] = useState('');
    const { productid } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {

        async function fetchData(productid) {
            try {
                const getProduct = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/allproducts/${productid}`, {
                    headers: {
                        "Authorization": `Bearer ${profile.token}`
                    }
                });
                const prodResult = getProduct.data[0];
                setInputs(prodResult);

            } catch (error) {
                console.log(error);
            }
        }

        if (productid) {
            fetchData(productid);
        } else {
            setInputs('');
        }
    }, [productid])



    async function submitme(e) {
        e.preventDefault();

        if (productid) {
            try {
                const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/product`, inputs,
                    {
                        headers: {
                            "Authorization": `Bearer ${profile.token}`
                        }
                    });
                set_submit_status_message('Product Edited successfully!');
                setInputs('');
            } catch (error) {
                console.log(error);
                set_submit_status_message('Error: Editing product: ' + error.message);
            }
        } else {
            const product_inp = { ...inputs, seller: profile._id };

            console.log(product_inp);
            try {
                const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/product`, product_inp,
                    {
                        headers: {
                            "Authorization": `Bearer ${profile.token}`
                        }
                    });
                set_submit_status_message('Product added successfully!');
                setInputs('');
                dispatch(addProduct(product_inp));
            } catch (error) {
                console.log(error);
                set_submit_status_message('Error: Adding product: ' + error.message);
            }
        }
    }

    function handleChange(event) {
        const curName = event.target.name;
        const curValue = event.target.value;
        setInputs({ ...inputs, [curName]: curValue });
    }

    return (
        <>
            <NavigationDashboard />
            <div className="innerDiv">
                <h2>Main page for Products</h2>

                <form onSubmit={submitme}>
                    <table cellPadding={5} cellSpacing={5}>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor='name'>Name</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={inputs.name || ""}
                                        onChange={handleChange}

                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor='category'>Category</label>
                                </td>
                                <td><input
                                    type="text"
                                    name="category"
                                    id='category'
                                    value={inputs.category || ""}
                                    onChange={handleChange}

                                /></td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor='details'>Details</label>
                                </td>
                                <td><input
                                    type="text"
                                    name="details"
                                    id='details'
                                    value={inputs.details || ""}
                                    onChange={handleChange}

                                /></td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor='quantity'>Quantity</label>
                                </td>
                                <td><input
                                    type="text"
                                    name="quantity"
                                    id='quantity'
                                    value={inputs.quantity || ""}
                                    onChange={handleChange}

                                /></td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor='size'>Size</label>
                                </td>
                                <td><input
                                    type="text"
                                    name="size"
                                    id='size'
                                    value={inputs.size || ""}
                                    onChange={handleChange}

                                /></td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor='price'>Price</label>
                                </td>
                                <td><input
                                    type="text"
                                    name="price"
                                    id='price'
                                    value={inputs.price || ""}
                                    onChange={handleChange}

                                /></td>
                            </tr>

                            <tr>
                                <td colSpan={2}>
                                    <input type="submit" name="submit" value={productid ? 'Edit Product' : 'Add Product'} style={{ width: '100%' }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {submit_status_message && submit_status_message}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </form>


            </div>
        </>

    )
}
