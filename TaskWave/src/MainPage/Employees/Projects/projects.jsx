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

  const [titleInput, setTitleInput] = useState('');
  const [searchCreator, setSearchCreator] = useState('');
  const [searchPriority, setSearchPriority] = useState('');


    const handleTitleInputChange = (e) => {
    setTitleInput(e.target.value);
  };

  const handleCreatorInputChange = (e) => {
    setSearchCreator(e.target.value);
  };

  const handlePriorityInputChange = (e) => {
    setSearchPriority(e.target.value);
  };

   const filteredProjects = projects.filter((project) =>{
    


    let titleMatch = true;
    let creatorMatch = true;
    let priorityMatch = true;


  // Filter based on name
    if (titleInput) {
       titleMatch = project.title.toLowerCase().includes(titleInput.toLowerCase());
    }


    // Filter based on age
    if (searchCreator) {
       creatorMatch = project.creator.toLowerCase().includes(searchCreator.toLowerCase());
  }
    // Filter based on city
    if (searchPriority) {
       priorityMatch = project.priority.toLowerCase().includes(searchPriority.toLowerCase());
    }
    // Combine all filters
    return titleMatch && creatorMatch && priorityMatch
});


  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  function onChange(e) {
    setHtml(e.target.value);
  }
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
                <Link
                  to="#"
                  className="btn add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#create_project">
                  <i className="fa fa-plus" /> Create Project
                </Link>
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
                  onChange={handlePriorityInputChange}
                  onFocus={() => setFocused1(true)}
                  onBlur={() => setFocused1(false)}
                />
                <label className="focus-label">Domain</label>
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
              <ProjectCard key={index} project={project} />
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
                <form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Project Name</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Client</label>
                        <select className="select">
                          <option>Global Technologies</option>
                          <option>Delta Infotech</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Start Date</label>
                        <div className="cal-icon">
                          <DatePicker
                            selected={selectedDate1}
                            onChange={handleDateChange1}
                            className="form-control datetimepicker"
                            type="date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>End Date</label>
                        <div className="cal-icon">
                          <DatePicker
                            selected={selectedDate2}
                            onChange={handleDateChange2}
                            className="form-control datetimepicker"
                            type="date"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="input-block">
                        <label>Rate</label>
                        <input
                          placeholder="$50"
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="input-block">
                        <label>&nbsp;</label>
                        <select className="select">
                          <option>Hourly</option>
                          <option>Fixed</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Priority</label>
                        <select className="select">
                          <option>High</option>
                          <option>Medium</option>
                          <option>Low</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Add Project Leader</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Team Leader</label>
                        <div className="project-members">
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            title="Jeffery Lalor"
                            className="avatar">
                            <img src={Avatar_16} alt="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Add Team</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="input-block">
                        <label>Team Members</label>
                        <div className="project-members">
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            title="John Doe"
                            className="avatar">
                            <img src={Avatar_16} alt="" />
                          </Link>
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            title="Richard Miles"
                            className="avatar">
                            <img src={Avatar_09} alt="" />
                          </Link>
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            title="John Smith"
                            className="avatar">
                            <img src={Avatar_10} alt="" />
                          </Link>
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            title="Mike Litorus"
                            className="avatar">
                            <img src={Avatar_05} alt="" />
                          </Link>
                          <span className="all-team">+2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-block">
                    <label>Description</label>
                    <DefaultEditor value={html} onChange={onChange} />
                  </div>
                  <div className="input-block">
                    <label>Upload Files</label>
                    <input className="form-control" type="file" />
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
        {/* /Create Project Modal */}



        {/* Edit Project Modal */}
        <Editproject />
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
        {/* /Delete Project Modal */}
      </div>
      <Offcanvas />
    </>
  );
};

export default Projects;
