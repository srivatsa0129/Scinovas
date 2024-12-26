import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDash.css";

function AdminDash() {
  const navigate = useNavigate();
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
    companyName: "",
    companyDesc: "",
    companyLogo: null,
    phoneNumber: "",
    countryPrefix: "+91",
  });
  const [admins, setAdmins] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const countryPrefixes = [
    { code: "+91", name: "India" },
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
    { code: "+61", name: "Australia" },
    { code: "+49", name: "Germany" },
    { code: "+81", name: "Japan" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If phoneNumber is changed, allow only digits
    if (name === "phoneNumber") {
      const sanitizedValue = value.replace(/\D/g, ""); // Removes any non-numeric characters
      setNewAdmin((prev) => ({
        ...prev,
        phoneNumber: sanitizedValue, // Store the phone number without the prefix
      }));
    } else {
      setNewAdmin((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCountryPrefixChange = (e) => {
    setNewAdmin((prev) => ({
      ...prev,
      countryPrefix: e.target.value, // Update country prefix
    }));
  };

  const handleFileChange = (e) => {
    setNewAdmin((prev) => ({ ...prev, companyLogo: e.target.files[0] }));
  };

  const handleAddAdmin = () => {
    if (!newAdmin.username.trim() || !newAdmin.password.trim()) {
      alert("Username and password cannot be empty.");
      return;
    }
    setAdmins((prev) =>
      editIndex !== null
        ? prev.map((admin, index) =>
            index === editIndex ? { ...newAdmin } : admin
          )
        : [...prev, { ...newAdmin }]
    );
    setNewAdmin({
      username: "",
      password: "",
      companyName: "",
      companyDesc: "",
      companyLogo: null,
      phoneNumber: "",
      countryPrefix: "+91",
    });
    setEditIndex(null);
  };

  const openModal = (type, data = null, index = null) => {
    setModalType(type);
    setModalData(data);
    setEditIndex(index);
  };

  const closeModal = () => {
    setModalType(null);
    setModalData(null);
    setEditIndex(null);
  };

  const handleDeleteAdmin = () => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins((prev) => prev.filter((_, i) => i !== editIndex));
      closeModal();
    }
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    navigate("/");
    setIsLogoutModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Management</h1>
      <div className="admin-form">
        <input
          type="text"
          name="username"
          value={newAdmin.username}
          onChange={handleInputChange}
          placeholder="Enter username"
          className="admin-input"
        />
        <input
          type="password"
          name="password"
          value={newAdmin.password}
          onChange={handleInputChange}
          placeholder="Enter password"
          className="admin-input"
        />
        <input
          type="text"
          name="companyName"
          value={newAdmin.companyName}
          onChange={handleInputChange}
          placeholder="Enter company name"
          className="admin-input"
        />
        <input
          type="text"
          name="companyDesc"
          value={newAdmin.companyDesc}
          onChange={handleInputChange}
          placeholder="Enter company description"
          className="admin-input"
        />

        {/* Phone Number field with dropdown for country prefix */}
        <div className="phone-input-container">
          <select
            name="countryPrefix"
            value={newAdmin.countryPrefix}
            onChange={handleCountryPrefixChange}
            className="admin-input-select"
          >
            {countryPrefixes.map((prefix) => (
              <option key={prefix.code} value={prefix.code}>
                {prefix.name} ({prefix.code})
              </option>
            ))}
          </select>
          <input
            type="text"
            name="phoneNumber"
            value={newAdmin.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            className="admin-input"
            pattern="\d*" // Ensure only digits are allowed
          />
        </div>

        <input
          type="file"
          name="companyLogo"
          onChange={handleFileChange}
          className="admin-input-file"
        />
        <button onClick={handleAddAdmin} className="admin-button">
          {editIndex !== null ? "Update Admin" : "Add Admin"}
        </button>
        <button onClick={openLogoutModal} className="logout-button">
          Logout
        </button>
      </div>
      <div className="admin-table-container">
        <h2>Admin List</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Company Name</th>
              <th>Company Description</th>
              <th>Phone Number</th> {/* Added Phone Number Column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index}>
                <td>{admin.username}</td>
                <td>{admin.companyName}</td>
                <td>{admin.companyDesc}</td>
                <td>
                  {admin.countryPrefix} {admin.phoneNumber}
                </td>{" "}
                {/* Display Phone Number with prefix */}
                <td>
                  <button
                    onClick={() => openModal("view", admin)}
                    className="admin-action-button view-button"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openModal("edit", admin, index)}
                    className="admin-action-button edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal("delete", admin, index)}
                    className="admin-action-button delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Modal for Logout Confirmation */}
      {isLogoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Are you sure you want to log out?</h2>
            <div className="modal-actions">
              <button
                onClick={handleConfirmLogout}
                className="modal-button save-button"
              >
                Yes
              </button>
              <button
                onClick={handleCancelLogout}
                className="modal-button cancel-button"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal for Admin View, Edit, Delete */}
      {modalType && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>
              {modalType === "view"
                ? "View Admin Details"
                : modalType === "edit"
                ? "Edit Admin"
                : "Delete Admin"}
            </h2>
            <div className="modal-content">
              {modalType === "view" && modalData && (
                <p>
                  <strong>Username:</strong> {modalData.username}
                  <br />
                  <strong>Password:</strong> {modalData.password}
                  <br />
                  <strong>Company Name:</strong> {modalData.companyName}
                  <br />
                  <strong>Company Description:</strong> {modalData.companyDesc}
                  <br />
                  <strong>Phone Number:</strong> {modalData.countryPrefix}{" "}
                  {modalData.phoneNumber} <br />
                  <strong>Company Logo:</strong>{" "}
                  {modalData.companyLogo
                    ? modalData.companyLogo.name
                    : "Not uploaded"}
                </p>
              )}
              {modalType === "edit" && (
                <>
                  <input
                    type="text"
                    name="username"
                    value={newAdmin.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    className="modal-input"
                  />
                  <input
                    type="password"
                    name="password"
                    value={newAdmin.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className="modal-input"
                  />
                  <input
                    type="text"
                    name="companyName"
                    value={newAdmin.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="modal-input"
                  />
                  <input
                    type="text"
                    name="companyDesc"
                    value={newAdmin.companyDesc}
                    onChange={handleInputChange}
                    placeholder="Enter company description"
                    className="modal-input"
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    value={newAdmin.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="modal-input"
                  />
                </>
              )}
              {modalType === "delete" && (
                <p>Are you sure you want to delete this admin?</p>
              )}
            </div>
            <div className="modal-actions">
              {modalType === "edit" && (
                <button onClick={handleAddAdmin} className="modal-button">
                  Save Changes
                </button>
              )}
              {modalType === "delete" && (
                <button
                  onClick={handleDeleteAdmin}
                  className="modal-button delete-button"
                >
                  Confirm Delete
                </button>
              )}
              <button
                onClick={closeModal}
                className="modal-button cancel-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDash;
