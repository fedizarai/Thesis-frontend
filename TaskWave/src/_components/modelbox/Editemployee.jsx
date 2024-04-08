import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Editemployee = ({ profileId }) => {
   


  const [selectedDate, setSelectedDate] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [formClosed, setFormClosed] = useState(false);
  const [users, setUsers] = useState([]);
   const [formData, setFormData] = useState({
    name: '',
    role: '',
    employee_id: '',
    email: '',
    position: '',
    report_to: '',
    birthdate: '',
    join_date: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setIsTyping(true);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, role, employee_id, email, position, report_to, birthdate, join_date } = formData;

  // Basic form validation
  if (!name || !role || !employee_id || !email || !position || !report_to || !birthdate || !join_date) {
    alert('Please fill in all required fields');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Construct the request body
  const requestBody = {
    name,
    role,
    employee_id,
    email,
    position,
    report_to,
    birthdate,
    join_date
  };

  try {
    // Make API call to update employee
    console.log('Form Data:', requestBody);
    const response = await fetch(`http://localhost:3001/editEmployee/${profileId}`, { // Include profileId in the URL
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    console.log('Response:', response);
    if (response.ok) {
      window.location.reload();
      setFormData({
        name: '',
        role: '',
        employee_id: '',
        email: '',
        position: '',
        report_to: '',
        birthdate: '',
        join_date: '',
      });
    } else {
      // Error updating employee
      alert('Failed to update employee. Please try again.');
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    alert('An error occurred while updating employee. Please try again.');
  }
};



  const handleDateChange = (date, fieldName) => {
  setFormData({
    ...formData,
    [fieldName]: date
  });
};

 


  useEffect(() => {
  const fetchUserData = async () => {
    try {
      if (!profileId) {
        return; // Exit early if profileId is null or undefined
      }
      const response = await fetch(`http://localhost:3001/profile/${profileId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();

      // Set the formData state, including the report_to field
      setFormData({
        ...userData,
        report_to: userData.report_to // Ensure report_to is set correctly
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchUserData();
}, [profileId]);


useEffect(() => {
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const allUsers = await response.json();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchAllUsers();
}, []);


  return (
    <>
      <div id="edit_employee" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Employee</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Full Name 
                      </label>
                      <input 
                        className={`form-control`}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Role
                      </label>
                      <input 
                        className={`form-control`} 
                        type="text" 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Employee ID
                      </label>
                      <input 
                        className={`form-control `}
                        type="text" 
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Email 
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
                        Position
                      </label>
                      <select 
                         className={`form-control `} 
                         name="position"
                         value={formData.position}
                         onChange={handleChange}
                         required 
                       >
                        <option value="">Select a position</option>
                        <option value="Team Leader">Team Leader</option>
                        <option value="Manager">Manager</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Report To
                      </label>
                      <select 
                         className={`form-control `} 
                         name="report_to"
                         value={formData.report_to}
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
                        Birth Date 
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={formData.birthdate ? new Date(formData.birthdate) : null}
                          onChange={(date) => handleDateChange(date, 'birthdate')}
                          className={`form-control datetimepicker ${formData.birthdate ? 'is-valid' : ''}`}
                          dateFormat="yyyy-MM-dd"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Joining Date 
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={formData.join_date ? new Date(formData.join_date) : null}
                          onChange={(date) => handleDateChange(date, 'join_date')}
                          className={`form-control datetimepicker ${formData.join_date ? 'is-valid' : ''}`}
                          dateFormat="yyyy-MM-dd"
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
export default Editemployee;
