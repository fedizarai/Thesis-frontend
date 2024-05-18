import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { User } from "../../../Entryfile/imagepath.jsx";
import Cookies from 'js-cookie';

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Offcanvas from "../../../Entryfile/offcanvance/index.jsx";
import "../../index.css";
import { Link } from "react-router-dom/cjs/react-router-dom.js";

import RecentTable from "./Table/RecentTable.jsx";

 const AdminDashboard = () => {
 const [menu, setMenu] = useState(false);
 const [users, setUsers] = useState([]);
 const [projects, setProjects] = useState([]);
 const [userName, setUserName] = useState('');
 const [chartData, setChartData] = useState([]);
 const [projectProgressData, setProjectProgressData] = useState([]);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

 const profileId = Cookies.get('userid');
 // Calculate the total number of tasks
const totalTasks = projects.reduce((total, project) => total + project.tasks.length, 0);

// Calculate the count of tasks in each status
const pendingTasks = projects.reduce((total, project) => {
  return total + project.tasks.filter(task => task.status === 0).length;
}, 0);

const inProgressTasks = projects.reduce((total, project) => {
  return total + project.tasks.filter(task => task.status === 1).length;
}, 0);

const completedTasks = projects.reduce((total, project) => {
  return total + project.tasks.filter(task => task.status === 2).length;
}, 0);

// Calculate the percentages
const pendingTaskPercentage = Math.round((pendingTasks / totalTasks) * 100);
const inProgressTaskPercentage = Math.round((inProgressTasks / totalTasks) * 100);
const completedTaskPercentage = Math.round((completedTasks / totalTasks) * 100);


useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch projects data
      const projectsResponse = await fetch('http://localhost:3001/projects');
      if (!projectsResponse.ok) {
        throw new Error('Failed to fetch projects');
      }
      const projectsData = await projectsResponse.json();
      setProjects(projectsData);

      // Fetch users data
      const usersResponse = await fetch("http://localhost:3001/users");
      if (!usersResponse.ok) {
        throw new Error("Failed to fetch users");
      }
      const usersData = await usersResponse.json();
      setUsers(usersData);

      // Generating chart data for workload overview
      const loadedChartData = projectsData.map(project => ({
        y: project.title,
        "Working Hours": project.workinghours,
        "Number of Tasks": project.tasks.length // Assuming 'tasks' is an array of task objects
      }));
      setChartData(loadedChartData);

      // Calculate project progress data based on task deadlines
      const progressData = projectsData.reduce((acc, project) => {
        project.tasks.forEach(task => {
          const year = task.deadline ? new Date(task.deadline).getFullYear().toString() : 'Unknown';
          if (!acc[year]) {
            acc[year] = { year, totalTasks: 0, completedTasks: 0 };
          }
          acc[year].totalTasks += 1;
          if (task.status === 2) { // Assuming status 2 is 'completed'
            acc[year].completedTasks += 1;
          }
        });
        return acc;
      }, {});

      // Convert the accumulated object into an array for charting
      setProjectProgressData(Object.values(progressData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
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
    const profileId = Cookies.get('userid');
    console.log('userId', profileId);

    // Find the user with the specified profile ID
    const user = users.find(user => user.id === parseInt(profileId));
    console.log('User:', user);

    // Update the user name in state
    if (user) {
      // Split the full name by space and get the last part
      const fullName = user.name;
      const parts = fullName.split(' ');
      const surname = parts[0];
      setUserName(surname);
    }
  }, [users]);

  useEffect(() => {
    let firstload = localStorage.getItem("firstload");
    if (firstload === "false") {
      setTimeout(function () {
        window.location.reload(1);
        localStorage.removeItem("firstload");
      }, 1000);
    }
  });



  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={() => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Welcome {userName}!</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                <div className="card dash-widget">
                  <div className="card-body">
                    <span className="dash-widget-icon">
                      <i className="fa fa-cubes" />
                    </span>
                    <div className="dash-widget-info">
                      <h3>{projects.length}</h3>
                      <span>Projects</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                <div className="card dash-widget">
                  <div className="card-body">
                    <span className="dash-widget-icon">
                      <i className="fa fa-usd" />
                    </span>
                    <div className="dash-widget-info">
                      <h3>{projects.filter(project => project.activestatus === 'Completed').length}</h3>
                      <span>Completed Projects</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                <div className="card dash-widget">
                  <div className="card-body">
                    <span className="dash-widget-icon">
                      <i className="fa-regular fa-gem" />
                    </span>
                    <div className="dash-widget-info">
                      <h3>{projects.reduce((totalTasks, project) => totalTasks + project.tasks.length, 0)}</h3>
                      <span>Tasks</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                <div className="card dash-widget">
                  <div className="card-body">
                    <span className="dash-widget-icon">
                      <i className="fa fa-user" />
                    </span>
                    <div className="dash-widget-info">
                      <h3>{users.length}</h3>
                      <span>Employees</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">Project Workload Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={chartData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="y" angle={-15} textAnchor="end" interval={0} height={60} />
                            {/* Define two Y-axes */}
                            <YAxis yAxisId="left" orientation="left" stroke="#ff9b44" />
                            <YAxis yAxisId="right" orientation="right" stroke="#fc6075" />
                            <Tooltip />
                            <Legend />
                            {/* Link each bar to its corresponding Y-axis */}
                            <Bar yAxisId="left" dataKey="Working Hours" fill="#ff9b44" />
                            <Bar yAxisId="right" dataKey="Number of Tasks" fill="#fc6075" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 text-center">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">Projects Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={projectProgressData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                            <CartesianGrid />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="completedTasks"
                              name="Completed Tasks"
                              stroke="#ff9b44"
                              strokeWidth={3}
                              dot={{ r: 3 }}
                              activeDot={{ r: 7 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="totalTasks"
                              name="Total Tasks"
                              stroke="#fc6075"
                              strokeWidth={3}
                              dot={{ r: 3 }}
                              activeDot={{ r: 7 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">            
              
              <div className="col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <h4 className="card-title">Task Statistics</h4>
                    <div className="statistics">
                      <div className="row">
                        <div className="col-md-12 col-12 text-center">
                          <div className="stats-box mb-4">
                            <p>Total Tasks</p>
                            <h3>{projects.reduce((totalTasks, project) => totalTasks + project.tasks.length, 0)}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="progress mb-4">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: `${pendingTaskPercentage}%` }}
                        aria-valuenow={18}
                        aria-valuemin={0}
                        aria-valuemax={100}>
                        {pendingTaskPercentage}%
                      </div>
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: `${inProgressTaskPercentage}%` }}
                        aria-valuenow={12}
                        aria-valuemin={0}
                        aria-valuemax={100}>
                        {inProgressTaskPercentage}%
                      </div>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${completedTaskPercentage}%` }}
                        aria-valuenow={14}
                        aria-valuemin={0}
                        aria-valuemax={100}>
                        {completedTaskPercentage}%
                      </div>
                    </div>
                    <div>
                      <p>
                        <i className="far fa-dot-circle text-danger me-2" />
                        Pending Tasks <span className="float-end">{pendingTasks}</span>
                      </p>
                      <p>
                        <i className="far fa-dot-circle text-warning me-2" />
                        Inprogress Tasks <span className="float-end">{inProgressTasks}</span>
                      </p>
                      <p>
                        <i className="far fa-dot-circle text-success me-2" />
                        Completed Tasks <span className="float-end">{completedTasks}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex">
            <div className="card card-table flex-fill">
              <div className="card-header">
                <h3 className="card-title mb-0">Recent Projects</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project, index) => (
                        <tr key={index}>
                          <td>
                            <h2>
                              <Link to={`/app/projects/projects-view/${project.id}`}>
                                {project.title}
                              </Link>
                            </h2>
                            <small className="block text-ellipsis">
                              <span>{project.tasks.length}</span>{" "}
                              <span className="text-muted">open tasks, </span>
                              <span>{project.tasks.filter(task => task.status === 2).length}</span>{" "}
                              <span className="text-muted">tasks completed</span>
                            </small>
                          </td>
                          <td>
                             <div className="progress progress-xs progress-striped">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        data-bs-toggle="tooltip"
                        title={`${Math.round((project.tasks.filter(task => task.status === 2).length / project.tasks.length) * 100)}%`}
                        style={{ width: `${Math.round((project.tasks.filter(task => task.status === 2).length / project.tasks.length) * 100)}%` }}
                  
                      />
                    </div>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <Link to="/app/projects/project_dashboard">View all projects</Link>
        </div>
      </div>
    </div>

            </div>
          </div>
          {/* /Page Content */}
        </div>
      </div>
      <Offcanvas />
    </>
  );
};

export default withRouter(AdminDashboard);
