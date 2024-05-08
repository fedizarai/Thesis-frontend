/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Avatar_02,
  Avatar_05,
  Avatar_10,
  Avatar_11,
  Avatar_12,
} from "../../../Entryfile/imagepath";

import { Table } from "antd";
import "antd/dist/antd.min.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "antd/dist/antd.min.css";
import Offcanvas from "../../../Entryfile/offcanvance";

const PerformanceIndicator = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3001/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const projectsData = await response.json();
      return projectsData;
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const projectsData = await fetchProjects(); // Ensure projects are fetched first
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const usersData = await response.json();
      // Now we have both users and projects
      const enrichedUsers = usersData.map(user => {
        const assignedTasks = projectsData.reduce((acc, project) => acc + project.tasks.filter(task => task.assignee === user.name).length, 0);
        const completedTasks = projectsData.reduce((acc, project) => acc + project.tasks.filter(task => task.assignee === user.name && task.status === 0).length, 0);
        const performanceScore = assignedTasks > 0 ? Math.round((completedTasks / assignedTasks) * 100) : 0;
        
        const performanceGrade = performanceScore < 34 ? "Bad" :
                                 performanceScore < 67 ? "Moderate" : "Good";

        return { ...user, assignedTasks, completedTasks, performanceScore, performanceGrade };
      });
      setUsers(enrichedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, []);


  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const columns = [
    
  {
    title: "Name",
    dataIndex: "name",
    render: (text, record) => (
      <h2 className="table-avatar">
        <Link to={`/app/profile/employee-profile/${record.id}`} className="avatar">
          <img alt="" src={record.image} />
        </Link>
        <Link to={`/app/profile/employee-profile/${record.id}`}>
          {text} <span>{record.role}</span>
        </Link>
      </h2>
    ),
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
   {
    title: "Employee ID",
    dataIndex: "employee_id",
    sorter: (a, b) => a.employee_id - b.employee_id,
  },
  { title: "Role", dataIndex: "role", sorter: (a, b) => a.role.localeCompare(b.role) },
    { title: "Assigned Tasks", dataIndex: "assignedTasks", align: 'center',sorter: (a, b) => a.assignedTasks - b.assignedTasks },
    { title: "Completed Tasks", dataIndex: "completedTasks", align: 'center',sorter: (a, b) => a.completedTasks - b.completedTasks },
    { title: "Score", dataIndex: "performanceScore", align: 'center',sorter: (a, b) => a.performanceScore - b.performanceScore },
    { title: "Performance Grade",align: 'center', dataIndex: "performanceGrade" }
  ];
  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>Performance</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Performance Indicator</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Performance</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  pagination={{
                    total: users.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  // bordered
                  dataSource={users}
                  rowKey={(record) => record.id}
                  // onChange={this.handleTableChange}
                />
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

export default PerformanceIndicator;
