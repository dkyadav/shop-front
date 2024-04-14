import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { updateEmail, updateId, updateName, updateToken } from "../../store/reducers/user.reducer";
import { useEffect } from 'react';

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(updateName(""));
        dispatch(updateEmail(""));
        dispatch(updateToken(""));
        dispatch(updateId(""));
        localStorage.removeItem("token");
        navigate("/login");
    }, []);
    return (
        <>logout submenu</>
    )
}
