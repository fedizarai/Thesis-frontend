import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Addemployee = () => {

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
    console.log('formData:', formData);
    setIsTyping(true);
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
  
  // Basic form validation
  if (!formData.name || !formData.role || !formData.employee_id ||!formData.position ||!formData.report_to || !formData.email || !formData.birthdate || !formData.join_date) {
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
   try {
    // Make API call to add employee
    console.log('Form Data:', formData);
    const response = await fetch('http://localhost:3001/addEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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
      // Error adding employee
      alert('Failed to add employee. Please try again.');
    }
  } catch (error) {
    console.error('Error adding employee:', error);
    alert('An error occurred while adding employee. Please try again.');
  }

  // If validation passes, proceed with form submission
  console.log('Form submitted:', formData);
  // Here, you can make an API call to submit the form data or perform any other necessary actions

  setFormClosed(true);
};


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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block">
                      <label className="col-form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input 
                        className={`form-control ${isTyping && formData.name.trim() !== '' ? 'is-valid' : 'is-invalid'}`}
                        type="text"
                        name="name"
                        value={formData.name}
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
                        className={`form-control ${isTyping && formData.employee_id.trim() !== '' ? 'is-valid' : 'is-invalid'}`}
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
                        <option value="Team Leader">Team Leader</option>
                        <option value="Manager">Manager</option>
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
                         className={`form-control ${isTyping && formData.report_to.trim() !== '' ? 'is-valid' : 'is-invalid'}`} 
                         name="report_to"
                         value={formData.report_to}
                         onChange={handleChange}
                         required 
                       >
                        <option value="">Select an option</option>
                        {users.map(user => {
                          if (user.position === "Team Leader" || user.position === "Manager") {
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
                          selected={formData.birthdate}
                          onChange={(date) => handleChange({ target: { name: 'birthdate', value: date } })}
                          className={`form-control datetimepicker ${formData.birthdate ? 'is-valid' : ''}`}
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
                          selected={formData.join_date}
                          onChange={(date) => handleChange({ target: { name: 'join_date', value: date } })}
                          className={`form-control datetimepicker ${formData.join_date ? 'is-valid' : ''}`}
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
