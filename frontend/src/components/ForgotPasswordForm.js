// frontend/src/components/ForgotPasswordForm.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

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
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-header bg-light">
          <nav className="navbar navbar-light">
            <Link className="navbar-brand" to="/">
              <FontAwesomeIcon className="mx-2" icon={faBlog} />
              BlogVista
            </Link>
          </nav>
        </div>
        <div className="card-body">
          <h2 className="card-title">Forgot Password</h2>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Please enter your registered email.."
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Send Reset Link
            </button>
            {message && <p className="mt-3">{message}</p>}
          </form>
        </div>
        <div className="card-footer text-muted text-center bg-light">
          <Link to="/login">
            <FontAwesomeIcon className="mx-1" icon={faSignInAlt} />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
