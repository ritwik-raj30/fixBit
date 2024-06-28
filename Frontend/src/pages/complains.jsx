import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { allgetComplaintRoute, getComplaintsRoute } from "../utils/APIroutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteComplaintRoute } from "../utils/APIroutes";
// import { use } from "../../../Backend/routes/submit";

const GetComplaint = () => {
  const [allcomplaints, setallComplaints] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [isadmin, setisadmin] = useState(false);

  useEffect(() => {
    const fetchallComplaints = async () => {
      try {
        const response = await axios.get(allgetComplaintRoute);
        setallComplaints(response.data);
      } catch (error) {
        toast.error("Error fetching complaints. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    };

    fetchallComplaints();
  }, [complaints]);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `${getComplaintsRoute}/${
            JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )._id
          }`
        );
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
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    if (data && data.isadmin) {
      setisadmin(true);
    }
  }, []);
  const deletecomplain = async (id) => {
    try {
      await axios.delete(`${deleteComplaintRoute}/${id}`);
      toast.success("Complaint deleted successfully", {
        position: "bottom-right",
        autoClose: 5000,
      });
      setallComplaints(
        allcomplaints.filter((complaint) => complaint._id !== id)
      );
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
    } catch (error) {
      toast.error("Error deleting complaint. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <ComplaintsContainer>
      <h1>All Complaints</h1>
      <div className="complaints-list">
        {isadmin &&
          allcomplaints.map((allcomplaint) => (
            <div className="complaint" key={allcomplaint._id}>
              <div className="detail">
                <h2>{allcomplaint.username}</h2>
                <p>Roll Number: {allcomplaint.rollNumber}</p>
                <p>Issue: {allcomplaint.complaint}</p>
                <button onClick={() => deletecomplain(allcomplaint._id)}>
                  Delete
                </button>
              </div>
              <div className="image">
                {allcomplaint.imageUrl && (
                  <img src={allcomplaint.imageUrl} alt="Complaint Attachment" />
                )}
              </div>
            </div>
          ))}
        {!isadmin &&
          complaints.map((complaint) => (
            <div className="complaint" key={complaint._id}>
              <div className="detail">
                <h2>{complaint.username}</h2>
                <p>Roll Number: {complaint.rollNumber}</p>
                <p>Issue: {complaint.complaint}</p>
                <hr />
                <button onClick={() => deletecomplain(complaint._id)}>
                  Delete
                </button>
                {/* <button>Delete</button> */}
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
