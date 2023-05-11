import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function UserHome() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { name, email, phone, _id, profilePic } = userInfo.data;

  return (
    <div className="card-container">
      <img
        className="round"
        src={profilePic ? `http://localhost:8080/user/${profilePic}` : ""}
      />
      <h3>{name}</h3>
      <h5>+91 {phone}</h5>
      <p>{email}</p>
      <div className="buttons">
        <Button
          className="primary"
          onClick={() => {
            navigate(`/edit/profile/${_id}`);
          }}
        >
          Edit Profile
        </Button>
        <Button className="primary ghost">Welcome {name}</Button>
        <Button />
      </div>
    </div>
  );
}
