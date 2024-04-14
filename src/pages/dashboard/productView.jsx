import React from 'react'
import { useState, useEffect } from 'react'
import NavigationDashboard from './dashboard_nav'
import { useSelector } from "react-redux"
import axios from 'axios'
import config from "../../data/config.json";
import { useNavigate } from "react-router-dom";

import { authAxios } from '../../utils/axiosService'


export default function ProductView() {

    const [products, setProducts] = useState();
    const profile = useSelector((state) => state.user);
    const navigate = useNavigate();

    async function fetchData() {
        try {
            const products = await axios.get(`${config.baseurl}/admin/allproducts`, {
                headers: {
                    "Authorization": `Bearer ${profile.token}`
                }
            });
            // const products = await authAxios.get(`${config.baseurl}/admin/allproducts`);
            setProducts(products.data);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        console.log(profile.token);
        fetchData();
    }, [])

    const handleEdit = (id) => {
        console.log(`edit: ${id}`);
        navigate(`/dashboard/addproduct/${id}`)
    }

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm('Sure to delete?');
        if (shouldDelete) {
            console.log(`Delete: ${id}`);
            const del_Res = await axios.delete(`${config.baseurl}/product`, {
                headers: {
                    "Authorization": `Bearer ${profile.token}`
                },
                data: {
                    _id: id
                }
            });
            fetchData();
            console.log(del_Res.data);
        }

    }

    return (
        <>
            <NavigationDashboard />
            <div className="innerDiv">
                <h2>All Products</h2>
                {products &&
                    <table style={{ width: '100%', borderCollapse: "collapse", border: '1px solid #ccc' }} border="1">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Size</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => {
                                return (
                                    <tr key={p._id}>
                                        <td>{p.name}</td>
                                        <td>{p.quantity}</td>
                                        <td>{p.price}</td>
                                        <td>{p.category}</td>
                                        <td>{p.size}</td>
                                        <td>
                                            <button onClick={() => handleEdit(p._id)}>Edit</button>
                                            <button onClick={() => handleDelete(p._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
            </div>

        </>

    )
}
