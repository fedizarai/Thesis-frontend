/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  headerlogo,
  lnEnglish,
  lnFrench,
  
  lnGerman,
  Avatar_01,
  Applogo,
} from "../../Entryfile/imagepath";
import notifications from "../../assets/json/notifications";
import message from "../../assets/json/message";

const Header = (props) => {
  const data = notifications.notifications;
  const datas = message.message;
  const [notification, setNotifications] = useState(false);
  const layoutMode = document.body.getAttribute("data-layout-mode");

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  const onMenuClik = () => {
    props.onMenuClick();
  };

  let pathname = location.pathname;
  const { loginvalue } = useSelector((state) => state.user);
  const UserName = loginvalue?.email?.split("@")[0];
  const ProfileName = UserName?.charAt(0).toUpperCase() + UserName?.slice(1);

  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="/app/main/dashboard" className="logo">
          <img src={headerlogo} width={40} height={40} alt="" />
        </Link>
      </div>
      {/* /Logo */}
      <Link
        id="toggle_btn"
        to="#"
        style={{
          display: pathname.includes("tasks")
            ? "none"
            : pathname.includes("compose")
            ? "none"
            : "",
        }}
        onClick={handlesidebar}>
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </Link>
      {/* Header Title */}
      <div className="page-title-box">
        <h3>TaskWave</h3>
      </div>
      {/* /Header Title */}
      <Link
        id="mobile_btn"
        className="mobile_btn"
        to="#"
        onClick={() => onMenuClik()}>
        <i className="fa fa-bars" />
      </Link>
      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* Search */}
        <li className="nav-item">
          <div className="top-nav-search">
            <Link to="#" className="responsive-search">
              <i className="fa fa-search" />
            </Link>
            <form>
              <input
                className="form-control"
                type="text"
                placeholder="Search here"
              />
              <button className="btn" type="submit">
                <i className="fa fa-search" />
              </button>
            </form>
          </div>
        </li>
        {/* /Search */}
       

        {/* Notifications */}
        <li className="nav-item dropdown">
          <Link
            to="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
            onClick={() => setNotifications(!notification)}>
            <i className="fa-regular fa-bell" />{" "}
            <span className="badge badge-pill"></span>
          </Link>
          <div
            className={`dropdown-menu dropdown-menu-end notifications ${
              notification ? "show" : ""
            }`}>
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                {data.map((val, index) => {
                  return (
                    <li className="notification-message" key={index}>
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/app/projects/project_dashboard">
                        <div className="media d-flex">
                          <span className="avatar flex-shrink-0">
                            <img alt="" src={val.image} />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">{val.name}</span>{" "}
                              {val.contents}{" "}
                              <span className="noti-title">
                                {val.contents_2}
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                {val.time}
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </li>
        {/* /Notifications */}




        {/* Message Notifications */}
        <li className="nav-item dropdown">
          <Link
            to="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown">
            <i className="fa-regular fa-comment" />{" "}
            <span className="badge badge-pill"></span>
          </Link>
          <div className="dropdown-menu dropdown-menu-end notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Messages</span>
              <Link to="#" className="clear-noti">
                {" "}
                Clear All{" "}
              </Link>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                {datas.map((value, index) => {
                  return (
                    <li className="notification-message" key={index}>
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/conversation/chat">
                        <div className="list-item">
                          <div className="list-left">
                            <span className="avatar">
                              <img alt="" src={value.image} />
                            </span>
                          </div>
                          <div className="list-body">
                            <span className="message-author">{value.name}</span>
                            <span className="message-time">{value.time}</span>
                            <div className="clearfix" />
                            <span className="message-content">
                              {value.contents}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <Link
                onClick={() => localStorage.setItem("minheight", "true")}
                to="/conversation/chat">
                View all Messages
              </Link>
            </div>
          </div>
        </li>
        {/* /Message Notifications */}


        <li className="nav-item dropdown has-arrow main-drop">
          <Link
            to="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown">
            <span className="user-img me-1">
              <img src={Avatar_01} alt="" />
              <span className="status online" />
            </span>
            <span>{ProfileName ? ` ${ProfileName}` : "Admin"}</span>
          </Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" to="/app/profile/Profile">
              My Profile
            </Link>
            <Link className="dropdown-item" to="/login">
              Logout
            </Link>
          </div>
        </li>
      </ul>
      {/* /Header Menu */}

    </div>
  );
};

export default withRouter(Header);
