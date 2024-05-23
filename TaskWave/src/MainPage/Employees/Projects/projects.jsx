 /* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Link } from "react-router-dom";
import Editproject from "../../../_components/modelbox/Editproject";
import Offcanvas from "../../../Entryfile/offcanvance";
import ProjectCard from './ProjectCard';
import "./projectview.css";
import Cookies from 'js-cookie';


import "../../index.css";
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

const Projects = ({projects}) => {

  const [html, setHtml] = React.useState("my <b>HTML</b>");
  const [focused, setFocused] = useState(false);
  const [focused1, setFocused1] = useState(false);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [users, setUsers] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [searchCreator, setSearchCreator] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const profileId = Cookies.get('userid');
  const [userPosition, setUserPosition] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchPriority, setSearchPriority] = useState('');
  const [projectToEditId, setProjectToEditId] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    workinghours: '',
    startdate: '',
    deadline: '',
    priority: '',
    activestatus: '',
    creator: '',
    leadername: '',
    description: '',
    files: '',
    team: '',
    tasks: [
      { description: '', deadline: null }  
    ],
  });

  const handleEditProjectClick = (id) => {
    setProjectToEditId(id); 
    
  };
  console.log('projectToDelete',projectToDelete);
  const handleDeleteProjectClick = (projectId) => {
    setProjectToDelete(projectId);
    
  };
const handleDeleteProject = async (projectId) => {
  try {
    const response = await fetch(`http://localhost:3001/projects/${projectId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    
    console.log('Project deleted successfully');
    window.location.reload();
  } catch (error) {
    console.error('Error deleting project:', error);
    
  }
};


 const handleFileChange = (e) => {
  setFormData(prevFormData => ({
    ...prevFormData,
    files: e.target.files 
  }));
};

const handleAddTask = (event) => {
  event.preventDefault(); 

  
  const newTask = { description: '', deadline: new Date() }; 
  const updatedTasks = [...formData.tasks, newTask];
  setFormData({ ...formData, tasks: updatedTasks });
};


  const handleTaskChange = (index, field, value) => {
    const newTasks = [...formData.tasks];
    newTasks[index][field] = value;
    setFormData({ ...formData, tasks: newTasks });
 };

  const handleRemoveTask = (index) => {
    const newTasks = [...formData.tasks];
    newTasks.splice(index, 1);
    setFormData({ ...formData, tasks: newTasks });
 };


  const handleTitleInputChange = (e) => {
    setTitleInput(e.target.value);
  };

  const handleCreatorInputChange = (e) => {
    setSearchCreator(e.target.value);
  };

  const handlePriorityInputChange = (e) => {
    setSearchPriority(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'creator' || name === 'leadername') {
      const userId = getUserIdByName(value);
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: userId || '' // If userId is null (i.e., user not found), set the field to an empty string
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }

    console.log('formData:', formData); 
  };


   const filteredProjects = projects.filter((project) =>{
      
      let titleMatch = true;
      let creatorMatch = true;
      let priorityMatch = true;


    // Filter based on name
      if (titleInput) {
         titleMatch = project.title.toLowerCase().includes(titleInput.toLowerCase());
      }

     
      console.log('project.creator',project.creator);
      if (searchCreator) {
         creatorMatch = project.description.toLowerCase().includes(searchCreator.toLowerCase());
    }
      // Filter based on city
      if (searchPriority) {
         priorityMatch = project.priority.toLowerCase().includes(searchPriority.toLowerCase());
      }
      // Combine all filters
      return titleMatch && creatorMatch && priorityMatch
    });



   const getUserIdByName = (userName) => {
    const user = users.find(user => user.name === userName);
    return user ? user.id : null;
  };
  const getNameById = (userId) => {
  const user = users.find(user => user.id === parseInt(userId));
  return user ? user.name : '';
};


  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleAddTeamMember = () => {
   if (selectedUser && !teamMembers.includes(selectedUser)) {
    const newTeamMembers = [...teamMembers, selectedUser];
    setTeamMembers(newTeamMembers);
    setFormData(prevFormData => ({
      ...prevFormData,
      team: newTeamMembers.join(', ') // Convert the array of user IDs to a string
    }));
    setSelectedUser('');
    console.log('team members:', newTeamMembers); 
  }
};

 const handleDeleteTeamMember = (userIdToDelete) => {
  // Filter out the userIdToDelete from the teamMembers array
  const updatedTeamMembers = teamMembers.filter((userId) => userId !== userIdToDelete);
  // Update the teamMembers state with the filtered array
  setTeamMembers(updatedTeamMembers);
  setFormData(prevFormData => ({
    ...prevFormData,
    team: updatedTeamMembers.join(', ') // Convert the updated array of user IDs to a string
  }));
  console.log('team members:', updatedTeamMembers);
};


  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;  // Get the selected files from the input element
    const filesArray = Array.from(selectedFiles);  // Convert the FileList object to an array

    // Construct an array of file objects with desired properties
    const formattedFiles = filesArray.map(file => {
      return {
        name: file.name,
        size: file.size,
        date: new Date().toISOString(), // Use current date as an example
        src: URL.createObjectURL(file), // Generate a URL for previewing the file (if needed)
        fileObject: file // You can include the entire File object if needed
      };
    });

    setFormData({
      ...formData,
      files: formattedFiles
    });
    console.log("Selected Files:", formattedFiles);
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  // Prepare the data for sending
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'files') {
      // Append each file into FormData if files are present
      Array.from(value).forEach(file => {
        data.append('files', file);
      });
    } else if (key === 'tasks') {
      // Ensure tasks are correctly stringified
      data.append(key, JSON.stringify(value));
    } else if (key === 'startdate' || key === 'deadline') {
      // Convert dates to ISO string only when appending to FormData
      data.append(key, new Date(value).toISOString());
    } else {
      // Append other data directly
      data.append(key, value);
    }
  });

  // Debugging the final shape of tasks before sending
  console.log('Tasks data being sent:', formData.tasks);

  
  try {
    const response = await fetch('http://localhost:3001/projects', {
      method: 'POST',
      body: data, 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Server response:', result);
    window.location.reload();
  } catch (error) {
    console.error('Error uploading data:', error);
  }
};




  function onChange(e) {
    setHtml(e.target.value);
  }
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
}, [profileId]); // Include profileId in the dependency array to refetch when it changes


  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });


  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>Projects</title>
          <meta name="description" content="Login page" />
        </Helmet>
        
        <div className="content container-fluid">

          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Projects</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Projects</li>
                </ul>
              </div>
              <div className="col-auto float-end ms-auto">
               {userPosition === "Manager" && (
                <Link
                  to="#"
                  className="btn add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#create_project">
                  <i className="fa fa-plus" /> Create Project
                </Link>
               )}  
                <div className="view-icons">
                  <Link
                    to="/app/projects/project_dashboard"
                    className="grid-view btn btn-link active mx-2">
                    <i className="fa fa-th" />
                  </Link>
                  <Link
                    to="/app/projects/projects-list"
                    className="list-view btn btn-link">
                    <i className="fa fa-bars" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}

          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">
              <div
                className={ 
                  focused
                    ? "input-block form-focus focused"
                    : "input-block form-focus"
                }>
                <input
                  type="text"
                  className="form-control floating"
                  onChange={handleTitleInputChange}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
                <label className="focus-label">Project Title</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className={
                  focused1
                    ? "input-block form-focus focused"
                    : "input-block form-focus"
                }>
                <input
                  type="text"
                  className="form-control floating"
                  onChange={handleCreatorInputChange}
                  onFocus={() => setFocused1(true)}
                  onBlur={() => setFocused1(false)}
                />
                <label className="focus-label">keyword</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className={
                  focused1
                    ? "input-block form-focus focused"
                    : "input-block form-focus"
                }>
                <input
                  type="text"
                  className="form-control floating"
                  onChange={handlePriorityInputChange}
                  onFocus={() => setFocused1(true)}
                  onBlur={() => setFocused1(false)}
                />
                <label className="focus-label">Priority</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <Link to="#" className="btn btn-success btn-block w-100">
                {" "}
                Search{" "}
              </Link>
            </div>
          </div>
          {/* Search Filter */}

          {/* Page Content */}
          <div className="row">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} onEditClick={handleEditProjectClick} onDeleteClick={handleDeleteProjectClick}/>
            ))}
          </div>
        </div>
        {/* /Page Content */}
 







        {/* Create Project Modal */}
        <div
          id="create_project"
          className="modal custom-modal fade"
          role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Project Name<span className="text-danger">*</span></label>
                        <input 
                          className={`form-control `} 
                          type="text" 
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required 
                      />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Working Hours <span className="text-danger">*</span></label>
                        <input 
                          className={`form-control `} 
                          type="number" 
                          name="workinghours"
                          value={formData.workinghours}
                          onChange={handleChange}
                          required 
                      />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Start Date <span className="text-danger">*</span></label>
                        <div className="cal-icon">
                          <DatePicker
                            selected={formData.startdate}
                            onChange={(date) => handleChange({ target: { name: 'startdate', value: date } })}
                            className={`form-control datetimepicker ${formData.startdate ? 'is-valid' : ''}`}
                            dateFormat="yyyy-MM-dd"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Deadline <span className="text-danger">*</span></label>
                        <div className="cal-icon">
                          <DatePicker
                            selected={formData.deadline}
                            onChange={(date) => handleChange({ target: { name: 'deadline', value: date } })}
                            className={`form-control datetimepicker ${formData.birthdate ? 'is-valid' : ''}`}
                            dateFormat="yyyy-MM-dd"
                            required
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>
                          Priority <span className="text-danger">*</span>
                        </label>
                        <select 
                          className="form-control"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          required
                        > 
                          <option value="">Select an option</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>
                          Status <span className="text-danger">*</span>
                        </label>
                        <select 
                          className="form-control"
                          name="activestatus"
                          value={formData.activestatus}
                          onChange={handleChange}
                          required
                        >  
                          <option value="">Select an option</option>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                   <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Created by<span className="text-danger">*</span>
                      </label>
                      <select 
                         className={`form-control `} 
                         name="creator"
                         value={getNameById(formData.creator)}
                         onChange={handleChange}
                         
                       >
                        <option value="">Select an option</option>
                        {users.map(user => {
                          if ( user.position === "Manager") {
                           return (
                              <option key={user.id} value={user.name}>{user.name}</option>
                           );
                          }
                          return null; 
                        })}
                      </select>
                    </div>
                  </div>
                    <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Project Leader<span className="text-danger">*</span>
                      </label>
                      <select 
                         className={`form-control `} 
                         name="leadername"
                         value={getNameById(formData.leadername)} 
                         onChange={handleChange}
                        
                       >
                        <option value="">Select an option</option>
                        {users.map(user => {
                          if (user.position === "Team Leader" || user.position === "Manager") {
                           return (
                              <option key={user.id} value={user.name}>{user.name}</option>
                           );
                          }
                          return null; 
                        })}
                      </select>
                    </div>
                  </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                     <div className="input-block">
                     <label>Add Team Member</label>
                     <select
                      className="form-control"
                      value={selectedUser}
                      onChange={handleUserSelect}
                    >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                       <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                    </select>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleAddTeamMember}
                      disabled={!selectedUser}
                    >
                      Add Team Member
                    </button>
                    </div>
                  </div>
                  <div className="col-sm-6">
                     <div className="input-block">
                     <label>Team Members</label>
                      <div className="project-members d-flex flex-wrap">
                        {teamMembers.map((userId) => {
                         const numericUserId = parseInt(userId, 10); 
                         const user = users.find((user) => user.id === numericUserId);
                         console.log("user:", user); 
                       if (user) {
                        return (
                         <div key={userId} className="d-inline-block position-relative mr-3 mb-3">
                          <Link
                            key={userId}
                            to="#"
                            data-bs-toggle="tooltip"
                            title={user.name}
                            className="avatar"
                          >
                           <img src={user.image} alt={user.name} />
                          </Link>
                          <button
                            className="delete-member-button"
                            onClick={() => handleDeleteTeamMember(userId)}
                          >
                           &#10006;
                          </button>
                         </div> 
                        );
                       } else {
                         return (
                           <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            title="Richard Miles"
                            className="avatar">
                            <img src={Avatar_02} alt="" />
                          </Link>

                           );
                        }
                     })}
                     
                    </div>
                   </div>
                  </div>
                  </div>
                  <div className="input-block">
                    <label>Description <span className="text-danger">*</span></label>
                    <DefaultEditor 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-block">
                    <label>Upload Files</label>
                    <input 
                      className="form-control"
                      type="file" 
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="input-block">
                  <label>Tasks</label>
                     {formData.tasks.map((task, index) => (
                        <div key={index} className="row align-items-center mb-12">
                          <div className="col-md-8">
                              <input
                                 type="text"
                                 className="form-control"
                                 placeholder="Enter task description"
                                 value={task.description}
                                 onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                              />
                          </div>
                          <div className="col-md-4">
                            <DatePicker
                              selected={task.deadline}
                              onChange={(date) => handleTaskChange(index, 'deadline', date)}
                              placeholder="Enter task description"
                              className="form-control"
                              dateFormat="yyyy-MM-dd"
                            />
                          </div>
                          <div className="col-md-4">
                            <button
                             className="btn btn-danger"
                             type="button"
                             onClick={() => handleRemoveTask(index)}
                             >
                              Remove
                            </button>
                          </div>
                        </div>
                       ))}
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={handleAddTask}
                       >
                          Add Task
                      </button>
                   </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn"  type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Create Project Modal */}








        {/* Edit Project Modal */}
        <Editproject projectId={projectToEditId}/>
        {/* /Edit Project Modal */}



        {/* Delete Project Modal */}
        <div
          className="modal custom-modal fade"
          id="delete_project"
          role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Project</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <Link 
                         to="/app/projects/project_dashboard"
                         className="btn btn-primary continue-btn"
                         onClick={() => handleDeleteProject(projectToDelete)}
                       >
                        Delete
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to=""
                        data-bs-dismiss="modal"
                        className="btn btn-primary cancel-btn">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Project Modal */}
      </div>
      <Offcanvas />
    </>
  );
};

export default Projects;
