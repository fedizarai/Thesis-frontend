/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import Cookies from 'js-cookie';

const Sidebar = (props) => {
  const MenuMore = () => {
    document.getElementById("more-menu-hidden").classList.toggle("hidden");
  };

  const [isSideMenu, setSideMenu] = useState("");
  const [isSideMenunew, setSideMenuNew] = useState("dashboard");
  const [level2Menu, setLevel2Menu] = useState("");
  const [level3Menu, setLevel3Menu] = useState("");
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMouseOverSidebar, setMouseOverSidebar] = useState(false);
  const [users, setUsers] = useState([]);
  const [userPosition, setUserPosition] = useState(''); 

  const profileId = Cookies.get('userid');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await response.json();
        setUsers(usersData);
        
        // Find user by profileId and update the position
        const connectedUser = usersData.find(user => user.id === parseInt(profileId));
        if (connectedUser) {
          setUserPosition(connectedUser.position); // Set the position of the connected user
          console.log("logged in position ",connectedUser.position);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleSidebar = (value) => {
    setSideMenu(value);
    setSideMenuNew(value);
  };


  const toggleLvelTwo = (value) => {
    setLevel2Menu(value);
  };
  const toggleLevelThree = (value) => {
    setLevel3Menu(value);
  };

  useEffect(() => {
    if (
      isMouseOverSidebar &&
      document.body.classList.contains("mini-sidebar")
    ) {
      document.body.classList.add("expand-menu");
      return;
    }
    document.body.classList.remove("expand-menu");
  }, [isMouseOverSidebar]);

  const handleMouseEnter = () => {
    setMouseOverSidebar(true);
  };

  const handleMouseLeave = () => {
    setMouseOverSidebar(false);
  };

  let pathname = props.location.pathname;
  return (
    <div
      className={`sidebar ${isSidebarExpanded ? "" : "hidden"}`}
      id="sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal={false}
        hideTracksWhenNotNeeded={true}>
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
           <ul className="sidebar-vertical" id="veritical-sidebar">              
              <li className="menu-title">
                <span>Main</span>
              </li>
              {userPosition === "Manager" && (
                <li className="submenu">
                  <Link
                    to="#"
                    className={isSideMenu === "dashboard" ? "subdrop" : ""}
                    onClick={() => toggleSidebar(isSideMenu === "dashboard" ? "" : "dashboard")}
                  >
                    <i className="la la-dashboard" /> <span> Dashboard</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu === "dashboard" && (
                    <ul>
                      <li>
                        <Link
                          className={window.location.pathname.includes("main/dashboard") ? "active" : ""}
                          to="/app/main/dashboard">
                          Admin Dashboard
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
               )} 
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "apps" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "apps" ? "" : "apps")
                  }>
                  <i className="la la-cube" /> <span> Apps</span>{" "}
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "apps" ? (
                  <ul>
                    <li>
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/conversation/chat">
                        Chat
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
               {(userPosition === "Manager" || userPosition === "Team Leader") && (
                 <>
                  <li className="menu-title">
                    <span>Employees</span>
                  </li>
                  <li className="submenu">
                    <Link
                      to="/app/employee/allemployees"
                      className={isSideMenu == "employee" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(isSideMenu == "employee" ? "" : "employee")
                      }>
                      <i className="la la-user" /><span > All Employees</span> 
                    </Link>

                      <li className={pathname.includes("leads") ? "active" : ""}>
                      <Link to="/app/employees/leads">
                        <i className="la la-user-secret" /> <span>Leads</span>
                      </Link>
                    </li>
                  </li>
                  </>
                )}
              <li className="menu-title">
                <span>Projects</span>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "projects" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "projects" ? "" : "projects")
                  }>
                  <i className="la la-rocket" /> <span> Projects</span>{" "}
                  <span className="menu-arrow" />
                </Link>
                {isSideMenu == "projects" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("t_dashboard")
                            ? "active"
                            : pathname.includes("projects-list")
                            ? "active"
                            : pathname.includes("cts-view")
                            ? "active"
                            : ""
                        }
                        to="/app/projects/project_dashboard">
                        Projects
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("task-board") ? "active" : ""
                        }
                        to="/app/projects/task-board">
                        Task Board
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )} 
              </li>
              <li className="menu-title">
                <span>Performance</span>
              </li>
              <li className="submenu">
                <Link
                  to="#"
                  className={isSideMenu == "performance" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(
                      isSideMenu == "performance" ? "" : "performance"
                    )
                  }>
                  <i className="la la-graduation-cap" />{" "}
                  <span> Performance </span> <span className="menu-arrow" />
                </Link>
                {isSideMenu == "performance" ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("-indicator") ? "active" : ""
                        }
                        to="/app/performances/performance-indicator">
                        {" "}
                        Performance Indicator{" "}
                      </Link>
                    </li>
                    
                  </ul>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default withRouter(Sidebar);
