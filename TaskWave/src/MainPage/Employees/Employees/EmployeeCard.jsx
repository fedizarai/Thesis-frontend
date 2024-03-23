import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Link } from "react-router-dom";
import Editproject from "../../../_components/modelbox/Editproject";
import Offcanvas from "../../../Entryfile/offcanvance";




const EmployeeCard = ({ employee,onDeleteClick }) =>  {

  const { id, name,role,image,employee_id} = employee;


  return (

    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                <div className="profile-widget">
                  <div className="profile-img">
                    <Link to={`/app/profile/employee-profile/${id}`} className="avatar">
                      <img src={image} alt="" style={{ aspectRatio: '1/1' }}/>
                    </Link>
                  </div>
                  <div className="dropdown profile-action">
                    <Link
                      to="#"
                      className="action-icon dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <i className="material-icons">more_vert</i>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_employee">
                        <i className="fa fa-pencil m-r-5" /> Edit
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_employee"
                         
                      >
                        <i className="fa-regular fa-trash-can m-r-5" /> Delete
                      </Link>
                    </div>
                  </div>
                  <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                    <Link to="/app/profile/employee-profile">{name}</Link>
                  </h4>
                  <div className="big text-muted">{role}</div>
                  <div className="mediumblue text-muted">{employee_id}</div>
                </div>
              </div>


   
  );
};

export default EmployeeCard;