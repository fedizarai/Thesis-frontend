/* eslint-disable no-undef */
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


const AllEmployees = ({users}) => {
  const [focused, setFocused] = useState(false);
  const [focused1, setFocused1] = useState(false);
  const [menu, setMenu] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [userToDelete, setUserToDelete] = useState(null);
  const [users1, setUsers] = useState(users);

 


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

   const handleDeleteEmployeeClick = (e, employee) => {
    e.stopPropagation(); // Prevent event from propagating to unintended targets
    setUserToDelete(employee);
    // Code to show modal
};

   const employeeDelete = () => {
     if (userToDelete?.id) {
      console.log(userToDelete);
      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      setUsers(updatedUsers);
      // Additional logic to close modal and reset userToDelete
      setUserToDelete(null);
    } else {
    console.error('Attempted to delete a user, but no user was selected.');
    // Handle the error case appropriately
  }
};

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

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
                  <Link
                    to="#"
                    className="btn add-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#add_employee">
                    <i className="fa fa-plus" /> Add Employee
                  </Link>
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
              <EmployeeCard key={employee.id} employee={employee} onDeleteClick={handleDeleteEmployeeClick} />
            ))}
            </div>
          </div>
          {/* /Page Content */}

          
          {/* Add Employee Modal */}
          <Addemployee />
          {/* /Add Employee Modal */}


          {/* Edit Employee Modal */}
          <Editemployee />
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
                           onClick={() => {employeeDelete(userToDelete.id);}}
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
