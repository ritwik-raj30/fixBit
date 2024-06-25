import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getComplaintsRoute } from "../utils/APIroutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetComplaint = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(getComplaintsRoute);
        setComplaints(response.data);
      } catch (error) {
        toast.error("Error fetching complaints. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    };

    fetchComplaints();
  }, []);

  return (
    <ComplaintsContainer>
      <h1>All Complaints</h1>
      <div className="complaints-list">
        {complaints.map((complaint) => (
          <div className="complaint" key={complaint._id}>
            <div className="detail">
              <h2>{complaint.username}</h2>
              <p>Roll Number: {complaint.rollNumber}</p>
              <p>Issue: {complaint.complaint}</p>
            </div>
            <div className="image">
              {complaint.imageUrl && (
                <img src={complaint.imageUrl} alt="Complaint Attachment" />
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </ComplaintsContainer>
  );
};

const ComplaintsContainer = styled.div`
  padding: 2rem;
  background-color: #131324;
  min-height: 100vh;
  color: black;
  overflow-y: auto; /* Add scroll bar */

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: white; /* Added missing semicolon */
  }

  .complaints-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 80vh; /* Limit height and enable scroll */
    overflow-y: auto; /* Add scroll bar */
  }

  .complaint {
    display: flex;
    gap: 1rem;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;

    img {
      max-width: 500px;
      height: auto;
      margin-top: 1rem;
      border-radius: 0.5rem;
      object-fit: cover;
    }
  }
`;

export default GetComplaint;
