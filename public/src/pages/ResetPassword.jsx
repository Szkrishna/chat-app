import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyEmailRoute, resetPasswordRoute } from "../utils/APIRoutes";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "", confirmPassword: "" });
  const [isResetting, setIsResetting] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateEmail = () => {
    if (values.email.trim() === "") {
      toast.error("Please enter a valid email.", toastOptions);
      return false;
    }
    return true;
  };

  const validateNewPassword = () => {
    if (values.password.trim() === "" || values.confirmPassword.trim() === "") {
      toast.error("Password fields cannot be empty.", toastOptions);
      return false;
    }
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match.", toastOptions);
      return false;
    }
    return true;
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    if (validateEmail()) {
      try {
        const { data } = await axios.post(verifyEmailRoute, { email: values.email });
        if (!data.status) {
          toast.error(data.msg, toastOptions);
        } else {
          setIsResetting(true);
          // toast.success("Verification link sent to email!", toastOptions);
          console.log("data ===>", data)
        }
      } catch (error) {
        toast.error("Error sending request. Try again later.", toastOptions);
      }
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (validateNewPassword()) {
      try {
        const { data } = await axios.post(resetPasswordRoute, {
          email: values.email,
          password: values.password,
        });

        if (!data.status) {
          toast.error(data.msg, toastOptions);
        } else {
          toast.success("Password reset successful! Redirecting to login...", toastOptions);
          setTimeout(() => navigate("/login"), 3000);
          setValues({ email: "", password: "", confirmPassword: "" });
        }
      } catch (error) {
        toast.error("Error resetting password. Try again later.", toastOptions);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={isResetting ? handlePasswordSubmit : handleEmailSubmit}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>

          {!isResetting ? (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <button type="submit">Reset Password</button>
            </>
          ) : (
            <>
              <input
                type="password"
                placeholder="New Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </>
          )}
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 4rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    min-width: 250px !important;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #997af0;
    }
  }
`;
