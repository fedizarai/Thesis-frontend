import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { User, Avatar_02, Avatar_05, Avatar_09, Avatar_10 } from "../../Entryfile/imagepath"

const Chatsidebar = () => {
  const [projects, setProjects] = useState([]);

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

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link onClick={() => localStorage.setItem("firstload", "true")} to="/app/main/dashboard"><i className="la la-home" /> <span>Back to Home</span></Link>
            </li>
            <li className="menu-title"><span>Chat Rooms</span></li>
            {/* Mapping through projects */}
            {projects.map(project => (
              <li key={project.id}>
                {/* Link to project chat room */}
                <Link onClick={() => localStorage.setItem("minheight", "true")} to={`/conversation/chat/${project.id}`}>
                  <span className="chat-user">{project.title}</span> {/* Display project name */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Chatsidebar);
