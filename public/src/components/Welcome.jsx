import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const setUser = async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    }
    setUser();
  }, []);
  return (
    <>
      <Container>
        <div className='logout-container'><Logout /></div>
        <div className='welcome'>
          <img src={Robot} alt="Robot" />
          <h1>
            Welcome, <span>{userName}!</span>
          </h1>
          <h3>Please select a chat to start Messaging</h3>
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  .logout-container {
    display: flex;
    justify-content: end;
    padding: 1rem 2rem;
  }
  .welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    padding: 2rem;
    img {
      height: 20rem;
    }
    span {
      color: #4e0eff;
    }
  }
`;
