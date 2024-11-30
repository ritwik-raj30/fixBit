import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Validation = () => {
  const { token } = useParams(); // Extract token from URL params
  const navigate = useNavigate();
  console.log("token is :", token)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/auth/verify-email/${token}`);
        console.log("hehehehehe",response.data)
        if (response.data.success) {
          // If the verification is successful, redirect to the register page with the email
          navigate("/register");
        } else {
          // Redirect to the verification page with an error query parameter if it fails
          navigate('/email?error=invalid');
        }
      } catch (error) {
        // Redirect to the verification page with an error query parameter if an exception occurs
        navigate('/email?error=invalid');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      {/* You can add a loading spinner or a message indicating that verification is in progress */}
      <p>Verifying your email...</p>
    </div>
  );
};

export default Validation;