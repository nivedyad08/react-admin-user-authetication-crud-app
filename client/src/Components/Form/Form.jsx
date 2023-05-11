import React, { useEffect, useState } from "react";
import "../Form/Form.css";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios";
import { handleLogout } from "../../utils/CommonFunctions";

export default function Form() {
  const data = useSelector((state) => state.user.userInfo.data);

  const { userId } = useParams();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: "",
  });
  useEffect(() => {
    axios
      .get(`api/admin/users/details/${userId}`)
      .then((res) => {
        setUserInput(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const navigate = useNavigate();
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  //Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `api/user/change-password/${userId}`,
      input
    );
    alert(response.data.message);
    if (response.status === 200) {
      handleLogout();
      if (!data.isAdmin) {
        navigate("/login");
      }
    }
  };
  // //User details

  const [selectedFile, setSelectedFile] = useState("");
  const [isSelected, setIsSelected] = useState("");
  const [showImage, setImage] = useState("");
  //change profile image
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    setIsSelected(true);
  };
  //Change user details
  const handleUserDetails = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profilePic", selectedFile);
    }
    formData.append("name", userInput.name);
    formData.append("phone", userInput.phone);

    try {
      setUserInput({
        ...userInput,
        name: formData.get("name"),
        phone: formData.get("phone"),
      });
      const response = await axios.post(`/api/user/update/${userId}`, formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-style-10">
      <h1>Edit User Details!</h1>
      <div className="section">
        <span>1</span>Personal Details
      </div>
      <form onSubmit={handleUserDetails}>
        <div className="inner-wrap">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={userInput.name}
              onChange={(e) => {
                setUserInput({ ...userInput, [e.target.name]: e.target.value });
              }}
            />
          </label>
          <label>
            Email Address
            <input
              type="email"
              name="email"
              disabled
              value={userInput ? userInput.email : ""}
            />
          </label>
          <label>
            Phone Number
            <input
              type="text"
              name="phone"
              value={userInput ? userInput.phone : ""}
              onChange={(e) =>
                setUserInput({ ...userInput, [e.target.name]: e.target.value })
              }
            />
          </label>
          <label>
            Profile Image
            <input type="file" onChange={handleFileChange} />
            {isSelected ? (
              <div>
                <img
                  src={showImage}
                  style={{ width: "40%" }}
                  name="profilPic"
                />
              </div>
            ) : (
              <img
                src={
                  userInput
                    ? `http://localhost:8080/user/${userInput.profilePic}`
                    : ""
                }
                style={{ width: "20%" }}
              />
            )}
          </label>
          <div className="button-section">
            <input type="submit" value="Update" />
          </div>
        </div>
      </form>

      <div className="section">
        <span>3</span>Passwords
      </div>
      <form onSubmit={handleChangePassword}>
        <div className="inner-wrap">
          <label>
            New Password{" "}
            <input
              type="password"
              name="newPassword"
              value={input.newPassword}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </label>
          <label>
            Confirm Password{" "}
            <input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </label>
        </div>
        <div className="button-section">
          <input type="submit" value="Change Password" />
        </div>
      </form>
    </div>
  );
}
