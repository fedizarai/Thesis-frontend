/* eslint-disable no-undef */
import React, { useEffect   , useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link,useParams } from "react-router-dom";
import {
  Avatar_01,
  Diagram,
  PlaceHolder,
  eye,
} from "../../../Entryfile/imagepath";
import { keyboard, mouse, laptop } from "../../../Entryfile/imagepath";
import Offcanvas from "../../../Entryfile/offcanvance";
import ProjectCard from "../../Employees/Projects/ProjectCard";

const EmployeeProfile = () => {
  
  const [loginError, setLoginError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [formClosed, setFormClosed] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    gender: '',
    mobile: '',
    birthDate: '',
    address: '',
    image: '',
  });
  
  const { profileId } = useParams();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setIsTyping(true);
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result, 
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedFields = {};

    for (const key in formData) {
        if (formData[key] !== profileData[key]) {
            updatedFields[key] = formData[key];
        }
    }

    const payload = {
        ...updatedFields,
        id: profileId, 
    };

    try {
        const response = await fetch('http://localhost:3001/update-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.log("Error response from server:", errorData);
            if (response.status === 409 && errorData.error === "Email already exists") {
                console.log("Email already exists. Setting loginError state.");
                setLoginError("Email already exists. Please use a different email.");
            } else {
                throw new Error(errorData.message || 'Network response was not ok');
            }
        } else {
            const data = await response.json();
            window.location.reload();
        }
    } catch (error) {
        console.error('Profile update failed:', error);
        alert(`Profile update failed: ${error.message}`);
    }
};


  const filteredprojects = projects.filter(project => {
      if (Array.isArray(project.team)) {
        for (const member of project.team) {

            if (member.name === findUserNameById(profileId)) {
              return true; // Found the project with the team member
      }
    }
  }
   return false; // Team member not found in this project
  });


  function findUserNameById(id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(id, 10)) {
            return users[i].name;
        }
    }
    return null; // Return null if no user found with the given id
}

const findUserIdByName = (name) => {
  const user = users.find((user) => user.name === name);
  return user ? user.id : null;
};

