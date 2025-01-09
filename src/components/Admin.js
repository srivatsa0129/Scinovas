import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Dashboard from "./Dashboard";

function Admin() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    companyName: "",
    companyDescription: "",
    companyLogo: null,
  });
  const [filterText, setFilterText] = useState(""); // State for the filter text
  const [error, setError] = useState(""); // State for error messages

  const navigate = useNavigate(); // React Router navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, companyLogo: e.target.files[0] });
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    const { username, password, companyName, companyDescription } = formData;

    // Reset any previous error messages
    setError("");

    // Form validation
    if (!username || !password || !companyName || !companyDescription) {
      setError("Please fill in all fields.");
      return;
    }

    // Password validation (example: must be at least 6 characters long)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Proceed to add user if validation passes
    setUsers([
      ...users,
      { username, password, companyName, companyDescription },
    ]);

    // Reset the form
    setFormData({
      username: "",
      password: "",
      companyName: "",
      companyDescription: "",
      companyLogo: null,
    });
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.username.toLowerCase().includes(filterText.toLowerCase()) ||
      user.companyName.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  const navigateToDashboard = () => {
    navigate("/dashboard"); // Navigate to the dashboard page
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="admin-page">
      {/* Header Section with Dashboard Button */}
      <div className="admin-header">
        <button onClick={navigateToDashboard} className="nav-button-dashboard">
          Dashboard
        </button>
        <button onClick={handleLogout} className="nav-button-logout">
          Logout
        </button>
      </div>

      {/* Content Section */}
      <div className="admin-content">
        {/* Left Side - Add User Form */}
        <div className="add-user-form">
          <h2>Add User</h2>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleAddUser}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Description</label>
              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Company Logo</label>
              <input
                type="file"
                name="companyLogo"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
        </div>

        {/* Right Side - User Table */}
        <div className="user-table">
          <h2>Added Users</h2>

          {/* Filter Box */}
          <div className="filter-box">
            <input
              type="text"
              placeholder="Search by Username or Company Name"
              value={filterText}
              onChange={handleFilterChange}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Company Name</th>
                <th>Company Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.companyName}</td>
                  <td>{user.companyDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
