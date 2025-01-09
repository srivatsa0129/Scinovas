import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDash() {
  const navigate = useNavigate();
  const [newAdmin, setNewAdmin] = useState({
    companyname: "",
    nameprefixes: "Mr.",
    ownername: "",
    username: "",
    password: "",
    confirmpassword: "",
    companyDesc: "",
    companyLogo: null,
    phoneNumber: "",
    countryPrefix: "+91",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFieldErrors((prev) => ({ ...prev, password: false }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setFieldErrors((prev) => ({ ...prev, confirmpassword: false }));
  };

  const validateFields = () => {
    const errors = {};
    if (!newAdmin.companyname.trim()) errors.companyname = true;
    if (!newAdmin.ownername.trim()) errors.ownername = true;
    if (!newAdmin.username.trim()) errors.username = true;
    if (!password.trim()) errors.password = true;
    if (!confirmPassword.trim() || password !== confirmPassword) {
      errors.confirmpassword = true;
    }
    if (!newAdmin.phoneNumber.trim()) errors.phoneNumber = true;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddAdmin = () => {
    if (!validateFields()) {
      return;
    }

    if (editIndex !== null) {
      setAdmins((prev) =>
        prev.map((admin, index) =>
          index === editIndex ? { ...newAdmin, password } : admin
        )
      );
    } else {
      setAdmins((prev) => [...prev, { ...newAdmin, password }]);
    }

    setNewAdmin({
      companyname: "",
      nameprefixes: "Mr.",
      ownername: "",
      username: "",
      password: "",
      confirmpassword: "",
      companyDesc: "",
      companyLogo: null,
      phoneNumber: "",
      countryPrefix: "+91",
    });
    setPassword("");
    setConfirmPassword("");
    setEditIndex(null);
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

  const handleEditAdmin = (index) => {
    const adminToEdit = admins[index];
    setNewAdmin({ ...adminToEdit });
    setPassword(adminToEdit.password);
    setConfirmPassword(adminToEdit.password);
    setEditIndex(index);
    window.scrollTo(0, 0);
  };

  const handleDeleteAdmin = (index) => {
    const updatedAdmins = admins.filter((_, i) => i !== index);
    setAdmins(updatedAdmins);
  };

  return (
    <div
      className="container-fluid py-4"
      // style={{
      //   backgroundColor: "#282745",
      //   minHeight: "100vh",
      //   color: "#ffffff",
      // }}
    >
      {/* <h1 className="text-center mb-4">Admin Management</h1> */}
      <div className="card p-4 mb-4" style={{ backgroundColor: "#2c3a47" }}>
        <h1 className="text-center mb-4" style={{ color: "#2db3e3" }}>
          Admin Management
        </h1>
        {/* Form Section */}
        <div className="row mb-3" style={{ color: "#ffffff" }}>
          <div className="col-12 col-md-6">
            <label>Company Name</label>
            <input
              type="text"
              className={`form-control ${
                fieldErrors.companyname ? "is-invalid" : ""
              }`}
              name="companyname"
              value={newAdmin.companyname}
              onChange={handleInputChange}
              placeholder="Enter company name"
              style={{
                backgroundColor: "#3e4e5a",
                color: "#ffffff",
                opacity: "0.9",
              }}
            />
            {fieldErrors.companyname && (
              <div className="invalid-feedback">
                Company name is a required field.
              </div>
            )}
          </div>
          <div className="col-12 col-md-6" style={{ color: "#ffffff" }}>
            <label>Person of Contact</label>
            <div className="d-flex">
              <select
                className="form-select me-2"
                name="nameprefixes"
                value={newAdmin.nameprefixes}
                onChange={handleInputChange}
                style={{
                  backgroundColor: "#3e4e5a",
                  color: "#ffffff",
                  opacity: "0.9",
                }}
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
              <input
                type="text"
                className={`form-control ${
                  fieldErrors.ownername ? "is-invalid" : ""
                }`}
                name="ownername"
                value={newAdmin.ownername}
                onChange={handleInputChange}
                placeholder="Enter name"
                style={{
                  backgroundColor: "#3e4e5a",
                  color: "#ffffff",
                  opacity: "0.9",
                }}
              />
            </div>
            {fieldErrors.ownername && (
              <div className="invalid-feedback">
                Owner name is a required field.
              </div>
            )}
          </div>
        </div>

        {/* Username and Phone Number */}
        <div className="row mb-3" style={{ color: "#ffffff" }}>
          <div className="col-12 col-md-6">
            <label>Username</label>
            <input
              type="text"
              className={`form-control ${
                fieldErrors.username ? "is-invalid" : ""
              }`}
              name="username"
              value={newAdmin.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              style={{
                backgroundColor: "#3e4e5a",
                color: "#ffffff",
                opacity: "0.9",
              }}
            />
            {fieldErrors.username && (
              <div className="invalid-feedback">
                Username is a required field.
              </div>
            )}
          </div>
          <div className="col-12 col-md-6" style={{ color: "#ffffff" }}>
            <label>Phone Number</label>
            <div className="d-flex">
              <select
                className="form-select me-2"
                name="countryPrefix"
                value={newAdmin.countryPrefix}
                onChange={handleInputChange}
                style={{
                  backgroundColor: "#3e4e5a",
                  color: "#ffffff",
                  opacity: "0.9",
                }}
              >
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japan)</option>
              </select>
              <input
                type="text"
                className={`form-control ${
                  fieldErrors.phoneNumber ? "is-invalid" : ""
                }`}
                name="phoneNumber"
                value={newAdmin.phoneNumber}
                onChange={handleInputChange}
                style={{
                  backgroundColor: "#3e4e5a",
                  color: "#ffffff",
                  opacity: "0.9",
                }}
                placeholder="Enter phone number"
              />
            </div>
            {fieldErrors.phoneNumber && (
              <div className="invalid-feedback">
                Phone number is a required field.
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3" style={{ color: "#ffffff" }}>
          <div className="col-12 col-md-6">
            <label>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  fieldErrors.password ? "is-invalid" : ""
                }`}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
                style={{
                  backgroundColor: "#3e4e5a",
                  color: "#ffffff",
                  opacity: "0.9",
                }}
              />
              <span
                className="input-group-text"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  aria-hidden="true"
                ></i>
              </span>
            </div>
            {fieldErrors.password && (
              <div className="invalid-feedback">
                Password is a required field.
              </div>
            )}
          </div>
          <div className="col-12 col-md-6" style={{ color: "#ffffff" }}>
            <label>Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control ${
                  fieldErrors.confirmpassword ? "is-invalid" : ""
                }`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm password"
                style={{
                  backgroundColor: "#3e4e5a",
                  color: "#ffffff",
                  opacity: "0.9",
                }}
              />
              <span
                className="input-group-text"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`fa ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  aria-hidden="true"
                ></i>
              </span>
            </div>
            {fieldErrors.confirmpassword && (
              <div className="invalid-feedback">
                Confirm password is a required field.
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3" style={{ color: "#ffffff" }}>
          <div className="col-12">
            <label>Company Description</label>
            <textarea
              className={`form-control ${
                fieldErrors.companyDesc ? "is-invalid" : ""
              }`}
              name="companyDesc"
              value={newAdmin.companyDesc}
              onChange={handleInputChange}
              rows="4"
              style={{
                backgroundColor: "#3e4e5a",
                color: "#ffffff",
                opacity: "0.9",
              }}
              placeholder="Enter company description"
            />
            {fieldErrors.companyDesc && (
              <div className="invalid-feedback">
                Company description is a required field.
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 text-center">
            <button
              className="btn btn-primary"
              onClick={handleAddAdmin}
              style={{ backgroundColor: "green", width: "50%" }}
            >
              {editIndex !== null ? "Update Admin" : "Add Admin"}
            </button>
          </div>
        </div>
      </div>

      {/* <div className="mt-4">
        <h2 className="text-center">Admins List</h2>
        <div className="table-responsive">
          <table
            className="table table-dark table-hover text-center"
            style={{ backgroundColor: "#2c3a47" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Owner Name</th>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{admin.companyname}</td>
                  <td>{admin.ownername}</td>
                  <td>{admin.username}</td>
                  <td>{admin.phoneNumber}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditAdmin(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteAdmin(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan="6">No admins added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>*/}
    </div>
  );
}

export default AdminDash;
