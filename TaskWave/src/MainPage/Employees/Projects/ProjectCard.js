import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Link } from "react-router-dom";
import Editproject from "../../../_components/modelbox/Editproject";
import Offcanvas from "../../../Entryfile/offcanvance";


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

const ProjectCard = ({ project }) =>  {

  

  const { id, title, leaderName, deadline,description ,team,tasks} = project;
  
  const numberOfCompletedTasks = project.tasks.filter(task => task.status === 2).length;

  const numberOfOpenTasks = project.tasks.length;

  const progress=Math.round((numberOfCompletedTasks / numberOfOpenTasks) * 100);


  return (

     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
              <div className="card">
                <div className="card-body">
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
                        data-bs-toggle="modal"
                        data-bs-target="#edit_project">
                        <i className="fa fa-pencil m-r-5" /> Edit
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_project">
                        <i className="fa fa-trash m-r-5" /> Delete
                      </Link>
                    </div>
                  </div>
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
                    {description.length > 100 ? description.slice(0, 100) + '...' : description}
                  </p>
                  <div className="pro-deadline m-b-15">
                    <div className="sub-title">Deadline:</div>
                    <div className="text-muted">{deadline}</div>
                  </div>
                  <div className="project-members m-b-15">
                    <div>Project Leader :</div>
                    <ul className="team-members">
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          title={leaderName}>
                          <img alt="" src={Avatar_16} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="project-members m-b-15">
                    <div>Team :</div>
                    <ul className="team-members"> 
                      <li>
                        <Link to="#" data-bs-toggle="tooltip" title="John Doe">
                          <img alt="" src={Avatar_02} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          title="Richard Miles">
                          <img alt="" src={Avatar_09} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          title="John Smith">
                          <img alt="" src={Avatar_10} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="tooltip"
                          title="Mike Litorus">
                          <img alt="" src={Avatar_05} />
                        </Link>
                      </li>
                      <li className="dropdown avatar-dropdown">
                        <Link
                          to="#"
                          className="all-users dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          +1
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                          <div className="avatar-group">
                            <Link className="avatar avatar-xs" to="#">
                              <img alt="" src={Avatar_02} />
                            </Link>        
                          </div>
                          <div className="avatar-pagination">
                            <ul className="pagination">
                              <li className="page-item">
                                <Link
                                  className="page-link"
                                  to="#"
                                  aria-label="Previous">
                                  <span aria-hidden="true">«</span>
                                  <span className="sr-only">Previous</span>
                                </Link>
                              </li>
                              <li className="page-item">
                                <Link className="page-link" to="#">
                                  1
                                </Link>
                              </li>
                              <li className="page-item">
                                <Link className="page-link" to="#">
                                  2
                                </Link>
                              </li>
                              <li className="page-item">
                                <Link
                                  className="page-link"
                                  to="#"
                                  aria-label="Next">
                                  <span aria-hidden="true">»</span>
                                  <span className="sr-only">Next</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
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