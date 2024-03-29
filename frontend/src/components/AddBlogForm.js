// frontend/src/components/AddBlogForm.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const navigate = useNavigate();

  const handleAddBlog = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://blog-vista-api.vercel.app/blogs/add",
        {
          title,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
          rating,
          summary,
          publicationDate,
        },
        {
          headers: {
            Authorization: localStorage.getItem("_token"),
          },
        }
      );

      console.log(response.data);
      navigate("/blogs");
    } catch (error) {
      console.error(error.response.data.message);
    }
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
      <h2>Add New Blog</h2>
      <form onSubmit={handleAddBlog}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Provide some title e.g. AR Intro Guide"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content Link
          </label>
          <input
            className="form-control"
            id="content"
            value={content}
            placeholder="Copy the blog link and paste here e.g. https://12factor.net"
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. technology,crypto,backend,frontend,engineering,books"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <input
            type="number"
            className="form-control"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="0"
            max="5"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="summary" className="form-label">
            Summary
          </label>
          <textarea
            className="form-control"
            id="summary"
            rows="2"
            value={summary}
            placeholder="Taking notes about your understanding of a topic can be beneficial in various ways in the future."
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="publicationDate" className="form-label">
            Publication Date
          </label>
          <input
            type="date"
            className="form-control"
            id="publicationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlogForm;
