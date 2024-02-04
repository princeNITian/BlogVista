// frontend/src/components/ResetPasswordForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://blog-vista-api.vercel.app/auth/reset-password",
        {
          token: token,
          newPassword: password,
        }
      );
      setMessage(
        "Password reset successful. You can now log in with your new password."
      );
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      {message ? (
        <p>{message}</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;
