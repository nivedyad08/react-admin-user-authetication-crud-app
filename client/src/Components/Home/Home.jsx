import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import UserHome from "../User/UserHome";
import AdminHome from "../Admin/AdminHome";

function Home() {
  const [userInfo, setdata] = useState({});
  const data = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    setdata(data);
  }, [data, data.data.isAdmin]);
  return (
    <>
      {data.data.isAdmin == true ? <AdminHome /> : data.data.isAdmin == false ? <UserHome /> : ""}
    </>
  );
}
export default Home;
