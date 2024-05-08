import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { emailrgx } from "../constant";

const schema = yup
  .object({
    email: yup
      .string()
      .matches(emailrgx, "Email is required")
      .required("Email is required")
      .trim(),
    password: yup
      .string()
      .min(6)
      .max(10)
      .required("Password is required")
      .trim(),

    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords must match")
      .required("Confirm Password is required")
      .trim(),
  })
  .required();


const Registrationpage = (props) => {


  const [eye, seteye] = useState(true);


  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });





  const onSubmit = (data) => {
    console.log(data);
  // Assuming data is valid at this point, including matching passwords
  const registrationData = {
    email: data.email,
    // Add the 'name' field if your form includes it
    password: data.password,
  };

  fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationData),
  })
  .then(response => {
    if (!response.ok) {
      // Handle server-side validation errors or other issues
      throw new Error('Registration failed');
    }
    return response.json();
  })
  .then(data => {
    // Handle successful registration, such as redirecting to the login page
    console.log('Registration successful:', data);
    props.history.push("/login");
  })
  .catch((error) => {
    console.error('Registration error:', error);
    // Optionally update state to display error message to the user
  });
};



  const onEyeClick = () => {
    seteye(!eye);
  };




  return (
    <div className="account-page">
      <div className="main-wrapper">
        <Helmet>
          <title>Register</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <div className="account-content">
          <div className="container">
            {/* Account Logo */}
            <div className="account-logo">
              
                <img src={Applogo} alt="logo" />
              
            </div>
            {/* /Account Logo */}
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Register</h3>
                <p className="account-subtitle">Access to our dashboard</p>
                {/* Account Form */}
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-block">
                      <label>Email</label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <input
                            className={`form-control  ${
                              errors?.email ? "error-input" : ""
                            }`}
                            type="text"
                            value={value}
                            onChange={onChange}
                            autoComplete="false"
                          />
                        )}
                        defaultValue="admin@dreamguys.co.in"
                      />

                      <small>{errors?.email?.message}</small>
                    </div>
                    <div className="input-block">
                      <label>Password</label>
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange } }) => (
                          <div
                            className="pass-group"
                            style={{ position: "relative" }}>
                            <input
                              type={eye ? "password" : "text"}
                              className={`form-control  ${
                                errors?.password ? "error-input" : ""
                              }`}
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                            <span
                              style={{
                                position: "absolute",
                                right: "5%",
                                top: "30%",
                              }}
                              onClick={onEyeClick}
                              className={`fa toggle-password" ${
                                eye ? "fa-eye-slash" : "fa-eye"
                              }`}
                            />
                          </div>
                        )}
                      />

                      <small>{errors?.password?.message}</small>
                    </div>
                    <div className="input-block">
                      <label>Repeat Password</label>
                      <Controller
                         name="repeatPassword"
                         control={control}
                         defaultValue=""
                         render={({ field: { value, onChange } }) => (
                           <div className="pass-group" style={{ position: "relative" }}>
                             <input
                               type={eye ? "password" : "text"}
                               className={`form-control ${errors?.repeatPassword ? "error-input" : ""}`}
                               value={value}
                               onChange={onChange}
                               autoComplete="off" // Changed from "false" to "off" for better compatibility
                               />
                             <span
                               style={{ position: "absolute", right: "5%", top: "30%" }}
                               onClick={onEyeClick} // Reuses the same visibility toggle for consistency
                               className={`fa toggle-password ${eye ? "fa-eye-slash" : "fa-eye"}`}
                             />
                           </div>
                             )}
    
                             />
                           <small>{errors?.repeatPassword?.message}</small>
                    </div>
                    <div className="input-block text-center">
                      <button
                        className="btn btn-primary account-btn"
                        type="submit">
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="account-footer">
                    <p>
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                  </div>
                </div>
                {/* /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrationpage;
