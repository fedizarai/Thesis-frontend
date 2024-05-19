import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { DefaultEditor } from "react-simple-wysiwyg";


const Editproject = ({projectId}) => {

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
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
      { description: '', deadline: null }  // Initialize with one task object for better user guidance
    ],
  });

  //files
  const handleFileChange = (e) => {
  setFormData(prevFormData => ({
    ...prevFormData,
    files: e.target.files // This captures all selected files
  }));
  };
  //tasks
 const handleAddTask = (event) => {
  event.preventDefault(); // This prevents the form from being submitted

  // Logic to add a new task to the state that stores task data
  const newTask = { description: '', deadline: new Date() }; // Adjust based on your state structure
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

  const getUserIdByName = (userName) => {
    const user = users.find(user => user.name === userName);
    return user ? user.id : null;
  };

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };
  const getNameById = (userId) => {
  const user = users.find(user => user.id === parseInt(userId));
  return user ? user.name : '';
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

  async function resolveUserIds() {
    const creatorId = await getUserIdByName(formData.creator);
    const leaderId = await getUserIdByName(formData.leadername);
    return { creatorId, leaderId };
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        if (key === 'files' && value) {
            Array.from(value).forEach(file => data.append('files', file));
        } else if (key === 'tasks') {
            data.append(key, JSON.stringify(value));
        } else if (key === 'startdate' || key === 'deadline') {
            data.append(key, new Date(value).toISOString());
        } else if (key === 'creator' || key === 'leadername') {
            // Check if the value is a number (ID already) or needs conversion from a name to an ID
            const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
            if (isNumeric) {
                data.append(key, value);
            } else {
                const userId = getUserIdByName(value);
                if (userId) {
                    data.append(key, userId);
                } else {
                    console.error(`No ID found for ${key} with name ${value}`);
                    // Skip appending this key if ID is crucial and not found
                }
            }
        } else {
            data.append(key, value);
        }
    });

    // Log FormData entries
    for (let pair of data.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
        const response = await fetch(`http://localhost:3001/projects/${projectId}`, {
            method: 'PUT',
            body: data, // Using FormData which automatically sets Content-Type to multipart/form-data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Server response:', result);
        window.location.reload();
    } catch (error) {
        console.error('Error updating project:', error);
    }
};











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
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

   useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }
        const projectsData = await response.json();
        const projectData = projectsData.find(p => p.id === projectId);
        console.log("projectsData: " ,projectsData);
        console.log("projectId: " ,projectId);
        console.log("projectData: " ,projectData);

        setFormData({
          title: projectData.title,
          workinghours: projectData.workinghours,
          startdate: new Date(projectData.startdate),
          deadline: new Date(projectData.deadline),
          priority: projectData.priority,
          activestatus: projectData.activestatus,
          creator: projectData.creator_name, // Assuming you have creator's name, adjust as per your actual data
          leadername: projectData.leadername.name, // Adjust based on actual data structure
          description: projectData.description,
          team: projectData.team.map(member => member.id).join(', '),
          tasks: projectData.tasks.map(task => ({
            description: task.description,
            deadline: new Date(task.deadline)
          }))
        });
        setTeamMembers(projectData.team.map(member => member.id)); // Assuming team member IDs are needed separately
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);


  return (
    <>
      <div id="edit_project" className="modal custom-modal fade" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Project Name</label>
                        <input 
                          className={`form-control `} 
                          type="text" 
                          name="title"
                          value={formData.title}
                          onChange={handleChange}      
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Working Hours</label>
                        <input 
                          className={`form-control `} 
                          type="number" 
                          name="workinghours"
                          value={formData.workinghours}
                          onChange={handleChange}
                      />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Start Date</label>
                        <div className="cal-icon">
                          <DatePicker
                            selected={formData.startdate}
                            onChange={(date) => handleChange({ target: { name: 'startdate', value: date } })}
                            className={`form-control datetimepicker ${formData.startdate ? 'is-valid' : ''}`}
                            dateFormat="yyyy-MM-dd"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Deadline</label>
                        <div className="cal-icon">
                          <DatePicker
                            selected={formData.deadline}
                            onChange={(date) => handleChange({ target: { name: 'deadline', value: date } })}
                            className={`form-control datetimepicker ${formData.deadline ? 'is-valid' : ''}`}
                            dateFormat="yyyy-MM-dd"
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>
                          Priority
                        </label>
                        <select 
                          className="form-control"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
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
                          Status
                        </label>
                        <select 
                          className="form-control"
                          name="activestatus"
                          value={formData.activestatus}
                          onChange={handleChange}
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
                        Created by
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
                        Project Leader
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
                    <label>Description</label>
                    <DefaultEditor 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
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
    </>
  );
};
export default Editproject;
