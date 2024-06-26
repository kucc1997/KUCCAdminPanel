import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useState} from 'react';
import {useLogin, useNotify, Notification} from 'react-admin';
import KUCCLogo from './assets/kucc.png'


export default function SignIn(onLogin) {
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email');
        const password = data.get('password');

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            notify("Invalid email address!", {type: "error"});
        } else {
            console.log({
                email: email,
                password: password,
            });
            // Email is valid
            login({email, password}).then((_) => {
                onLogin()
            }).catch((e) => {
                notify(e, {type: "error"});
            });

        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                mt={0}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: "white", height: 200, width: 200, padding: 3}} src={KUCCLogo}>
                </Avatar>
                <Typography component="h1" variant="h5" mt="0.5em">
                    Sup! Please Log In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}} textAlign="start">
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Box mt={"0.6em"}>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Log In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
