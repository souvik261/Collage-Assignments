import React, { useState } from 'react';
import './App.css';

const initialEmployees = [
  {
    id: 'EMP001',
    name: 'Ramesh Patel',
    department: 'Crop Production',
    gender: 'Male',
    phone: '9876543210',
    localAddress: 'Field Quarters A-12, Green Valley Farm',
    permanentAddress: 'Village Navapur, District Surat, Gujarat'
  },
  {
    id: 'EMP002',
    name: 'Anita Sharma',
    department: 'Dairy Management',
    gender: 'Female',
    phone: '9123456780',
    localAddress: 'Staff Hostel Room 4, Green Valley Farm',
    permanentAddress: 'Civil Lines, Karnal, Haryana'
  },
  {
    id: 'EMP003',
    name: 'Vikram Singh',
    department: 'Equipment Maintenance',
    gender: 'Male',
    phone: '9988776655',
    localAddress: 'Workshop Unit 2, Green Valley Farm',
    permanentAddress: 'Tehsil Kotputli, Jaipur, Rajasthan'
  }
];

const departments = [
  'All',
  'Crop Production',
  'Dairy Management',
  'Horticulture',
  'Equipment Maintenance',
  'Logistics & Supply'
];

const initialFormState = {
  id: '',
  name: '',
  department: 'Crop Production',
  gender: 'Male',
  phone: '',
  localAddress: '',
  permanentAddress: ''
};

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === formData.id ? formData : emp))
      );
      setIsEditing(false);
    } else {
      const exists = employees.some((emp) => emp.id.trim() === formData.id.trim());
      if (exists) {
        alert('Employee ID already exists. Please use a unique ID.');
        return;
      }
      setEmployees((prev) => [...prev, formData]);
    }

    setFormData(initialFormState);
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      if (isEditing && formData.id === id) {
        setIsEditing(false);
        setFormData(initialFormState);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(initialFormState);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.phone.includes(searchQuery);

    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="container">
      <header className="header">
        <h1>Farm Employee Directory</h1>
        <p>Manage on-field staff, machinery operators, and management records</p>
      </header>

      {/* Metric Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Total Employees</span>
          <span className="stat-value">{employees.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Filtered Results</span>
          <span className="stat-value">{filteredEmployees.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Filter</span>
          <span className="stat-value">{selectedDept}</span>
        </div>
      </div>

      {/* Form Component */}
      <div className="card form-card">
        <h2>{isEditing ? 'Edit Employee Details' : 'Add New Employee'}</h2>
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="id"
                required
                value={formData.id}
                onChange={handleInputChange}
                disabled={isEditing}
                placeholder="e.g., EMP104"
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Rajesh Kumar"
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              >
                {departments
                  .filter((dept) => dept !== 'All')
                  .map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit number"
              />
            </div>

            <div className="form-group">
              <label>Local Address</label>
              <input
                type="text"
                name="localAddress"
                required
                value={formData.localAddress}
                onChange={handleInputChange}
                placeholder="Farm quarters or local residence"
              />
            </div>

            <div className="form-group full-width">
              <label>Permanent Address</label>
              <input
                type="text"
                name="permanentAddress"
                required
                value={formData.permanentAddress}
                onChange={handleInputChange}
                placeholder="Hometown address"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Employee' : 'Add Employee'}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Filter and Search Controls */}
      <div className="controls-row">
        <input
          type="text"
          className="search-input"
          placeholder="Search by ID, Name, or Phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="filter-group">
          <label htmlFor="deptFilter">Filter Department:</label>
          <select
            id="deptFilter"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="filter-select"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="card table-card">
        {filteredEmployees.length === 0 ? (
          <p className="empty-message">No matching employees found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Emp ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Local Address</th>
                  <th>Permanent Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td><strong>{emp.id}</strong></td>
                    <td>{emp.name}</td>
                    <td><span className="dept-tag">{emp.department}</span></td>
                    <td>{emp.gender}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.localAddress}</td>
                    <td>{emp.permanentAddress}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action edit"
                          onClick={() => handleEdit(emp)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-action delete"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