const findImageByName = (name) => {
  const user = users.find((user) => user.name === name);
  return user ? user.image : null;
};


  const { loginvalue } = useSelector((state) => state.user);
  const UserName = loginvalue?.email?.split("@")[0];
  const ProfileName = UserName?.charAt(0).toUpperCase() + UserName?.slice(1);

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
  // Fetch profile data
  fetch(`http://localhost:3001/profile/${profileId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setProfileData(data);
      // Fetch all user data
      fetch('http://localhost:3001/users')
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((userData) => {
          // Set the retrieved user data
          setUsers(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    })
    .catch((error) => console.error("There was a problem with fetch operation:", error));
}, [profileId]);


useEffect(() => {
  if (profileData) {
    setFormData({
      name: profileData.name || '',
      username: profileData.username || '',
      email: profileData.email || '',
      gender: profileData.gender || '',
      mobile: profileData.mobile || '',
      birthDate: profileData.birthdate ? profileData.birthdate.split('T')[0] : '', // Assuming birthDate is in ISO format
      address: profileData.address || '',
      image: profileData.image || "",
    });
  }
}, [profileData]);

if (!profileData) {
  return <div>Loading...</div>;
}



  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>{profileData.name}'s Profile</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">


          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}


          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                        <Link to="#">
                          <img alt="img" src={profileData.image}  />
                        </Link>
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">
                              {profileData.name}
                            </h3>
                            <h4 className="text-muted">{profileData.role}</h4>
                            <h5 className="text-muted">{profileData.position}</h5>
                            <div className="staff-id">
                              Employee ID : {profileData.employee_id}
                            </div>
                            <div className="small doj text-muted">
                              Date of Join : {profileData.join_date ? formatDate(profileData.join_date) : ''}
                            </div>
                            <div className="staff-msg">
                              <Link
                                onClick={() =>
                                  localStorage.setItem("minheight", "true")
                                }
                                className="btn btn-custom"
                                to="/conversation/chat">
                                Send Message
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text">
                                <Link to="#">{profileData.mobile}</Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Email:</div>
                              <div className="text">
                                <Link to="#">
                                  {profileData.email}
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Username:</div>
                              <div className="text">
                                <Link to="#">{profileData.username}</Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Birthday:</div>
                              <div className="text">{profileData.birthdate ? formatDate(profileData.birthdate) : ''}</div>
                            </li>
                            <li>
                              <div className="title">Address:</div>
                              <div className="text">
                                {profileData.address}
                              </div>
                            </li>
                            <li>
                              <div className="title">Gender:</div>
                              <div className="text">{profileData.gender}</div>
                            </li>
                            <li>
                              <div className="title">Reports to:</div>
                              <div className="text">
                                <div className="avatar-box">
                                  <div className="avatar avatar-xs">
                                    <img src={findImageByName(profileData.report_to)} alt="img" />
                                  </div>
                                </div>
                                <Link to={`/app/profile/employee-profile/${findUserIdByName(profileData.report_to)}`}>
                                  {profileData.report_to}
                                </Link>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="pro-edit">
                      <Link
                        data-bs-target="#profile_info"
                        data-bs-toggle="modal"
                        className="edit-icon"
                        to="#">
                        <i className="fa fa-pencil" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card tab-box">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  {/*<li className="nav-item">
                    <Link
                      to="#emp_profile"
                      data-bs-toggle="tab"
                      className="nav-link active">
                        Experience
                    </Link>
                  </li>*/}
                  <li className="nav-item">
                    <Link
                      to="#emp_projects"
                      data-bs-toggle="tab"
                      className="nav-link">
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-content">





            {/* Experience Info Tab */}
          {/*  <div
              id="emp_profile"
              className="pro-overview tab-pane fade show active">
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Experience{" "}
                        <Link
                          to="#"
                          className="edit-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#experience_info">
                          <i className="fa fa-pencil" />
                        </Link>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          <li>
                            <div className="experience-user">
                              <div className="before-circle" />
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <Link to="/" className="name">
                                  Web Designer at Zen Corporation
                                </Link>
                                <span className="time">
                                  Jan 2013 - Present (5 years 2 months)
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-user">
                              <div className="before-circle" />
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <Link to="/" className="name">
                                  Web Designer at Ron-tech
                                </Link>
                                <span className="time">
                                  Jan 2013 - Present (5 years 2 months)
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-user">
                              <div className="before-circle" />
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <Link to="/" className="name">
                                  Web Designer at Dalt Technology
                                </Link>
                                <span className="time">
                                  Jan 2013 - Present (5 years 3 months)
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>*/}
            {/* /Experience Info Tab */}





            {/* Projects Tab */}
            <div className="tab-pane fade" id="emp_projects">
              <div className="row">
                  {filteredprojects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                     ))}
              </div>
            </div>
            {/* /Projects Tab */}



          </div>
        </div>
        {/* /Page Content */}








        {/* Profile Modal */}
        <div
          id="profile_info"
          className="modal custom-modal fade"
          role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Profile Information</h5>
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
                    <div className="col-md-12">
                      <div className="profile-img-wrap edit-img">
                        <img
                          className="inline-block"
                          src={formData.image || profileData.image}
                          alt="user"
                        />
                        <div className="fileupload btn">
                          <span className="btn-text">edit</span>
                          <input 
                             className="upload" 
                             type="file" 
                             accept="image/*"
                             onChange={(e) => handleImageUpload(e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Full Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                             
                              
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Username</label>
                            <input
                              type="text"
                              className="form-control"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Birth Date</label>
                            <div>
                              <input
                                className="form-control datetimepicker"
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                             <label>Gender</label>
                             <select 
                                name="gender" 
                                value={formData.gender} 
                                onChange={handleChange} 
                                className="select form-control"
                             >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                             </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Email</label>
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}                              
                            />
                           
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                            <label>Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleChange}
                              
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-6">
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                  </div>
                  <div className="submit-section">
                    {loginError && <div className="alert alert-danger">{loginError}</div>}
                    <button  className="btn btn-primary submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Profile Modal */}
    


        
        {/* Experience Modal */}
        <div
          id="experience_info"
          className="modal custom-modal fade"
          role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Experience Informations</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-scroll">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">
                          Experience Informations{" "}
                          <Link to="#" className="delete-icon">
                            <i className="fa fa-trash" />
                          </Link>
                        </h3>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder="Company Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder="Location"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder=" Job Position"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <div>
                                <input
                                  type="date"
                                  className="form-control floating datetimepicker"
                                  placeholder="Period From"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <div>
                                <input
                                  type="date"
                                  className="form-control floating datetimepicker"
                                  placeholder="Period To"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">
                          Experience Informations{" "}
                          <Link to="#" className="delete-icon">
                            <i className="fa fa-trash" />
                          </Link>
                        </h3>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder=" Company Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder="Location"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <input
                                type="text"
                                className="form-control floating"
                                placeholder="Job Position"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <div>
                                <input
                                  type="date"
                                  className="form-control floating datetimepicker"
                                  placeholder="Period From"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block form-focus">
                              <div>
                                <input
                                  type="date"
                                  className="form-control floating datetimepicker"
                                  placeholder="Period To"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="add-more">
                          <Link to="#">
                            <i className="fa fa-plus-circle" /> Add More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Experience Modal */}



      </div>
      <Offcanvas />
    </>
  );
};
export default EmployeeProfile;
