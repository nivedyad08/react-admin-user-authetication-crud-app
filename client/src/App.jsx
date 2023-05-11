import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./Services/ProtectedRoutes";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/SignUp";
import HomePage from "./Pages/Home/Home";
import EditProfile from "./Pages/EditProfile/EditProfile";
import EditUserProfile from "./Pages/EditUserProfile/EditUserProfile";
import Header from "./Components/Header/Header";

import axios from "./config/axios";
import Cookies from "js-cookie";
import { setUserDetailsSlice } from "./redux-toolkit/userDetailsReducer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [datas, setdata] = useState();
  const isAuth = Cookies.get("token");
  const data = useSelector((state) => state.user.userInfo);
  const isAdmin = data.data.isAdmin;
  useEffect(() => {
    setdata(data);
  }, [data]);
  const getData = async () => {
    try {
      const data = await axios.get("api/auth/getuserdata");
      dispatch(setUserDetailsSlice(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAuth && getData();
  }, []);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <ProtectedRoutes>
            <LoginPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoutes>
            <SignupPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoutes>
            <LoginPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Header />
          </ProtectedRoutes>
        }
      >
        <Route
          path="/edit/profile/:userId"
          element={!isAdmin ? <EditProfile /> : <Navigate to="/" replace />}
        />
        <Route index element={<HomePage />} />

        <Route
          path="/admin/edit/user/:userId"
          element={isAdmin ? <EditUserProfile /> : <Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;
