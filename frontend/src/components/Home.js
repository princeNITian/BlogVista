// frontend/src/components/Home.js
import {
  faArrowCircleRight,
  faBlog,
  faCode,
  faSignInAlt,
  faSmile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("_token")) {
      navigate("/blogs");
    }
  }, [navigate]);
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <FontAwesomeIcon className="mx-2" icon={faBlog} />
          BlogVista
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <FontAwesomeIcon className="mx-1" icon={faUser} />
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <FontAwesomeIcon className="mx-1" icon={faSignInAlt} />
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="jumbotron">
        <h1 className="display-4">
          Welcome to BlogVista
          <FontAwesomeIcon className="mx-2" icon={faBlog} />
        </h1>
        <p className="lead">A Personal Blog Management App</p>
        <hr className="my-4" />
      </div>

      <section className="bg-light mb-5 p-4">
        <h2 className="mb-4">Introduction</h2>
        <div className="card">
          <div className="card-body">
            <p className="card-text lead">
              BlogVista is your go-to web application, crafted to empower you in
              managing and organizing your unique collection of blogs.
              Experience the freedom to store, categorize, rate, and summarize
              your favorite reads based on your personal journey. Dive into a
              world of features, including user-friendly tagging, time tracking,
              and advanced filtering options, all tailored to amplify your
              ability to revisit and rediscover valuable content.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-light mb-5 p-4">
        <h2 className="mb-4">Features</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User-Friendly Interface</h5>
                <p className="card-text">
                  Explore an interface designed for effortless management of
                  personal blogs.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Secure User Authentication</h5>
                <p className="card-text">
                  Ensure your account is secure with our robust user
                  authentication system.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Effortless Blog Management</h5>
                <p className="card-text">
                  Easily add, edit, and delete blogs, tailoring them to suit
                  your preferences and experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Intuitive Tagging System</h5>
                <p className="card-text">
                  Organize your blogs efficiently with an intuitive tagging
                  system for easy categorization.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Community-Driven Ratings</h5>
                <p className="card-text">
                  Rate and share your thoughts on each blog, contributing to a
                  community-driven evaluation of reading experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Time Tracking Feature</h5>
                <p className="card-text">
                  Track the time you spend on blogs, helping you stay informed
                  about your reading habits.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Efficient Blog Discovery</h5>
                <p className="card-text">
                  Discover blogs effortlessly with filtering and sorting options
                  based on tags, names, and publication dates.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Responsive UI with MERN Stack</h5>
                <p className="card-text">
                  Enjoy a responsive and visually appealing user interface
                  crafted with the latest MERN stack technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="mb-5 bg-light p-4">
        <h2 className="mb-4">See BlogVista in Action</h2>
        <div className="card">
          <div className="embed-responsive embed-responsive-16by9">
            {/* Replace the URL with the actual URL of your video */}
            <iframe
              className="card-img-top embed-responsive-item"
              src="https://www.youtube.com/embed/SCuiMqVa2GA"
              title="How to Use BlogVista"
              allowFullScreen
              style={{ height: "400px" }}
            ></iframe>
          </div>
          <div className="card-body">
            <p className="card-text text-center lead">
              Watch this video to learn how to make the most of BlogVista and
              enhance your blogging experience.
            </p>
          </div>
          <div className="card-footer text-center">
            <Link
              className="btn btn-outline-secondary"
              to="/register"
              role="button"
            >
              Get Started
              <FontAwesomeIcon className="mx-2" icon={faArrowCircleRight} />
            </Link>
          </div>
        </div>
      </section>

      <hr />

      {/* Footer Section */}
      <footer className="text-light p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card text-light bg-secondary">
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    <FontAwesomeIcon icon={faCode} className="mx-2" />
                    Tech Stack
                  </h5>
                  <li>Frontend: React, Bootstrap</li>
                  <li>Backend: Node.js, Express</li>
                  <li>Database: MongoDB</li>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="col-md-6">
              <div className="card text-light bg-secondary">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <FontAwesomeIcon icon={faSmile} className="mx-2" />
                    Conclusion
                  </h5>
                  <p>
                    Thank you for exploring BlogVista! Join us on this exciting
                    journey of blogging and discovery. Your stories matter, and
                    we're here to help you share them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* <section className="mb-5">
        <h2>3. Technology Stack:</h2>
        <h4>Frontend:</h4>
        <ul>
          <li>React.js for the user interface.</li>
          <li>Redux for state management.</li>
          <li>
            CSS for styling, with possible integration of styling libraries
            (e.g., Bootstrap).
          </li>
        </ul>
        <h4>Backend:</h4>
        <ul>
          <li>Node.js for server-side logic.</li>
          <li>Express.js for creating RESTful APIs.</li>
          <li>
            MongoDB as the database for storing user data and blog details.
          </li>
        </ul>
        <h4>Authentication:</h4>
        <ul>
          <li>JSON Web Token (JWT) for secure user authentication.</li>
        </ul>
      </section> */}

      {/* ... (similar sections for Features, Deployment, Testing, etc.) */}

      {/* <section className="mb-5">
        <h2>10. Conclusion:</h2>
        <p>
          BlogVista aims to provide users with an efficient and enjoyable way to
          manage their blog collection. By leveraging the MERN stack, the
          application will offer a seamless user experience with features that
          cater to the needs of avid blog readers.
        </p>
      </section> */}
    </div>
  );
};

export default Home;
