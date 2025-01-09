import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  // Set default superuser and password
  const [credentials, setCredentials] = useState({
    superuser: "padmaraj",
    superpassword: "Padmaraj@2024",
  });
  const [errors, setErrors] = useState({
    superuser: false,
    superpassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setErrors({ ...errors, [name]: false }); // Clear errors when typing
  };

  const navigate = useNavigate();
  const handleLogin = () => {
    let newErrors = { superuser: false, superpassword: false };
    if (!credentials.superuser) newErrors.superuser = true;
    if (!credentials.superpassword) newErrors.superpassword = true;

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!newErrors.superuser && !newErrors.superpassword) {
      navigate("/dashboard");
    } else {
      setErrors("Invalid superuser or password.");
    }
  };

  const handleClear = () => {
    setCredentials({ superuser: "", superpassword: "" });
    setErrors({ superuser: false, superpassword: false });
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-form">
          <div className="form-group">
            <label>Username * :</label>
            <input
              type="text"
              name="superuser"
              value={credentials.superuser}
              onChange={handleChange}
              placeholder="Enter your superuser"
              className={errors.superuser ? "error" : ""}
            />
            {errors.superuser && (
              <span className="error-message">Required field</span>
            )}
          </div>
          {/* <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? "error" : ""}
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            ></i>
            {errors.password && (
              <span className="error-message">Required field</span>
            )}
          </div> */}
          <div className="form-group password-group">
            <label htmlFor="password">Password * :</label>
            <div className="password-wrapper" style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.superpassword}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{ paddingRight: "30px" }}
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              ></i>
            </div>
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
