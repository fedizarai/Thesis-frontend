import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Avatar_16,
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_01,
} from "../../../Entryfile/imagepath";
import Offcanvas from "../../../Entryfile/offcanvance";

const TaskBoard = ({projects}) => {
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

    // Calculate the average progress of all projects, round it, and convert to string without decimals
  const averageProgress = Math.round(projects.reduce((acc, project) => {
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(task => task.status === 2).length;
    const projectProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return acc + projectProgress;
  }, 0) / (projects.length || 1));  // Avoid division by zero if no projects

  const displayProgress = `${averageProgress}%`;  // Ensuring no decimal point

  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>Task Board</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Task Board</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Task Board</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row board-view-header">
            <div className="col-12">
              <div className="pro-progress">
                <div className="pro-progress-bar">
                  <h4>Team Progress</h4>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: displayProgress }}
                    />
                  </div>
                  <span>{displayProgress}</span> 
                </div>
              </div>
            </div>
          </div>
          <div className="kanban-board card mb-0">
            <div className="card-body">
              <div className="kanban-cont">
                <div className="kanban-list kanban-danger" style={{ width: '33%' }}>
                  <div className="kanban-header">
                    <span className="status-title">Pending</span>
                  </div>
                  <div className="kanban-wrap">
                   {projects
                      .filter((project) => project.activestatus === 'Pending')
                      .map((project, index) => (
                        <div className="card panel">
                      <div className="kanban-box">
                        <div className="task-board-header">
                          <span className="status-title">
                            <Link to={`/app/projects/projects-view/${project.id}`}>{project.title}</Link>
                          </span>
                        </div>
                        <div className="task-board-body">
                          <div className="kanban-info">
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{width: `${project.tasks && project.tasks.length > 0 ? Math.round((project.tasks.filter(task => task.status === 2).length / project.tasks.length) * 100): 0}%`}}
                                aria-valuenow={20}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <span>{project.tasks && project.tasks.length > 0 ? `${Math.round((project.tasks.filter(task => task.status === 2).length / project.tasks.length) * 100)}%`: '0%'}</span>
                          </div>
                          <div className="kanban-footer">
                            <span className="task-info-cont">
                              <span className="task-date">
                                <i className="fa fa-clock-o" /> {new Date(project.deadline).toLocaleDateString()}
                              </span>
                              <div className="btn-group">
                              <Link
                               to=""
                               className={`btn btn-white btn-sm btn-rounded dropdown-toggle badge badge-${
                                     project.priority === 'High'
                                        ? 'danger'
                                         : project.priority === 'Medium'
                                        ? 'warning'
                                       : 'success'
                                          }`}
                                data-bs-toggle="dropdown">
                               {project.priority}
                              </Link>
                          <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-danger" />{" "}
                              High
                            </Link>
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-primary" />{" "}
                              Normal
                            </Link>
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-success" />{" "}
                              Low
                            </Link>
                          </div>
                        </div>
                            </span>
                            <span className="task-users">
                              <img
                                src={project.leadername.image}
                                className="task-avatar"
                                width={24}
                                height={24}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="kanban-list kanban-warning"style={{ width: '33%' }}>
                  <div className="kanban-header">
                    <span className="status-title">Inprogress</span>
                  </div>
                  <div className="kanban-wrap">
                   {projects
                      .filter((project) => project.activestatus === 'In Progress')
                      .map((project, index) => (
                        <div className="card panel">
                      <div className="kanban-box">
                        <div className="task-board-header">
                          <span className="status-title">
                            <Link to={`/app/projects/projects-view/${project.id}`}>{project.title}</Link>
                          </span>
                        </div>
                        <div className="task-board-body">
                          <div className="kanban-info">
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{width: `${project.tasks && project.tasks.length > 0 ? Math.round((project.tasks.filter(task => task.status === 2).length / project.tasks.length) * 100): 0}%`}}
                                aria-valuenow={20}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <span>{project.tasks && project.tasks.length > 0 ? `${Math.round((project.tasks.filter(task => task.status === 2).length / project.tasks.length) * 100)}%`: '0%'}</span>
                          </div>
                          <div className="kanban-footer">
                            <span className="task-info-cont">
                              <span className="task-date">
                                <i className="fa fa-clock-o" /> {new Date(project.deadline).toLocaleDateString()}
                              </span>
                              <div className="btn-group">
                              <Link
                               to=""
                               className={`btn btn-white btn-sm btn-rounded dropdown-toggle badge badge-${
                                     project.priority === 'High'
                                        ? 'danger'
                                         : project.priority === 'Medium'
                                        ? 'warning'
                                       : 'success'
                                          }`}
                                data-bs-toggle="dropdown">
                               {project.priority}
                              </Link>
                          <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-danger" />{" "}
                              High
                            </Link>
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-primary" />{" "}
                              Normal
                            </Link>
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-success" />{" "}
                              Low
                            </Link>
                          </div>
                        </div>
                            </span>
                            <span className="task-users">
                              <img
                                src={project.leadername.image}
                                className="task-avatar"
                                width={24}
                                height={24}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="kanban-list kanban-success"style={{ width: '33%' }}>
                  <div className="kanban-header">
                    <span className="status-title">Completed</span>
                  </div>
                  <div className="kanban-wrap">
                   {projects
                      .filter((project) => project.activestatus === 'Completed')
                      .map((project, index) => (
                        <div className="card panel">
                      <div className="kanban-box">
                        <div className="task-board-header">
                          <span className="status-title">
                            <Link to={`/app/projects/projects-view/${project.id}`}>{project.title}</Link>
                          </span>
                        </div>
                        <div className="task-board-body">
                          <div className="kanban-info">
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{width: `${project.tasks && project.tasks.length > 0 ? Math.round((project.tasks.filter(task => task.status === 2).length / project.tasks.length) * 100): 0}%`}}
                                aria-valuenow={20}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <span>{project.tasks && project.tasks.length > 0 ? `${Math.round((project.tasks.filter(task => task.status === 2).length / project.tasks.length) * 100)}%`: '0%'}</span>
                          </div>
                          <div className="kanban-footer">
                            <span className="task-info-cont">
                              <span className="task-date">
                                <i className="fa fa-clock-o" /> {new Date(project.deadline).toLocaleDateString()}
                              </span>
                              <div className="btn-group">
                              <Link
                               to=""
                               className={`btn btn-white btn-sm btn-rounded dropdown-toggle badge badge-${
                                     project.priority === 'High'
                                        ? 'danger'
                                         : project.priority === 'Medium'
                                        ? 'warning'
                                       : 'success'
                                          }`}
                                data-bs-toggle="dropdown">
                               {project.priority}
                              </Link>
                          <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-danger" />{" "}
                              High
                            </Link>
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-primary" />{" "}
                              Normal
                            </Link>
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-success" />{" "}
                              Low
                            </Link>
                          </div>
                        </div>
                            </span>
                            <span className="task-users">
                              <img
                                src={project.leadername.image}
                                className="task-avatar"
                                width={24}
                                height={24}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                        </div>
                      ))}
                  </div>
                </div>         
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
      <Offcanvas />
    </>
  );
};

export default TaskBoard;
