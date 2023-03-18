import React, { useState } from "react";
import "./styles/Login.css";
import { ImCross } from "react-icons/im";
import { Link, useHistory } from "react-router-dom";

function Login({ setShowLoginPopup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log("Logged in!");
        setShowLoginPopup(false);
        alert("Login successful");
        history.push("/");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="login-container mt-5">
      <div className="login-header">
        <h2>Login Page</h2>
        <button type="button" className="login-close-btn" onClick={handleClosePopup}>
          <ImCross />
        </button>
      </div>
      <form onSubmit={handleLogin}>
        <div className="login-form-group">
          <label className="login-label">Email:</label>
          <input
            type="email"
            className="login-form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="login-form-group">
          <label className="login-label">Password:</label>
          <input
            type="password"
            className="login-form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="login-btn-primary">
          Login
        </button>
        <div className="text-center mt-3">
          <p>
            Don't have an account yet?{" "}
            <Link to="/signup" onClick={() => setShowLoginPopup(false)}>
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
