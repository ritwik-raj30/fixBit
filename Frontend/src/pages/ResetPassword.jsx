import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { id, token } = useParams();
  const[resetSuccess, setresetSuccess]=useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5500/api/auth/reset-password/${id}/${token}`, { newPassword });
      setMessage(response.data.message);
      setresetSuccess(true);
    } catch (error) {
      setMessage('Error resetting password');
    }
  };
  const handleLoginRedirect = () => {
    navigate('/user-login');
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
  
      </form>
      {message && <p>{message}</p>}
      {resetSuccess && (
        <button onClick={handleLoginRedirect}>Go to Login</button>
      )}
    </div>
  );
};

export default ResetPassword;