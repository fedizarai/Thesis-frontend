/* eslint-disable no-undef */

import React, { useEffect,useState } from "react";
import { Helmet } from "react-helmet";
import { Link,useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileImage, faFileAlt, faFile } from '@fortawesome/free-solid-svg-icons';
import "./projectview.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { io } from "socket.io-client";
import {
  Avatar_16,
  Avatar_02,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_01,
  Diagram,
  PlaceHolder,
} from "../../../Entryfile/imagepath";
//import "../../../assets/scss/pages/task.scss";
import Editproject from "../../../_components/modelbox/Editproject";
import Offcanvas from "../../../Entryfile/offcanvance";
import { DefaultEditor } from "react-simple-wysiwyg";

const ProjectView = ({ projects }) => {

  const { taskId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskDetails, setTaskDetails] = useState(null);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [userSelected, setUserSelected] = useState(false);
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleTaskChange = (e) => {
    setSelectedTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTask) {
      alert('Please select a task before uploading.');
      return;
    }

    const data = new FormData();
    files.forEach(file => {
      data.append('files', file);
    });
    data.append('taskId', selectedTask);

    try {
      const response = await fetch(`http://localhost:3001/projects/${taskId}/tasks/${selectedTask}/solutionFiles`, {
        method: 'POST',
        body: data,
        credentials: 'include'
      });
      console.log('details',selectedTask);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server response:', result);
       window.location.reload();
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };


  useEffect(() => {
    if (projects && taskId) {
      const foundTask = projects.find((project) => project.id === parseInt(taskId, 10));
      console.log('projrctid:',taskId);
      if (foundTask) {
        setTaskDetails(foundTask);
      }

    }
  }, [projects, taskId]);
  console.log("Current taskDetails state:", taskDetails);

  if (!taskDetails) {
    return null; // Render nothing if taskDetails is not available yet
  }
 
 const numberOfCompletedTasks = taskDetails.tasks?.filter(task => task.status === 2)?.length ?? 0;

  
  const numberOfOpenTasks = taskDetails.tasks?.length ?? 0;

  
  const progress = Math.round((numberOfCompletedTasks / numberOfOpenTasks) * 100);

  const fileIcons = {
    pdf: faFilePdf,
    jpg: faFileImage,
    jpeg: faFileImage,
    png: faFileImage,
    txt: faFileAlt,};

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase(); // Get the file extension
    return fileIcons[extension] || faFile; // Return the corresponding icon or a default icon
  };

  const fileDelete = async (e, fileId) => {
    e.preventDefault();
    console.log('fileId',fileId);
    // Call the backend to delete the file
    try {
        const response = await fetch(`http://localhost:3001/files/${fileId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Include authentication headers if needed
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Update the state to remove the file from the list within the project data
            const updatedFiles = taskDetails.files.filter(file => file.id !== fileId);
            setTaskDetails({ ...taskDetails, files: updatedFiles });
            
        } else {
            // Handle errors, e.g., file not found or server error
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error deleting file:', error.message);
        alert(`Error deleting file: ${error.message}`);
    }
};


  const downloadImage = (e, fileUrl, fileName) => {
      e.preventDefault(); 
      e.stopPropagation(); 

      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileName); 
      document.body.appendChild(link); 
      link.click(); 
      document.body.removeChild(link); 
  };

  const fileDownload = (e, fileUrl, fileName) => {
      e.preventDefault(); // Prevent the default link action
      e.stopPropagation(); // Stop the event from propagating

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileName); // Set the filename for the download
      document.body.appendChild(link); // Append to the document
      link.click(); // Programmatically click the link to trigger the download
      document.body.removeChild(link); // Remove the link from the document
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };



  //assign
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
 
  

 const handleTaskSelect = (taskId) => {
    setSelectedTaskId(taskId);
    console.log('selectedid: ',selectedTaskId)
    // Code to show modal
   };


  const assignTask = (tasksId, user) => {
    console.error('projectId:', taskId);
    console.error('taskId:', tasksId);
    console.error('userid:', user.id);
    if (!taskId || !user) {
      console.log("Invalid task or user selection");
      return;
    }
    // Assuming fetch API call or similar to backend
    fetch('http://localhost:3001/assign', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ projectId: taskId,taskId: tasksId, userId: user.id })
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to assign task');
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      window.location.reload(); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
   };

   const handleStatusChange = async (taskId, newStatus) => {
    console.log('taskId',taskId);
     console.log('newStatus',newStatus);
    try {
   
    const response = await fetch('http://localhost:3001/updateTaskStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId, newStatus }),
    });

    if (!response.ok) {
      throw new Error('Failed to update task status');
    }

    // Handle success
    console.log('Task status updated successfully');
    window.location.reload();
  } catch (error) {
    // Handle error
    console.error('Error updating task status:', error);
  }
};
  //upload solution
  

  const filteredMembers = searchTerm.length === 0
    ? taskDetails.team
    : taskDetails.team.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
   

 
 
  


  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Projects</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">{taskDetails.title}</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Project</li>
              </ul>
            </div>
            <div className="col-auto float-end ms-auto">
              <Link
                to="#"
                className="btn add-btn"
                data-bs-toggle="modal"
                data-bs-target="#edit_projects">
                <i className="fa fa-plus" /> Upload Solution
              </Link>
              <Link
                to="/app/projects/task-board"
                className="btn btn-white float-end m-r-10"
                data-bs-toggle="tooltip"
                title="Task Board">
                <i className="fa fa-bars" />
              </Link>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-lg-8 col-xl-9">
            <div className="card">
              <div className="card-body">
                <div className="project-title">
                  <h5 className="card-title">{taskDetails.title}</h5>

                  <small className="block text-ellipsis m-b-15">
                    <span className="text-xs">{numberOfOpenTasks}</span>{" "}
                    <span className="text-muted">open tasks, </span>
                    <span className="text-xs">{numberOfCompletedTasks}</span>{" "}
                    <span className="text-muted">tasks completed</span>
                  </small>
                </div>
                <p>
                  {taskDetails.description}
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title m-b-20">Uploaded image files</h5>
                <div className="row">
                  {taskDetails.files && taskDetails.files.length > 0 ? (taskDetails.files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file.name)) .map((file, index) => (
                    <div key={index} className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                      <div className="uploaded-box" onClick={() => handleImageClick(file)}>
                        <div className="uploaded-img">
                            <img 
                               src={file.src} 
                               className="img-fluid" 
                               alt={file.name} 
                               style={{
                                 height: '200px', 
                                 width: '100%', 
                                 cursor: 'pointer'
                                }} 
                            />
                        </div>
                        <div className="uploaded-img-name">
                         {file.name}
                         <div className="files-cont">
                          <ul className="files-action">
                          <li className="dropdown dropdown-action">
                           <Link
                            to=""
                            className="dropdown-toggle btn btn-link"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{color: 'grey', textDecoration: 'none', outline: 'none'}}
                            onClick={(e) => e.stopPropagation()}>>
                            <i className="material-icons" style={{color: 'grey'}}>more_horiz</i>
                           </Link>
                           <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to="#" onClick={(e) => downloadImage(e, file.src, file.name)}>Download</Link>
                            <Link 
                                className="dropdown-item" 
                                to="#" 
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent the link from navigating.
                                    e.stopPropagation(); // Stop the event from bubbling up.
                                    fileDelete(e, file.id); // Call your delete function.
                              }}>
                              Delete
                            </Link>
                           </div>
                          </li>
                         </ul>
                        </div>
                        </div>
                      </div>
                    </div>
                   ))
                 ) : (
                    <p>No images to display.</p>
                 )}
                </div>
              </div>
              {/* Modal for displaying the clicked image */}
              {selectedImage && (
                <div className={`modal ${showModal ? 'show' : ''}`} style={{display: showModal ? 'block' : 'none'}} tabIndex="-1">
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">{selectedImage.name}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <img 
                           src={selectedImage.src} 
                           className="img-fluid" 
                           alt={selectedImage.name} 
                           style={{
                                 height: '700px', 
                                 width: '100%',    
                                }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
               )}
            </div>




            <div className="card">
              <div className="card-body">
                <h5 className="card-title m-b-20">Uploaded files</h5>
                <ul className="files-list">
                 {taskDetails.files && taskDetails.files.length > 0 ? (taskDetails.files.filter(file => !/\.(jpg|jpeg|png|gif)$/i.test(file.name)) .map((file, index) => (
                  <li>
                    <div className="files-cont">
                      <div className="file-type">
                        <span className="files-icon">
                          <FontAwesomeIcon icon={getFileIcon(file.name)} />
                        </span>
                      </div>
                      <div className="files-info">
                        <span className="file-name text-ellipsis">
                          <Link to="#">
                            {file.name}
                          </Link>
                        </span>
                        <span className="file-author">
                          <Link to="#">{file.creator}</Link>
                        </span>{" "}
                        <span className="file-date">{file.date} , Task : {file.task_description}</span>
                        <div className="file-size">Size : {file.size}</div>
                      </div>
                      <ul className="files-action">
                        <li className="dropdown dropdown-action">
                          <Link
                            to=""
                            className="dropdown-toggle btn btn-link"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i className="material-icons">more_horiz</i>
                          </Link>
                          <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to="#" onClick={(e) => fileDownload(e, file.src, file.name)}>
                              Download
                            </Link>
                             <Link className="dropdown-item" to="#" onClick={(e) => fileDelete(e, file.id)}>
                              Delete
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  ))
                 ) : (
                    <p>No files to display.</p>
                 )}
                </ul>
              </div>
            </div>               
            <div className="project-task">
              <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="#pending_tasks"
                    data-bs-toggle="tab"
                    aria-expanded="false">
                    Pending Tasks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="#InProgress_tasks"
                    data-bs-toggle="tab"
                    aria-expanded="false">
                    In Progress Tasks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="#completed_tasks"
                    data-bs-toggle="tab"
                    aria-expanded="false">
                    Completed Tasks
                  </Link>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane show active" id="pending_tasks">
                  <div className="task-wrapper">
                    <div className="task-list-container">
                      <div className="task-list-body">
                        <ul id="task-list">
                         {taskDetails.tasks?.length > 0 ? (taskDetails.tasks.filter(task => task.status === 0).map((task, index) => (
                             <li className="task">
                              <div className="task-container">
                                <span className="task-action-btn task-check">
                                  <span
                                    className="action-circle large complete-btn"
                                    title="Mark Complete"
                                    onClick={() => handleStatusChange(task.id, 1)} 

                                    >
                                    <i className="material-icons">check</i>
                                  </span>
                                </span>
                                <span className="task-label">
                                {task.description}
                                </span>
                                <span className="task-action-btn task-btn-right">
                                  <div className="task-header">
                                    <div className="assignee-info">
                                      <Link
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#assignee"
                                        onClick={() => handleTaskSelect(task.id)}

                                        >
                                        <div className="avatar">
                                          <img alt="" src={task.assignee_image} />
                                        </div>
                                        <div className="assigned-info">
                                          <div className="task-head-title">
                                            Assigned To
                                          </div>
                                          <div className="task-assignee">{task.assignee}</div>
                                        </div>
                                      </Link>
                                      <span className="remove-icon">
                                        <i className="fa fa-close" />
                                      </span>
                                    </div>
                                    <div className="task-due-date">
                                       <div className="due-icon">
                                          <span>
                                            <i className="material-icons">date_range</i>
                                          </span>
                                       </div>
                                       <div className="due-info">
                                           <div className="task-head-title">
                                              Due Date
                                           </div>
                                           <div className="due-date">{new Date(task.deadline).toLocaleDateString()}</div>
                                         </div>
                                    </div>
                                  </div>
                                </span>
                              </div>
                            </li>
                              ))
                        ) : (
                          <p>No pending tasks available.</p>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="InProgress_tasks">
                  <div className="task-wrapper">
                    <div className="task-list-container">
                      <div className="task-list-body">
                        <ul id="task-list">
                          {taskDetails.tasks?.length > 0 ? (taskDetails.tasks.filter(task => task.status === 1).map((task, index) => (
                            <li className="task">
                             <div className="task-container">
                              <span className="task-action-btn task-check">
                                <span
                                  className="action-circle large complete-btn"
                                  title="Mark Complete"
                                  onClick={() => handleStatusChange(task.id, 2)} 
                                  >
                                  <i className="material-icons">check</i>
                                </span>
                              </span>
                              <span className="task-label">
                                {task.description}
                              </span>
                              <span className="task-action-btn task-btn-right">
                                  <div className="task-header">
                                    <div className="assignee-info">
                                      <Link
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#assignee">
                                        <div className="avatar">
                                          <img alt="" src={task.assignee_image} />
                                        </div>
                                        <div className="assigned-info">
                                          <div className="task-head-title">
                                            Assigned To
                                          </div>
                                          <div className="task-assignee">{task.assignee}</div>
                                        </div>
                                      </Link>
                                      <span className="remove-icon">
                                        <i className="fa fa-close" />
                                      </span>
                                    </div>
                                    <div className="task-due-date">
                                       <Link
                                         to="#"
                                         data-bs-toggle="modal"
                                         data-bs-target="#assignee">
                                         <div className="due-icon">
                                            <span>
                                              <i className="material-icons">date_range</i>
                                            </span>
                                         </div>
                                         <div className="due-info">
                                           <div className="task-head-title">
                                              Due Date
                                           </div>
                                           <div className="due-date">{new Date(task.deadline).toLocaleDateString()}</div>
                                         </div>
                                       </Link>
                                   </div>
                                  </div>
                                </span>
                            </div>
                            </li>
                             ))
                        ) : (
                          <p>No InProgress tasks available.</p>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="completed_tasks">
                  <div className="task-wrapper">
                    <div className="task-list-container">
                      <div className="task-list-body">
                        <ul id="task-list">
                          {taskDetails.tasks?.length > 0 ? (taskDetails.tasks.filter(task => task.status === 2).map((task, index) => (
                            <li className="completed task">
                             <div className="task-container">
                              <span className="task-action-btn task-check">
                                <span
                                  className="action-circle large complete-btn"
                                  title="Mark Complete">
                                  <i className="material-icons">check</i>
                                </span>
                              </span>
                              <span className="task-label">
                                {task.description} 
                              </span>
                              <span className="task-action-btn task-btn-right">
                                  <div className="task-header">
                                    <div className="assignee-info">
                                      <Link
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#assignee"
                                        >
                                        <div className="avatar">
                                          <img alt="" src={task.assignee_image} />
                                        </div>
                                        <div className="assigned-info">
                                          <div className="task-head-title">
                                            Assigned To
                                          </div>
                                          <div className="task-assignee">{task.assignee}</div>
                                        </div>
                                      </Link>
                                      <span className="remove-icon">
                                        <i className="fa fa-close" />
                                      </span>
                                    </div>
                                    <div className="task-due-date">
                                       <Link
                                         to="#"
                                         data-bs-toggle="modal"
                                         data-bs-target="#assignee"

                                         >
                                         <div className="due-icon">
                                            <span>
                                              <i className="material-icons">date_range</i>
                                            </span>
                                         </div>
                                         <div className="due-info">
                                           <div className="task-head-title">
                                              Due Date
                                           </div>
                                           <div className="due-date">{task.deadline}</div>
                                         </div>
                                       </Link>
                                       <span className="remove-icon">
                                         <i className="fa fa-close" />
                                       </span>
                                   </div>
                                  </div>
                                </span>
                            </div>
                            </li>
                                ))
                        ) : (
                          <p> No completed tasks available.</p>
                          )} 
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>             
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xl-3">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title m-b-15">Project details</h6>
                <table className="table table-striped table-border">
                  <tbody>
                    
                    <tr>
                      <td>Total Hours:</td>
                      <td className="text-end">{taskDetails.workinghours} Hours</td>
                    </tr>
                    <tr>
                      <td>Created:</td>
                      <td className="text-end">{new Date(taskDetails.startdate).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>Deadline:</td>
                      <td className="text-end">{new Date(taskDetails.deadline).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>Priority:</td>
                      <td className="text-end">
                        <div className="btn-group">
                          <Link
                               to=""
                               className={`btn btn-white btn-sm btn-rounded dropdown-toggle badge badge-${
                                     taskDetails.priority === 'High'
                                        ? 'danger'
                                         : taskDetails.priority === 'Medium'
                                        ? 'warning'
                                       : 'success'
                                          }`}
                                data-bs-toggle="dropdown">
                              {taskDetails.priority}
                          </Link>
                          <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-danger" />{" "}
                              High
                            </Link>
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-primary" />{" "}
                              Medium
                            </Link>
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-success" />{" "}
                              Low
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Created by:</td>
                      <td className="text-end">
                        <Link to="/app/profile/employee-profile">
                          {taskDetails.creator_name}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Status:</td>
                      <td className="text-end">
                        <div className="dropdown action-label">
                          <Link
                            to=""
                            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i
                              className={`far fa-dot-circle ${
                              taskDetails.activestatus === 'Pending'
                                 ? 'text-danger'
                                 : taskDetails.activestatus === 'In Progress'
                                 ? 'text-primary'
                                 : 'text-success'
                                      }`}
                                  />{' '}
                                  {taskDetails.activestatus}
                          </Link>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-danger" />{" "}
                              Pending
                            </Link>
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-primary" />{" "}
                              In Progress
                            </Link>
                            <Link className="dropdown-item" to="#">
                              <i className="far fa-dot-circle text-success" />{" "}
                              Completed
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
            <div className="card project-user">
              <div className="card-body">
                <h6 className="card-title m-b-20">
                  Assigned Leader{" "}
                </h6>
                <ul className="list-box">
                  <li>
                    <Link to={`/app/profile/employee-profile/${taskDetails.leadername.id}`}>
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src={taskDetails.leadername.image} />
                          </span> 
                        </div>
                        <div className="list-body">
                          <span className="message-author">{taskDetails.leadername.name}</span>
                          <div className="clearfix" />
                          <span className="message-content">{taskDetails.leadername.role}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card project-user">
              <div className="card-body">
                <h6 className="card-title m-b-20">
                  Assigned Team Members
                </h6>
                <ul className="list-box">
                  {taskDetails.team.map((member, index) => (
                   <li key={index}>
                    <Link to={`/app/profile/employee-profile/${member.id}`}>
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src={member.image} />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">{member.name}</span>
                          <div className="clearfix" />
                          <span className="message-content">{member.role}</span>
                        </div>
                      </div>
                    </Link>
                  </li>  
                 ))}
                </ul> 
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* /Page Content */}

    


     {/* Assignee Modal */}
        <div id="assignee" className="modal custom-modal fade" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Assign to this task</h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setUserSelected(false)} // Reset on close
                >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="input-group m-b-30">
                    <input
                        placeholder="Search to add"
                        className="form-control search-input"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-primary">Search</button>
                </div>
                <div>
                    <ul className="chat-user-list">
                        {userSelected ? 
                            (
                                <li>
                                    <div className="media d-flex">
                                        <span className="avatar">
                                            <img alt="" src={selectedUser.image || "default_avatar.png"} />
                                        </span>
                                        <div className="media-body align-self-center text-nowrap">
                                            <div className="user-name">{selectedUser.name}</div>
                                            <span className="designation">{selectedUser.role}</span>
                                        </div>
                                    </div>
                                </li>
                            ) :
                            filteredMembers.map((member) => (
                                <li key={member.id} onClick={() => {
                                        setSelectedUser(member);
                                        setUserSelected(true);
                                    }}>
                                    <div className="media d-flex">
                                        <span className="avatar">
                                            <img alt="" src={member.image || "default_avatar.png"} />
                                        </span>
                                        <div className="media-body align-self-center text-nowrap">
                                            <div className="user-name">{member.name}</div>
                                            <span className="designation">{member.role}</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="submit-section">
                    <button className="btn btn-primary submit-btn" onClick={() => assignTask(selectedTaskId, selectedUser)}>
                        Assign
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>


        {/* /Assignee Modal */}


     


      {/* Edit Project Modal */}
       <div id="edit_projects" className="modal custom-modal fade" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Upload Solution</h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="task-select">Select Task:</label>
                        <select 
                            className="form-select"
                            id="task-select"
                            value={selectedTask}
                            onChange={handleTaskChange}
                        >
                            <option value="">Select a Task</option>
                            {taskDetails.tasks.map(task => (
                                <option key={task.id} value={task.id}>{task.description}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <label className="form-label" htmlFor="file-input">Solution Files :  </label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="file-input"
                            multiple 
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="submit-section">
                        <button type="submit" className="btn btn-primary">Upload Files</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

    
      {/* /Edit Project Modal */}

      <Offcanvas />

    </div>
  );
};

export default ProjectView;
