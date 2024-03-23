import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { User } from "../../../Entryfile/imagepath.jsx";

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

const barchartdata = [
  { y: "2006", "Total Income": 100, "Total Outcome": 90 },
  { y: "2007", "Total Income": 75, "Total Outcome": 65 },
  { y: "2008", "Total Income": 50, "Total Outcome": 40 },
  { y: "2009", "Total Income": 75, "Total Outcome": 65 },
  { y: "2010", "Total Income": 50, "Total Outcome": 40 },
  { y: "2011", "Total Income": 75, "Total Outcome": 65 },
  { y: "2012", "Total Income": 100, "Total Outcome": 90 },
];
const linechartdata = [
  { y: "2006", "Total Sales": 50, "Total Revenue": 90 },
  { y: "2007", "Total Sales": 75, "Total Revenue": 65 },
  { y: "2008", "Total Sales": 50, "Total Revenue": 40 },
  { y: "2009", "Total Sales": 75, "Total Revenue": 65 },
  { y: "2010", "Total Sales": 50, "Total Revenue": 40 },
  { y: "2011", "Total Sales": 75, "Total Revenue": 65 },
  { y: "2012", "Total Sales": 100, "Total Revenue": 50 },
];
const AdminDashboard = () => {
  const [menu, setMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

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
                  <h3 className="page-title">Welcome Admin!</h3>
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
                      <h3>112</h3>
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
                      <h3>44</h3>
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
                      <h3>37</h3>
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
                      <h3>218</h3>
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
                        <h3 className="card-title">Projects Revenue</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={barchartdata}
                            margin={{
                              top: 5,
                              right: 5,
                              left: 5,
                              bottom: 5,
                            }}>
                            <CartesianGrid />
                            <XAxis dataKey="y" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Total Income" fill="#ff9b44" />
                            <Bar dataKey="Total Outcome" fill="#fc6075" />
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
                          <LineChart
                            data={linechartdata}
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                            <CartesianGrid />
                            <XAxis dataKey="y" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="Total Sales"
                              stroke="#ff9b44"
                              fill="#00c5fb"
                              strokeWidth={3}
                              dot={{ r: 3 }}
                              activeDot={{ r: 7 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="Total Revenue"
                              stroke="#fc6075"
                              fill="#0253cc"
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
              <RecentTable />
              <div className="col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <h4 className="card-title">Task Statistics</h4>
                    <div className="statistics">
                      <div className="row">
                        <div className="col-md-6 col-6 text-center">
                          <div className="stats-box mb-4">
                            <p>Total Tasks</p>
                            <h3>385</h3>
                          </div>
                        </div>
                        <div className="col-md-6 col-6 text-center">
                          <div className="stats-box mb-4">
                            <p>Overdue Tasks</p>
                            <h3>19</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="progress mb-4">
                      <div
                        className="progress-bar bg-purple"
                        role="progressbar"
                        style={{ width: "30%" }}
                        aria-valuenow={30}
                        aria-valuemin={0}
                        aria-valuemax={100}>
                        30%
                      </div>
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: "22%" }}
                        aria-valuenow={18}
                        aria-valuemin={0}
                        aria-valuemax={100}>
                        22%
                      </div>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "24%" }}
                        aria-valuenow={12}
                        aria-valuemin={0}
                        aria-valuemax={100}>
                        24%
                      </div>
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "26%" }}
                        aria-valuenow={14}
                        aria-valuemin={0}
                        aria-valuemax={100}>
                        21%
                      </div>
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: "10%" }}
                        aria-valuenow={14}
                        aria-valuemin={0}
                        aria-valuemax={100}>
                        10%
                      </div>
                    </div>
                    <div>
                      <p>
                        <i className="far fa-dot-circle text-purple me-2" />
                        Completed Tasks <span className="float-end">166</span>
                      </p>
                      <p>
                        <i className="far fa-dot-circle text-warning me-2" />
                        Inprogress Tasks <span className="float-end">115</span>
                      </p>
                      <p>
                        <i className="far fa-dot-circle text-success me-2" />
                        On Hold Tasks <span className="float-end">31</span>
                      </p>
                      <p>
                        <i className="far fa-dot-circle text-danger me-2" />
                        Pending Tasks <span className="float-end">47</span>
                      </p>
                      <p className="mb-0">
                        <i className="far fa-dot-circle text-info me-2" />
                        Review Tasks <span className="float-end">5</span>
                      </p>
                    </div>
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
