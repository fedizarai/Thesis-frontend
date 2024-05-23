import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Avatar_11,
  Avatar_09,
  Avatar_02,
  Avatar_10,
  Avatar_05,
  Avatar_12,
  Avatar_01,
  Avatar_13,
  Avatar_16,
} from "../../Entryfile/imagepath";
import { Table } from "antd";
// import 'antd/dist/antd.min.css'
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";

const Leads = () => {

    const [leads, setLeads] = useState([]);

    const fetchLeads = async () => {
     try {
      const response = await fetch("http://localhost:3001/users");
      if (response.ok) {
        const data = await response.json();
        // Filter users based on position
        const leadsData = data.filter(user => user.position === "Team Leader");
        setLeads(leadsData);
      } else {
        console.error("Failed to fetch leads:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);
  

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: "Lead Name",
      dataIndex: "name",
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="/app/profile/employee-profile" className="avatar">
            <img alt="" src={record.image} />
          </Link>
          <Link to={`/app/profile/employee-profile/${record.id}`}> {text}</Link>
        </h2>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      render: (text) => <Link to="/app/projects/projects-view">{text}</Link>,
      sorter: (a, b) => a.project.length - b.project.length,
    },
    
  ];
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Leads</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Leads</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Leads</li>
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
                  total: leads.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                columns={columns}
                // bordered
                dataSource={leads}
                rowKey={(record) => record.id}
                // onChange={console.log("change value")}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default Leads;
