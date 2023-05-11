import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetailsSlice } from "../../redux-toolkit/userDetailsReducer";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Cookies from "js-cookie";
import "./Login.css";

//Material UI Component
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [inputValidation, setInputValidation] = useState({
    emailVal: false,
  });

  useEffect(() => {
    if (input.email) {
      const regEx = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
      setInputValidation((prevInputValidation) => ({
        ...prevInputValidation,
        emailVal: regEx.test(input.email),
      }));
    }
  }, [input.email]);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValidation.emailVal) {
      try {
        const response = await axios.post("api/auth/user/login", input);
        if (response.status === 200) {
          Cookies.set("token", response.data.token);
          dispatch(setUserDetailsSlice(response.data));
          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
            {!inputValidation.emailVal && input.email ? (
              <>
                <br />
                <label style={{ color: "red", fontSize: "0.7rem" }}>
                  Email does'nt match
                </label>
              </>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={input.password}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  variant="body2"
                  className="signup"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
