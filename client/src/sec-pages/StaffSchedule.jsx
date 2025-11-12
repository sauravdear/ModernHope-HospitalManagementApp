import React, { useState, useEffect } from 'react';
import { FaCalendar, FaUserMd, FaClock, FaPlus, FaEdit, FaTrash, FaHospital } from 'react-icons/fa';
import '../sec-styles/StaffSchedule.css';

const StaffSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [formData, setFormData] = useState({
    staffName: '',
    staffRole: 'Doctor',
    shiftDate: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    department: 'OPD',
    notes: ''
  });

  const staffRoles = ['Doctor', 'Nurse', 'Receptionist', 'Technician', 'Therapist'];
  const departments = ['Emergency', 'OPD', 'ICU', 'Radiology', 'Pharmacy', 'Laboratory'];

  // Fetch schedules
  const fetchSchedules = async (date = selectedDate) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/staff-schedule?date=${date}`);
      const result = await response.json();
      if (result.success) {
        setSchedules(result.data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/staff-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setShowForm(false);
        setFormData({
          staffName: '',
          staffRole: 'Doctor',
          shiftDate: new Date().toISOString().split('T')[0],
          startTime: '09:00',
          endTime: '17:00',
          department: 'OPD',
          notes: ''
        });
        fetchSchedules();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
      alert('Error creating schedule');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/staff-schedule/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        fetchSchedules();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Error deleting schedule');
    }
  };

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <div className="pricing-hero">
        <div className="hero-content">
          <h1>Staff Scheduling</h1>
          <p>Manage your healthcare staff schedules efficiently</p>
        </div>
      </div>

      <div className="pricing-container">
        {/* Controls */}
        <div className="schedule-controls">
          <div className="date-filter">
            <label>
              <FaCalendar className="icon" />
              Select Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <button 
            className="add-schedule-btn"
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Add Schedule
          </button>
        </div>

        {/* Schedule Form Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add Staff Schedule</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Staff Name</label>
                    <input
                      type="text"
                      value={formData.staffName}
                      onChange={(e) => setFormData({...formData, staffName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      value={formData.staffRole}
                      onChange={(e) => setFormData({...formData, staffRole: e.target.value})}
                    >
                      {staffRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Shift Date</label>
                    <input
                      type="date"
                      value={formData.shiftDate}
                      onChange={(e) => setFormData({...formData, shiftDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="3"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Schedule'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Schedules List */}
        <div className="schedules-grid">
          {loading ? (
            <div className="loading">Loading schedules...</div>
          ) : schedules.length === 0 ? (
            <div className="no-schedules">
              <FaHospital size={48} />
              <p>No schedules found for selected date</p>
            </div>
          ) : (
            schedules.map((schedule) => (
              <div key={schedule._id} className="schedule-card">
                <div className="schedule-header">
                  <h4>{schedule.staffName}</h4>
                  <span className={`role-badge ${schedule.staffRole.toLowerCase()}`}>
                    {schedule.staffRole}
                  </span>
                </div>
                
                <div className="schedule-details">
                  <div className="detail-item">
                    <FaCalendar className="icon" />
                    <span>{new Date(schedule.shiftDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <FaClock className="icon" />
                    <span>{schedule.startTime} - {schedule.endTime}</span>
                  </div>
                  <div className="detail-item">
                    <FaHospital className="icon" />
                    <span>{schedule.department}</span>
                  </div>
                </div>

                {schedule.notes && (
                  <div className="schedule-notes">
                    <p>{schedule.notes}</p>
                  </div>
                )}

                <div className="schedule-actions">
                  <button className="edit-btn">
                    <FaEdit /> Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(schedule._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffSchedule;