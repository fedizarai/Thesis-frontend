import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.min.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import {
  Avatar_02,
  Avatar_05,
  Avatar_11,
  Avatar_12,
  Avatar_09,
  Avatar_10,
  Avatar_13,
} from "../../../Entryfile/imagepath";
import Editemployee from "../../../_components/modelbox/Editemployee";
import Addemployee from "../../../_components/modelbox/Addemployee";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Offcanvas from "../../../Entryfile/offcanvance";
import Cookies from 'js-cookie';

const Employeeslist = ( ) => {

  
  const [menu, setMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const [focused1, setFocused1] = useState(false);
  const [users, setUsers] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchRole, setSearchRole] = useState('');
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

  const toggleMobileMenu = () => {
    setMenu(!menu);
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


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="/app/profile/employee-profile" className="avatar">
            <img alt="" src={record.image} />
          </Link>
          <Link to={`/app/profile/employee-profile/${record.id}`}>        
            {text} <span>{record.role}</span>
          </Link>
        </h2>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      sorter: (a, b) => a.employee_id.length - b.employee_id.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },

    {
      title: "Join Date",
      dataIndex: "join_date",
      render: (joinDate) => new Date(joinDate).toLocaleDateString(),
      sorter: (a, b) => new Date(a.join_date) - new Date(b.join_date),
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
      
    },
    
  ];
  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={() => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <Helmet>
            <title>Employeeslist</title>
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
                      className="grid-view btn btn-link">
                      <i className="fa fa-th" />
                    </Link>
                    <Link
                      to="/app/employee/employees-list"
                      className="list-view btn btn-link active">
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
            {/* /Search Filter */}




            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={{
                      total: filteredUsers.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    // bordered
                    dataSource={filteredUsers}
                    // rowKey={(record) => record.id}
                    // onChange={console.log("change")}
                  />
                </div>
              </div>
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
                        <Link to="" className="btn btn-primary continue-btn">
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

export default Employeeslist;
