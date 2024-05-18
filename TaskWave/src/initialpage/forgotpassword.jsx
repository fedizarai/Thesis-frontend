import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      const response = await fetch('http://localhost:3001/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Check your email for the reset link.');
      } else {
        setMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      setMessage('Network error, please try again later.');
    }
  };

  return (
    <div className="account-page">
      <div className="main-wrapper">
        <Helmet>
          <title>Forgot Password - TaskWave</title>
          <meta name="description" content="Reset your password" />
        </Helmet>
        <div className="account-content">
          <div className="container">
            <div className="account-logo">
              <Link to="/app/main/dashboard">
                <img src={Applogo} alt="Dreamguy's Technologies" />
              </Link>
            </div>
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Forgot Password?</h3>
                <p className="account-subtitle">Enter your email to get a password reset link</p>
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label>Email Address</label>
                    <input
                      className="form-control"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="input-block text-center">
                    <button className="btn btn-primary account-btn" type="submit">
                      Reset Password
                    </button>
                  </div>
                  <div className="account-footer">
                    <p>Remember your password? <Link to="/login">Login</Link></p>
                  </div>
                </form>
                {message && <div className="alert alert-info" role="alert">{message}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
