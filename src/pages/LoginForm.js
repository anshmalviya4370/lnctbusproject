import React, { useState } from "react";
import "./pagecss/Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      setError("");
      // Handle login logic here
      console.log("Logging in with email:", email, "and password:", password);
    }
  };

  return (
    <div className="login-container">
      <div className="login-banner">
        <h1 className="welcome-text">Welcome Back!</h1>
        <p className="subtext">
          We're excited to have you back. Sign in to continue.
        </p>
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Sign In</h2>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
