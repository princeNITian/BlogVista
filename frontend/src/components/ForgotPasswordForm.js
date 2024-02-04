// frontend/src/components/ForgotPasswordForm.js
import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://blog-vista-api.vercel.app/auth/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Reset Link
        </button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
