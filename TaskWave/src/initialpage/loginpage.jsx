import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../Entryfile/features/users.jsx";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";

const Loginpage = (props) => {
  const [loginError, setLoginError] = useState('');
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
      console.log(data);
      fetch('http://localhost:3001/signin', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Login failed');
    })
    .then(data => {
      setLoginError('');
      dispatch(login(data));
      props.history.push("/app/main/dashboard");
    })
    .catch((error) => {
      setLoginError("Login failed !Wrong email or password");
    });
  };


  const dispatch = useDispatch();

  const [eye, seteye] = useState(true);

  const onEyeClick = () => {
    seteye(!eye);
  };

  return (
    <div className="account-page">
      <div className="main-wrapper">
        <Helmet>
          <title>Login</title>
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
                <h3 className="account-title">Welcome to TaskWave</h3>
                <p className="account-subtitle">Access to our dashboard</p>
                {/* Account Form */}
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-block">
                      <label>Email Address</label>
                      <input
                        type="text"
                        {...register("email")}
                        className="form-control"
                        placeholder="Enter your email address"
                      />
                      <small>{errors.email?.message}</small>
                    </div>
                    <div className="input-block">
                      <div className="row">
                        <div className="col">
                          <label>Password</label>
                        </div>
                        <div className="col-auto">
                          <Link className="text-muted" to="/forgotpassword">
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                      <div style={{ position: "relative" }}>
                        <input
                          type={eye ? "password" : "text"}
                          className="form-control"
                          placeholder="Enter your password"
                          {...register("password")}
                        />
                        <span
                          style={{
                            position: "absolute",
                            right: "5%",
                            top: "30%",
                          }}
                          onClick={onEyeClick}
                          className={`toggles-password fa toggle-password ${
                            eye ? "fa-eye-slash" : "fa-eye"
                          } `}
                        />
                      </div>
                      <small>{errors.password?.message}</small>
                    </div>
                    <div className="input-block text-center">
                      {loginError && <div className="alert alert-danger">{loginError}</div>}
                      <button
                        className="btn btn-primary account-btn"
                        type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="account-footer">
                    <p>
                      Don't have an account yet?{" "}
                      <Link to="/register">Register</Link>
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
export default Loginpage;
