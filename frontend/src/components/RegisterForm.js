// frontend/src/components/RegisterForm.js
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://blog-vista-api.vercel.app/auth/register",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      setMessage(response.data.message);
      navigate("/login");
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
          <h2 className="card-title">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Please enter a working email.."
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Please enter your password here.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Register
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

export default RegisterForm;
