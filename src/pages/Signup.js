import React, { useState } from "react";
import "./styles/Signup.css";
import { FaArrowLeft } from "react-icons/fa";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormData((prevState) => ({
        ...prevState,
        isValid: false,
      }));
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const savedUser = await response.json();
      console.log(savedUser);
      if (response.status === 200) {
      // Redirect to a different page, or show a success message
      alert('Signup successful');
      } else {
      // Show an error message
      alert('Signup failed');
      }
      } catch (error) {
      console.error('Error during signup:', error);
      }
      };
  

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="signup-header">
        <button
          type="button"
          className="close-btn"
          onClick={() => (window.location.href = "/")}
        >
          <FaArrowLeft />
        </button>
        <h2 className="signup-title">Signup Page</h2>
      </div>

      <div className="signup-input-group">
        <div className="signup-input-row">
          <div className="signup-input-col">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-input-col">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="signup-input-row">
          <div className="signup-input-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-input-col">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="signup-input-row">
          <div className="signup-input-col">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={formData.isValid === false ? "invalid" : ""}
            />
            {formData.isValid === false && (
              <div className="signup-invalid-msg">Password does not match</div>
            )}
          </div>
        </div>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
