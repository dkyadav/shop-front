import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { updateEmail, updateName, updateToken, updateId } from "../store/reducers/user.reducer";
import config from "../data/config.json";
//import config from '../data/config'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { LoginSchema } from '../validations/login.validate';

import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default function Login() {

    console.log(process.env.REACT_APP_BASE_URL);
    const profile = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState('');
    const navigate = useNavigate();

    const [formerror, setFormerror] = useState();
    const [formSubmitError,setformSubmitError] = useState('');

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
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signin`, inputs);
            console.log(response.data);
            const user_info = jwtDecode(response.data.token);
            console.log(user_info);
            dispatch(updateName(user_info.name));
            dispatch(updateEmail(user_info.email));
            dispatch(updateToken(response.data.token));
            dispatch(updateId(user_info._id));
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard/profile");
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
            setformSubmitError(`Error: ${error.response.data.message}`);
        }

    }

    function handleChange(event) {
        const curName = event.target.name;
        const curValue = event.target.value;

        const validateResult = LoginSchema[curName].validate(curValue);
        //console.log(validateResult.error.details[0].message);
        console.log(validateResult);
        if (validateResult.error) {
            setFormerror({ ...formerror, [curName]: validateResult.error.details[0].message });
        } else {
            setFormerror({ ...formerror, [curName]: '' });
        }

        setInputs({ ...inputs, [curName]: curValue });
    }

    return (

        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>

                {formSubmitError && <Alert severity="error">{formSubmitError}</Alert>}


                <Box component="form" onSubmit={submitme} noValidate sx={{ mt: 1 }}>

                    <TextField
                        margin="normal"
                        name="email"
                        label="Email Address"
                        autoComplete="email"
                        fullWidth
                        value={inputs.email || ""}
                        onChange={handleChange}

                    />
                    {formerror && formerror.email != "" ?
                        <>{formerror.email}</>
                        : null}

                    <TextField
                        margin="normal"
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        value={inputs.password || ""}
                        onChange={handleChange}

                    />
                    {formerror && formerror.password ? <>{formerror.password}</> : ""}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>

                </Box>

            </Box>
        </Container>

    )
}
