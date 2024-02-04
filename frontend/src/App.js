// frontend/src/App.js
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBlogForm from "./components/AddBlogForm";
import BlogList from "./components/BlogList";
import EditBlogForm from "./components/EditBlogForm";
import FilterBlogs from "./components/FilterBlogs";
import LoginForm from "./components/LoginForm"; // Import the login component
import RegisterForm from "./components/RegisterForm"; // Import the registration component
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route
          path="/blogs/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/add-blog" element={<AddBlogForm />} />
                <Route path="/edit-blog/:id" element={<EditBlogForm />} />
                <Route path="/filter-blogs" element={<FilterBlogs />} />
                <Route path="/" element={<BlogList />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
