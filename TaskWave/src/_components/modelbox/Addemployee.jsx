import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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




const users = [
    {
      id: 1,
      image: Avatar_01,
      name: "John Doe",
      username: "John 2023",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Designer",
      employee_id: "FT-0001",
      email: "johndoe@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Hospital Administration",
      position: "Team Leader",


    },
    {
      id: 2,
      image: Avatar_01,
      name: "Richard Miles",
      username: "Richard 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0002",
      email: "richardmiles@example.com",
      mobile: "9876543210",
      joindate: "18 Mar 2014",
      project: "Video Calling App",
      position: "Team Leader",

    },
    {
      id: 3,
      image: Avatar_01,
      name: "John Smith",
      username:"John 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Android Developer",
      employee_id: "FT-0003",
      email: "johnsmith@example.com ",
      mobile: "9876543210",
      joindate: "1 Apr 2014",
      project: "Hospital Administration",
      position: "Manager",
    },
    {
      id: 4,
      image: Avatar_01,
      name: "Mike Litorus",
      username: +"Mike 2019",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer",
      employee_id: "FT-0004",
      email: "mikelitorus@example.com",
      mobile: "9876543210",
      joindate: "1 Apr 2014",
      project: "Office Management",
      position: "Manager",
    },
    {
      id: 5,
      image: Avatar_01,
      name: "Wilmer Deluna",
      username:"Wilmer 1920",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Team Leader",
      employee_id: "FT-0005",
      email: "wilmerdeluna@example.com",
      mobile: "9876543210",
      joindate: "22 May 2014",
      project: "Hospital Administration",
      position: "Employee",
    },
    {
      id: 6,
      image: Avatar_01,
      name: "Jeffrey Warden",
      username:"Jeffrey 2018",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0006",
      email: "jeffreywarden@example.com",
      mobile: "9876543210",
      joindate: "16 Jun 2013",
      project: "Video Calling App",
      position: "Employee",
    },
    {
      id: 7,
      image: Avatar_01,
      name: "Bernardo Galaviz",
      username: "Bernardo 1998",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0007",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Hospital Administration",
      position: "Team Leader",
    },
    {
      id: 8,
      image: Avatar_01,
      name: "Lesley Grauer",
      username: "Lesley 2015",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Team Leader",
      employee_id: "FT-0008",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Video Calling App",
      position: "Team Leader",
    },
    {
      id: 9,
      image: Avatar_01,
      name: "Jeffery Lalor",
      username: "Jeffery 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "Web Developer",
      employee_id: "FT-0009",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Hospital Administration",
      position: "Employee",
    },
    {
      id: 10,
      image: Avatar_01,
      name: "John Doe",
      username: "John 2016",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer  ",
      employee_id: "FT-0010",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Office Management",
      position: "Employee",

    },
     {
      id: 11,
      image: Avatar_01,
      name: "zarai fedi",
      username: "fedy 1920",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer  ",
      employee_id: "FT-0011",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Video Calling App",
      position: "Employee",
    },
     {
      id: 12,
      image: Avatar_01,
      name: "Jeffery Lalor",
      username: name+" 2024",
      birthdate: "24th July 1998",
      Gender: "Male",
      reportTo: "Jeffery Lalor",
      adress: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      role: "IOS Developer  ",
      employee_id: "FT-0012",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
      project: "Office Management",
      position: "Employee",
    },
  ];




const Addemployee = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
   const [formClosed, setFormClosed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    employeeID: '',
    email: '',
    position: '',
    reportTo: '',
    birthDate: '',
    joiningDate: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setIsTyping(true);
  };

  const handleSubmit = (e) => {
   e.preventDefault();
  
  // Basic form validation
  if (!formData.fullName || !formData.role || !formData.employeeID || !formData.email || !formData.birthDate || !formData.joiningDate) {
    alert('Please fill in all required fields');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Phone number validation
  const phoneRegex = /^\d+$/;
  if (formData.phone && !phoneRegex.test(formData.phone)) {
    alert('Please enter a valid phone number.');
    return;
  }

  // Additional validation logic can be added here

  // If validation passes, proceed with form submission
  console.log('Form submitted:', formData);
  // Here, you can make an API call to submit the form data or perform any other necessary actions

  setFormClosed(true);
};



  return (
    <>
      <div id="add_employee" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Employee</h5>
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
                      <label className="col-form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input 
                        className={`form-control ${isTyping && formData.fullName.trim() !== '' ? 'is-valid' : 'is-invalid'}`}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Role<span className="text-danger">*</span>
                      </label>
                      <input 
                        className={`form-control ${isTyping && formData.role.trim() !== '' ? 'is-valid' : 'is-invalid'}`} 
                        type="text" 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Employee ID<span className="text-danger">*</span>
                      </label>
                      <input 
                        className={`form-control ${isTyping && formData.employeeID.trim() !== '' ? 'is-valid' : 'is-invalid'}`}
                        type="text" 
                        name="employeeID"
                        value={formData.employeeID}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input 
                        className={`form-control ${formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'is-valid' : 'is-invalid'}`}  
                        type="text" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Position<span className="text-danger">*</span>
                      </label>
                      <select 
                         className={`form-control ${isTyping && formData.position.trim() !== '' ? 'is-valid' : 'is-invalid'}`} 
                         name="position"
                         value={formData.position}
                         onChange={handleChange}
                         required 
                       >
                        <option value="">Select a position</option>
                        <option value="Team Leader">Manager</option>
                        <option value="Manager">Team Leader</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Report To<span className="text-danger">*</span>
                      </label>
                      <select 
                         className={`form-control ${isTyping && formData.reportTo.trim() !== '' ? 'is-valid' : 'is-invalid'}`} 
                         name="reportTo"
                         value={formData.reportTo}
                         onChange={handleChange}
                         required 
                       >
                        <option value="">Select an option</option>
                        {users.map(user => {
                          if (user.position === "Team Leader") {
                           return (
                              <option key={user.id} value={user.name}>{user.name}</option>
                           );
                          }
                          return null; // Skip rendering if not a Team Leader
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Birth Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={formData.birthDate}
                          onChange={(date) => handleChange({ target: { name: 'birthDate', value: date } })}
                          className={`form-control datetimepicker ${formData.birthDate ? 'is-valid' : ''}`}
                          dateFormat="yyyy-MM-dd"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Joining Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={formData.joiningDate}
                          onChange={(date) => handleChange({ target: { name: 'joiningDate', value: date } })}
                          className={`form-control datetimepicker ${formData.joiningDate ? 'is-valid' : ''}`}
                          dateFormat="yyyy-MM-dd"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button  type="submit" className="btn btn-primary submit-btn"  >
                   Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Addemployee;
