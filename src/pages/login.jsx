import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { updateEmail, updateName, updateToken, updateId } from "../store/reducers/user.reducer";
import config from "../data/config.json";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { LoginSchema } from '../validations/login.validate';



export default function Login() {

    const profile = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState('');
    const navigate = useNavigate();

    const [formerror, setFormerror] = useState();

    // if(profile.token){
    //     console.log(`profile.token:${profile.token}`)
    //     navigate("/profile");

    // }




    useEffect(() => {
        if (profile.token) {
            navigate("/dashboard/profile");
        }
    }, []);

    const style_margin = {
        margin: "15px"
    }



    async function submitme(e) {
        e.preventDefault();
        console.log(inputs);
        console.log(JSON.stringify(inputs));

        const response = await axios.post(`${config.baseurl}/signin`, inputs);
        console.log(response.data);
        const user_info = jwtDecode(response.data.token);
        console.log(user_info);
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

        const validateResult = LoginSchema[curName].validate(curValue);
        //console.log(validateResult.error.details[0].message);
        console.log(validateResult);
        if (validateResult.error) {
            setFormerror({ ...formerror, [curName]: validateResult.error.details[0].message });
        } else{
            setFormerror({ ...formerror, [curName]: ''});
        }
        
        setInputs({ ...inputs, [curName]: curValue });
    }

    return (
        <div className='loginContainer'>
            <h2>Login</h2>
            <form onSubmit={submitme}>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                    style={{ marginLeft: "48px" }}
                />
                {formerror && formerror.email != "" ?
                    // <>{formerror.email.map(v=>({v}))}</>
                    <>{formerror.email}</>
                    : null}
                <br />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                    style={style_margin}
                />
                {formerror && formerror.password ? <>{formerror.password}</> : ""}
                <br />
                <input type="submit" name="submit" value="submit" style={{ width: '200px' }} />
            </form>
            {profile.token}
            <br />
            <Link to="/register">Register</Link>
        </div>
    )
}
