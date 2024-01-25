// frontend/src/components/BlogList.js
import React, { useEffect, useState } from "react";
import FilterBlogs from "./FilterBlogs";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faBlog,
  faBookOpenReader,
  faDeleteLeft,
  faEdit,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", summary: "" });

  const handleParagraphClick = (content) => {
    setModalContent(content);
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  useEffect(() => {
    // Fetch the list of blogs when the component mounts
    axios
      .get("https://blog-vista-api.vercel.app/blogs", {
        headers: {
          Authorization: localStorage.getItem("_token"),
        },
      })
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFilter = ({ tagFilter, minRating, publicationDate }) => {
    // Fetch filtered blogs based on the provided filter options
    const queryParams = new URLSearchParams({
      tag: tagFilter,
      minRating,
      publicationDate,
    });

    axios
      .get(`http://localhost:5000/blogs/filter?${queryParams}`, {
        headers: {
          Authorization: localStorage.getItem("_token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (blogId) => {
    axios
      .delete(`https://blog-vista-api.vercel.app/blogs/delete/${blogId}`, {
        headers: {
          Authorization: localStorage.getItem("_token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        // setBlogs(response.data);
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/blogs">
          <FontAwesomeIcon className="mx-2" icon={faBlog} />
          BlogVista
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
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
              <Link
                className="nav-link"
                onClick={() => localStorage.removeItem("_token")}
                to="/"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="d-flex justify-content-center mt-2">
        <Link to="/blogs/add-blog" className="text-muted lead">
          <FontAwesomeIcon icon={faAdd} className="mx-2" />
          Add New Blog
        </Link>
      </div>
      <FilterBlogs onFilter={handleFilter} />
      <hr />
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="row">
          {blogs.map((blog) => (
            <div key={blog._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">
                    <a
                      href={blog.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-info"
                    >
                      Explore Again
                    </a>
                    <Link
                      to={`/blogs/edit-blog/${blog._id}`}
                      className="mx-2 text-secondary lead"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <span className="mx-2 text-danger lead">
                      <FontAwesomeIcon
                        onClick={() => handleDelete(blog._id)}
                        icon={faDeleteLeft}
                      />
                    </span>
                  </p>
                  <p className="card-text text-muted">
                    <strong>Tags:</strong> {blog.tags.join(", ")}
                  </p>
                  <p className="card-text">
                    <strong>Rating:</strong> {blog.rating}
                  </p>
                  <p
                    className="card-text"
                    style={{
                      overflow: "hidden",
                      "white-space": "nowrap",
                      "text-overflow": "ellipsis",
                    }}
                  >
                    <strong>Summary:</strong> {blog.summary}
                  </p>
                  <p className="card-text">
                    <strong>Publication Date:</strong>{" "}
                    {new Date(blog.publicationDate).toLocaleDateString()}
                  </p>
                  <p
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "gray",
                    }}
                    onClick={() =>
                      handleParagraphClick({
                        title: blog.title,
                        summary: blog.summary,
                      })
                    }
                  >
                    Show Summary
                    <FontAwesomeIcon className="mx-2" icon={faBookOpenReader} />
                  </p>

                  <div
                    className={`modal fade ${modalShow ? "show" : ""}`}
                    style={{ display: modalShow ? "block" : "none" }}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden={!modalShow}
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="exampleModalCenterTitle"
                          >
                            Summary: {modalContent.title}
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={handleClose}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <p>{modalContent.summary}</p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={handleClose}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`modal-backdrop fade ${modalShow ? "show" : ""}`}
                    style={{ display: modalShow ? "block" : "none" }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
