import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { updateEmail, updateName, updateToken } from "../../store/reducers/user.reducer";
import { useEffect } from 'react';

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(updateName(""));
        dispatch(updateEmail(""));
        dispatch(updateToken(""));
        localStorage.removeItem("token");
        navigate("/login");
    }, []);
    return (
        <>logout submenu</>
    )
}
