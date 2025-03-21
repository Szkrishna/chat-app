import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import default_avatar from "../assets/default_avatar.png";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import { MdMoreVert } from "react-icons/md";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("User")
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    const message = async () => {
      const data = await JSON.parse(
        localStorage.getItem("User")
      );
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    message();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("User")
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleButtons = (msg) => {
    setOpenMenuIndex(msg ? 0 : 1);
    console.log("openMenuIndex", openMenuIndex);
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            {currentChat.avatarImage
              ? <img src={currentChat.avatarImage} alt="avatar" />
              : <img className="default-avatar" src={default_avatar} alt="avatar" />
            }
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div className={`message ${message.fromSelf ? "sended" : "recieved"}`} >
                <div className="content">
                  <p>{message.message !== undefined ? message.message : ""}</p>
                </div>
                {message.fromSelf ?
                  <span className="edit-button">
                    <span class="dropdown">
                      <MdMoreVert size={24} onClick={()=>toggleButtons(message.message)} /> 
                      <label>
                        <input type="checkbox" />
                        <ul>
                          <li>Edit</li>
                          <li>Delete</li>
                        </ul>
                      </label>
                    </span>
                  </span> : ""
                }
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color:rgb(119, 130, 255);
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }

      .default-avatar {
        border-radius: 50%; 
        height: 2rem !important;
        margin: 0.5rem !important;
      }
          
      .username {
        h3 {
          color: white;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }

    .sended {
      justify-content: flex-end;

      .content {
        background-color: #4f04ff21;
      }

      .edit-button {
        color: #fff;
        cursor: pointer;
        margin-left: 0.25rem;

        .dropdown {
          position: relative;
          display: inline-block;
          font-size: 14px;
        }

        .dropdown:hover{
          cursor: pointer;
        }

        .dropdown > a, .dropdown > button {
          font-size: 14px;
          background-color: white;
          border: 1px solid #ccc;
          padding: 6px 20px 6px 10px;
          border-radius: 4px;
          display: inline-block;
          color: black;
          text-decoration: none;
        }

        .dropdown > a:before, .dropdown > button:before {
          position: absolute;
          right: 7px;
          top: 12px;
          content: ' ';
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid black;
        }

        .dropdown input[type=checkbox] {
          position: absolute;
          display: block;
          top: 0rem;
          left: 0rem;
          width: 100%;
          height: 100%;
          margin: 0rem;
          opacity: 0;
        }

        .dropdown input[type=checkbox]:checked {
          position: fixed;
          z-index:+0;
          top: 0rem; left: 0rem; 
          right: 0rem; bottom: 0rem;
        }

        .dropdown ul {
          position: absolute;
          top: 2rem;
          border-radius: 0.25rem;
          right: 0.5rem;
          list-style: none;
          padding: 0.25rem;
          display: none;
          background-color: #3a374d;
          box-shadow: 0 3px 6px rgba(0,0,0,.175);
        }

        .dropdown input[type=checkbox]:checked + ul {
          display: block;
        }

        .dropdown ul li {
          display: block;
          padding: 0.5rem 1rem;
          white-space: nowrap;
          border-radius: 0.25rem;
          background-color: #9a86f3;
          margin: 0.75rem;
          color: #fff;
          border: none;
          cursor: pointer;
        }

        .dropdown ul li:hover {
          background-color:rgb(140, 115, 252);
          cursor: pointer;
        }

        .dropdown ul li a {
          text-decoration: none;
          display: block;
          color: black
        }

        .dropdown .divider {
          height: 1px;
          margin: 9px 0;
          overflow: hidden;
          background-color: #e5e5e5;
          font-size: 1px;
          padding: 0;
        }
      }
    }

    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
