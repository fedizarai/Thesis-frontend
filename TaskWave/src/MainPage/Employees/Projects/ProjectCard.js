import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Link } from "react-router-dom";
import Editproject from "../../../_components/modelbox/Editproject";
import Offcanvas from "../../../Entryfile/offcanvance";
import Cookies from 'js-cookie';


import {
  Avatar_16,
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_13,
  Avatar_01,
} from "../../../Entryfile/imagepath";

const ProjectCard = ({ project , onEditClick ,onDeleteClick}) =>  {

  

  const { id, title, leadername, deadline,description ,team,tasks} = project;
  
  const numberOfCompletedTasks = project.tasks?.filter(task => task.status === 2)?.length || 0;

  const numberOfOpenTasks = project?.tasks?.length || 0;

  const progress=Math.round((numberOfCompletedTasks / numberOfOpenTasks) * 100);

  const profileId = Cookies.get('userid');
  const [users, setUsers] = useState([]);
  const [userPosition, setUserPosition] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/users");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const usersData = await response.json();
            setUsers(usersData); // Set all fetched users in the state

            // Find the connected user by the profileId
            const connectedUser = usersData.find(user => user.id === parseInt(profileId));
            if (connectedUser) {
                setUserPosition(connectedUser.position); // Set the position of the connected user
                console.log("Logged in position:", connectedUser.position);
            } else {
                console.log("No user found with id:", profileId);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Check if profileId is available before fetching
    if (profileId) {
        fetchUsers();
    } else {
        console.log("No profileId available");
    }
}, [profileId]);


  return (

     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
              <div className="card">
                <div className="card-body">
                 {(userPosition === "Manager" || userPosition === "Team Leader") && (
                  <div className="dropdown dropdown-action profile-action">
                    <Link
                      to="#"
                      className="action-icon dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <i className="material-icons">more_vert</i>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => onEditClick(id)}
                        data-bs-toggle="modal"
                        data-bs-target="#edit_project">
                        <i className="fa fa-pencil m-r-5" /> Edit
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => onDeleteClick(id)}
                        data-bs-toggle="modal"
                        data-bs-target="#delete_project">
                        <i className="fa fa-trash m-r-5" /> Delete
                      </Link>
                    </div>
                  </div>
                 )} 
                  <h4 className="project-title">
                    <Link to={`/app/projects/projects-view/${id}`}>
                      {title}
                    </Link>
                  </h4>
                  <small className="block text-ellipsis m-b-15">
                    <span className="text-xs">{numberOfOpenTasks}</span>{" "}
                    <span className="text-muted">open tasks, </span>
                    <span className="text-xs">{numberOfCompletedTasks}</span>{" "}
                    <span className="text-muted">tasks completed</span>
                  </small>
                  <p className="text-muted">
                    {description.length > 100 ? description.slice(0, 80) + '...' : description}
                  </p>
                  <div className="pro-deadline m-b-15">
                    <div className="sub-title">Deadline:</div>
                    <div className="text-muted">{new Date(deadline).toLocaleDateString()}</div>
                  </div>
                  <div className="project-members m-b-15">
                    <div>Project Leader :</div>
                    <ul className="team-members">
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          title={leadername}>
                          <img alt="img" src={leadername.image} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="project-members m-b-15">
                    <div>Team :</div>
                     <ul className="team-members">
                      {project.team.map((member, index) => (
                        <li key={index}>
                          <Link to="#" data-bs-toggle="tooltip" title={member.name}>
                            <img alt={member.name} src={member.image} />
                          </Link>
                        </li>
                      ))}
                     </ul>
                  </div>
                  <p className="m-b-5">
                    Progress <span className="text-success float-end">{progress}%</span>
                  </p>
                  <div className="progress progress-xs mb-0">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      data-bs-toggle="tooltip"
                      title={`${progress}%`}
                      style={{ width: `${progress}%`}}
                    />
                  </div>
                </div>
              </div>
            </div>
   
  );
};

export default ProjectCard;