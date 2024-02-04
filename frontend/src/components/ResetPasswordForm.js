// frontend/src/components/ResetPasswordForm.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faBlog, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                  placeholder="Please enter your new password here.."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Reset Password
              </button>
            </form>
          )}
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

export default ResetPasswordForm;
