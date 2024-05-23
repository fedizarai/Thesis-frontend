import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Avatar_01,
  Avatar_02,
  Avatar_03,
  Avatar_04,
  Avatar_05,
  Avatar_11,
  Avatar_12,
  Avatar_09,
  Avatar_10,
  Avatar_08,
  Avatar_13,
  Avatar_16,
} from "../../../Entryfile/imagepath";
import Addemployee from "../../../_components/modelbox/Addemployee";
import Editemployee from "../../../_components/modelbox/Editemployee";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Header from "../../../initialpage/Sidebar/header";
import Offcanvas from "../../../Entryfile/offcanvance";
import EmployeeCard from './EmployeeCard';
import Cookies from 'js-cookie';



const AllEmployees = (  ) => {
  const [focused, setFocused] = useState(false);
  const [focused1, setFocused1] = useState(false);
  const [menu, setMenu] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState(null);
  const [users, setUsers] = useState([]);
  const [employeeToEditId, setEmployeeToEditId] = useState(null);
  const profileId = Cookies.get('userid');
  const [userPosition, setUserPosition] = useState('');

 


  const handleNameInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleIdInputChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleRoleInputChange = (e) => {
    setSearchRole(e.target.value);
  };

   const filteredUsers = users.filter((user) =>{
    


    let nameMatch = true;
    let idMatch = true;
    let roleMatch = true;


  // Filter based on name
    if (nameInput) {
       nameMatch = user.name.toLowerCase().includes(nameInput.toLowerCase());
    }


    // Filter based on age
    if (searchId) {
       idMatch = user.employee_id.toLowerCase().includes(searchId.toLowerCase());
  }
    // Filter based on city
    if (searchRole) {
       roleMatch = user.role.toLowerCase().includes(searchRole.toLowerCase());
    }
    // Combine all filters
    return nameMatch && roleMatch && idMatch
});

 const handleDeleteEmployeeClick = (id) => {
    setEmployeeToDeleteId(id); 
    console.log("Employee to delete ID 2024:", id); 
    
  };


const employeeDelete = async (employeeId) => {
  try {
    console.log("Employee to delete ID:", employeeId);
    const response = await fetch(`http://localhost:3001/deleteEmployee/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
    // Get the updated list of users after deletion
    const updatedUsers = await response.json();
    setUsers(updatedUsers);
    // Reset employeeToDeleteId after successful deletion
    setEmployeeToDeleteId(null);
    window.location.reload();
  } catch (error) {
    console.error('Error deleting employee:', error);
    // Handle the error case appropriately, such as displaying a message to the user
  }
};







  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const handleEditEmployeeClick = (id) => {
    setEmployeeToEditId(id); // Set the employee ID to edit
  };

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





  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={() => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <Helmet>
            <title>Employee</title>
            <meta name="description" content="Login page" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">


            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Employee</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Employee</li>
                  </ul>
                </div>
                <div className="col-auto float-end ms-auto">
                  {userPosition === "Manager" && (
                    <Link
                      to="#"
                      className="btn add-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#add_employee">
                      <i className="fa fa-plus" /> Add Employee
                    </Link>
                   )}  
                  <div className="view-icons">
                    <Link
                      to="/app/employee/allemployees"
                      className="grid-view btn btn-link active mx-2">
                      <i className="fa fa-th" />
                    </Link>
                    <Link
                      to="/app/employee/employees-list"
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
                    onChange={handleNameInputChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                  />
                  <label className="focus-label">Employee Name</label>
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
                    onChange={handleIdInputChange}
                    onFocus={() => setFocused1(true)}
                    onBlur={() => setFocused1(false)}
                  />
                  <label className="focus-label">Employee ID </label>
                </div>
              </div><div className="col-sm-6 col-md-3">
                <div
                  className={
                    focused1
                      ? "input-block form-focus focused"
                      : "input-block form-focus"
                  }>
                  <input
                    type="text"
                    className="form-control floating"
                    onChange={handleRoleInputChange}
                    onFocus={() => setFocused1(true)}
                    onBlur={() => setFocused1(false)}
                  />
                  <label className="focus-label">Employee Role </label>
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


            <div className="row staff-grid-row">
              {filteredUsers.map((employee, index) => (
              <EmployeeCard key={employee.id} employee={employee} onDeleteClick={handleDeleteEmployeeClick} onEditClick={handleEditEmployeeClick} />
            ))}
            </div>
          </div>
          {/* /Page Content */}

          
          {/* Add Employee Modal */}
          <Addemployee />
          {/* /Add Employee Modal */}


          {/* Edit Employee Modal */}
          <Editemployee profileId={employeeToEditId} />
          {/* /Edit Employee Modal */}


          {/* Delete Employee Modal */}
          <div
            className="modal custom-modal fade"
            id="delete_employee"
            role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>Delete Employee</h3>
                    <p>Are you sure want to delete?</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                        <Link 
                           to="#" 
                           className="btn btn-primary continue-btn" 
                           onClick={() => employeeDelete(employeeToDeleteId)}
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
          {/* /Delete Employee Modal */}

          
        </div>
      </div>
      <Offcanvas />
    </>
  );
};

export default AllEmployees;
