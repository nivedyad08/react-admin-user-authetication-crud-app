import React, { useState, useEffect } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";

//Material Ui
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
import { Input } from "@mui/material";

const theme = createTheme();

function Signup() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profilePic: "",
  });
  const [inputValidation, setInputValidation] = useState({
    nameVal: false,
    emailVal: false,
    passwordVal: false,
    phoneVal: false,
    profilePicVal: false,
  });

  useEffect(() => {
    if (input.email) {
      const regEx = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
      setInputValidation((prevInputValidation) => ({
        ...prevInputValidation,
        emailVal: regEx.test(input.email),
      }));
    }
    if (input.password) {
      let regEx = /((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/i;
      setInputValidation((prevInputValidation) => ({
        ...prevInputValidation,
        passwordVal: regEx.test(input.password),
      }));
    }
    if (input.name) {
      let regEx = /^[a-zA-Z0-9_\s]{5,}$/;
      setInputValidation((prevInputValidation) => ({
        ...prevInputValidation,
        nameVal: regEx.test(input.name),
      }));
    }
    if (input.phone) {
      let regEx = /^[0-9]{10}$/;
      setInputValidation((prevInputValidation) => ({
        ...prevInputValidation,
        phoneVal: regEx.test(input.phone),
      }));
    }
    if (!input.profilePic) {
      setInputValidation((prevInputValidation) => ({
        ...prevInputValidation,
        profilePicVal: true,
      }));
    } else {
      setInputValidation((prevInputValidation) => ({
        ...prevInputValidation,
        profilePicVal: false,
      }));
    }
  }, [input.email, input.password, input.name, input.phone, input.profilePic]);

  const [selectedFile, setSelectedFile] = useState("");
  const [showImage, setImage] = useState("");
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputValidation.nameVal &&
      inputValidation.emailVal &&
      inputValidation.passwordVal &&
      inputValidation.profilePicVal
    ) {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("profilePic", selectedFile);
        formData.append("name", input.name);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("phone", input.phone);
      }
      try {
        const response = await axios.post("api/auth/user/register", formData);
        alert(response.data.message);
        if (response.status === 200) {
          navigate("/login");
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoFocus
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                />
                {!inputValidation.nameVal && input.name ? (
                  <>
                    <br />
                    <label style={{ color: "red", fontSize: "0.7rem" }}>
                      Username is required
                    </label>
                  </>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                />
                {!inputValidation.passwordVal && input.password ? (
                  <>
                    <br />
                    <label style={{ color: "red", fontSize: "0.7rem" }}>
                      Password must be strong
                    </label>
                  </>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  autoComplete="new-password"
                  value={input.phone}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                />
                {!inputValidation.phoneVal && input.phone ? (
                  <>
                    <br />
                    <label style={{ color: "red", fontSize: "0.7rem" }}>
                      Phone number is not valid
                    </label>
                  </>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <label>
                  Profile Image :{" "}
                  {showImage ? (
                    <img
                      src={showImage}
                      style={{ width: "20%" }}
                      name="profilPic"
                    />
                  ) : (
                    ""
                  )}
                  {!inputValidation.profilePicVal && input.profilePic ? (
                    <>
                      <br />
                      <label style={{ color: "red", fontSize: "0.7rem" }}>
                        Image is required
                      </label>
                    </>
                  ) : (
                    ""
                  )}
                </label>
                <Input type="file" onChange={handleFileChange} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
