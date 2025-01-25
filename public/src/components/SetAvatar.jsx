import React, { useEffect, useState } from "react";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    return (
        <>
            <Container>
                <ToastContainer />
            </Container>
        </>
    )
}

const Container = styled.div``

export default SetAvatar;