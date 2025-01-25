import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Buffer } from "buffer";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                navigate("/login");
            }
        };
        checkUser();
    }, [navigate]);
    

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );

            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(user)
                );
                navigate("/");
            } else {
                toast.error("Error setting avatar. Please try again.", toastOptions);
            }
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchAvatars = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                try {
                    const response = await axios.get(
                        `${api}/${Math.round(Math.random() * 1000)}`
                    );
                    const buffer = new Buffer(response.data);
                    if (isMounted) {
                        data.push(buffer.toString("base64"));
                    }
                } catch (err) {
                    console.error("Error fetching avatar:", err);
                }
            }
            if (isMounted) {
                setAvatars(data);
                setIsLoading(false);
            }
        }; 
        fetchAvatars();

        return () => {
            isMounted = false;
        };
    }, []);  
    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick an Avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => {
                            return (
                                <div
                                    className={`avatar ${selectedAvatar === index ? "selected" : ""
                                        }`}
                                >
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={setProfilePicture} className="submit-btn">
                        Set as Profile Picture
                    </button>
                    <ToastContainer />
                </Container>
            )}
        </>
    )
}

const Container = styled.div``

export default SetAvatar;