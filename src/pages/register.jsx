import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { updateEmail, updateId, updateName, updateToken } from "../store/reducers/user.reducer";
import config from "../data/config.json";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export default function Register() {

    const [inputs, setInputs] = useState('');
    const [role, setUserRole] = useState('user');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function submitme(e) {
        e.preventDefault();
        const register_inp = { ...inputs, role: role };
        console.log(register_inp);
        console.log(JSON.stringify(register_inp));
        const response = await axios.post(`${config.baseurl}/register`, register_inp);
        console.log(response.data);

        const user_info = jwtDecode(response.data.token);
        dispatch(updateName(user_info.name));
        dispatch(updateEmail(user_info.email));
        dispatch(updateToken(response.data.token));
        dispatch(updateId(user_info._id));
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard/profile");
    }

    function handleChange(event) {
        const curName = event.target.name;
        const curValue = event.target.value;
        if(curName === 'role')
            setUserRole(curValue);
        setInputs({ ...inputs, [curName]: curValue });
    }


    return (
        <div className='mainContainer'>
            <h2>Registration Form</h2>
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
                                <label htmlFor='email'>Email</label>
                            </td>
                            <td><input
                                type="text"
                                name="email"
                                id='email'
                                value={inputs.email || ""}
                                onChange={handleChange}

                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='password'>Password</label></td>
                            <td><input
                                type="password"
                                id='password'
                                name="password"
                                value={inputs.password || ""}
                                onChange={handleChange}

                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='cpassword'>Confirm Password</label></td>
                            <td><input
                                type="cpassword"
                                name="cpassword"
                                id='cpassword'
                                value={inputs.cpassword || ""}
                                onChange={handleChange}

                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='role'>User Role</label></td>
                            <td><select id='role' name="role" onChange={handleChange} >
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type="submit" name="submit" value="Register" style={{ width: '100%' }} />
                            </td>
                        </tr>
                    </tbody>
                </table>

            </form>
            <br />
            <Link to="/login">Login</Link>
        </div>
    )
}
