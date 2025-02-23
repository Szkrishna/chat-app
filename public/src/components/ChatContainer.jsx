import React from 'react';
import styled from 'styled-components';
import default_avatar from "../assets/default_avatar.png";

export default function ChatContainer({ currentChat }) {
    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        {currentChat.avatarImage ?
                            <img src={currentChat.avatarImage} alt="avatar" />
                            : (
                                <img src={default_avatar} alt="avatar" style={{ borderRadius: "50%", height: "2rem", margin: "0.5rem" }} />
                            )}
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
            </div>
        </Container>
    )
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

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;