import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { verifyEmailRoute } from "../utils/APIroutes";

const EmailVerify = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false); // New state to handle email sent status

  const emailRegex = /^btech\d{5}\.\d{2}@bitmesra\.ac\.in$/;

  const handleEmailValidation = () => {
    if (email === "") {
      toast.error("Email is required.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Email format is incorrect. Use btech<rollno>.<year>@bitmesra.ac.in", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleEmailValidation()) {
      try {
        const response = await axios.post(verifyEmailRoute, { email });
        if (response.status === 200) {
          setEmailSent(true); // Set emailSent state to true
          toast.success("Verification link sent. Please check your email.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Error sending verification email. Please try again.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        toast.error("Error sending verification email. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Error in handleSubmit:", error);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Send Verification Link</Button>
        {emailSent && <Message>Email sent! Please check your email to verify.</Message>}
      </Form>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color:#131324 ;
`;

const Form = styled.form`
  display: flex;

  flex-direction: column;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  color: #28a745; /* Green color for success message */
  font-weight: bold;
`;

export default EmailVerify;
