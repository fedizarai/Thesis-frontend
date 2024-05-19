/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import React, { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import {
  headerlogo,
  lnEnglish,
  lnFrench,
  
  lnGerman,
  Avatar_01,
  Applogo,
} from "../../Entryfile/imagepath";

const Header = (props) => {
  const [notifications, setNotifications] = useState([]);
   const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profileName, setProfileName] = useState(''); // State for the profile name
  const [users, setUsers] = useState([]);
  const layoutMode = document.body.getAttribute("data-layout-mode");
  const [projects, setProjects] = useState([]);
  const profileId = Cookies.get('userid');
  const [messages, setMessages] = useState([]);
  const [userImage, setUserImage] = useState('');

  
  const findUserNameById = (id, users) => {
    const user = users.find(user => user.id === parseInt(profileId));
    return user ? user.name : null;
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        setUsers(data);
        const user = data.find(user => user.id === parseInt(profileId));
        if (user) {
          setProfileName(user.name);
          setUserImage(user.image); // Assuming 'image' is the key for the image URL in your user object
      }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  

   useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/notifications", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers if your API requires
          },
          credentials: 'include', // if your API requires credentials
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const allNotifications = await response.json();
        // Filter notifications on the client side
        const filteredNotifications = allNotifications.filter(notif => notif.user_id === parseInt(profileId, 10));
        setNotifications(filteredNotifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const toggleNotifications = () => setIsOpen(!isOpen);
  


    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await fetch('http://localhost:3001/projects');
          if (!response.ok) {
            throw new Error('Failed to fetch projects');
          }
          const projectsData = await response.json();
          setProjects(projectsData);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };

      fetchProjects();

      return () => {
        // Cleanup function if needed
      };
    }, []);

   useEffect(() => {
    const fetchAllMessages = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/chat', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Necessary if your API requires session-based authentication
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const allMessages = await response.json();
            console.log('All messages before filtering:', allMessages);

            const profileId = Cookies.get('userid'); // Make sure this is correct
            console.log('Logged-in user ID from cookies:', profileId);

            // Ensure parsing is done correctly
            const parsedProfileId = parseInt(profileId);
            console.log('Parsed logged-in user ID:', parsedProfileId);

            const filteredMessages = allMessages.filter(message => {
                const parsedUserId = parseInt(message.user_id);
                console.log(`Comparing message user ID (${parsedUserId}) with profile ID (${parsedProfileId})`);
                return parsedUserId !== parsedProfileId;
            });

            console.log('Filtered messages:', filteredMessages);
            setMessages(filteredMessages);
        } catch (error) {
            console.error('Error fetching all chat messages:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchAllMessages();
}, []);




  const getProjectNameById = (projectId) => {
    const project = projects.find(project => project.id === parseInt(projectId));
    return project ? project.title : 'Project not found';  // Assuming the project object has a 'title' property
  }; 

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  const onMenuClik = () => {
    props.onMenuClick();
  };

  let pathname = location.pathname;
 


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
        <Link to="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown" onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}>
          <i className="fa-regular fa-bell" />
          {notifications.length > 0 && (
            <span className="badge badge-pill">{notifications.length}</span>
          )}
        </Link>
        <div className={`dropdown-menu dropdown-menu-end notifications ${showNotificationsDropdown ? "show" : ""}`}>
          <div className="topnav-dropdown-header">
            <span className="notification-title">Notifications</span>
          </div>
          <div className="noti-content">
            <ul className="notification-list">
              {loading ? (
                <li>Loading notifications...</li>
              ) : error ? (
                <li>Error loading notifications: {error}</li>
              ) : notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li key={index} className="notification-message">
                    <Link to={`/app/projects/projects-view/${notification.project_id}`}>
                      <div className="media">
                        
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">!!Project : {getProjectNameById(notification.project_id)}!! </span>
                            {notification.message}
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">{new Date(notification.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li>No notifications to display.</li>
              )}
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
            <span className="badge badge-pill">{messages.length}</span>
          </Link>
          <div className="dropdown-menu dropdown-menu-end notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Messages</span>
              
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                {messages.map((value, index) => {
                  return (
                    <li className="notification-message" key={index}>
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to={`/conversation/chat/${value.project_id}`}>
                        <div className="list-item">
                          <div className="list-left">
                            <span className="avatar">
                              <img alt={value.name} src={value.image} />
                            </span>
                          </div>
                            <div className="list-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
             <span>
                <span style={{ fontWeight: 'bold', color: '#333' ,fontSize: '1.1em'}}>{value.name}</span> - 
                <span style={{ fontWeight: 'bold', color: '#007bff' ,fontSize: '1em'}}>{getProjectNameById(value.project_id)}</span>
            </span>
            <span style={{ fontSize: '0.8em', color: '#999' }}>
                {new Date(value.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
        </div>
        <span className="message-content" style={{ fontSize: '0.9em' }}>
            {value.message}
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
              <img src={userImage || Avatar_01} alt={profileName || 'User'} />
              <span className="status online" />
            </span>
            <span>{profileName || "Admin"}</span>
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
