import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { sendMessageRoute } from "../utils/APIroutes";

export default function ChatContainer({ currentChat,currentUser }) {
  if (!currentChat) {
    return <Container>No chat selected</Container>;
  }

  const handleSendMsg= async(msg) => {
    try {
      const response = await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
      console.log('Message sent : ',response.data);
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
  
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={currentChat.ProfileImage} alt="avatar" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout/>
      </div>
      <Messages />
      <ChatInput handleSendMsg={handleSendMsg}/> 
      
           </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  height: 100%;
  overflow: hidden;
  background-color: #080420;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem;
    background-color: #0d0d30;
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

  .chat-messages {
    padding: 1rem 2rem;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }

  .chat-input {
    padding: 1rem 2rem;
    background-color: #0d0d30;
    display: flex;
    align-items: center;
    gap: 1rem;
    input {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #ffffff34;
      color: white;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #4e0eff;
      color: white;
      cursor: pointer;
    }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    .chat-header {
      .user-details {
        .avatar {
          img {
            height: 2rem;
          }
        }
        .username {
          h3 {
            font-size: 1rem;
          }
        }
      }
    }
    .chat-input {
      input {
        font-size: 0.8rem;
      }
      button {
        font-size: 0.8rem;
      }
    }
  }
`;
