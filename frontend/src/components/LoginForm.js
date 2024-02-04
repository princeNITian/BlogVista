// frontend/src/components/LoginForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://blog-vista-api.vercel.app/auth/login",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      localStorage.setItem("_token", response.data.token);
      navigate("/blogs");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("_token")) navigate("/blogs");
  }, [navigate]);

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
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Please enter a working email.."
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Login
            </button>
          </form>
        </div>
        <div className="card-footer text-muted text-center bg-light">
          <Link to="/register">
            <FontAwesomeIcon className="mx-2" icon={faUser} />
            Register
          </Link>
          <Link to="/forgot-password">
            <FontAwesomeIcon className="mx-2" icon={faLock} />
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
