import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  // Set default username and password
  const [credentials, setCredentials] = useState({
    username: "padmaraj",
    password: "Padmaraj@2024",
  });
  const [errors, setErrors] = useState({ username: false, password: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setErrors({ ...errors, [name]: false }); // Clear errors when typing
  };

  const navigate = useNavigate();
  const handleLogin = () => {
    let newErrors = { username: false, password: false };
    if (!credentials.username) newErrors.username = true;
    if (!credentials.password) newErrors.password = true;

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!newErrors.username && !newErrors.password) {
      navigate("/dashboard");
    } else {
      setErrors("Invalid username or password.");
    }
  };

  const handleClear = () => {
    setCredentials({ username: "", password: "" });
    setErrors({ username: false, password: false });
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={errors.username ? "error" : ""}
            />
            {errors.username && (
              <span className="error-message">Required field</span>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">Required field</span>
            )}
          </div>
          <div className="button-group">
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
            <button className="clear-button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
