// components/Appointment/AppointmentSystem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../sec-styles/AppointmentSystem.css';




const AppointmentSystem = () => {
  const [activeTab, setActiveTab] = useState('book');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    department: '',
    specialization: '',
    symptoms: '',
    notes: ''
  });

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/appointments/patient', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/users/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/appointments/create', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Appointment booked successfully!');
      setFormData({
        doctorId: '',
        appointmentDate: '',
        appointmentTime: '',
        department: '',
        specialization: '',
        symptoms: '',
        notes: ''
      });
      fetchAppointments();
      setActiveTab('my-appointments');
    } catch (error) {
      alert('Error booking appointment: ' + error.response.data.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`/api/appointments/${appointmentId}/status`, 
          { status: 'cancelled' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchAppointments();
      } catch (error) {
        alert('Error cancelling appointment');
      }
    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <h1>Appointment Management</h1>
        <p>Book, manage, and track your medical appointments</p>
      </div>

      <div className="appointment-tabs">
        <button 
          className={`appointment-tab ${activeTab === 'book' ? 'active' : ''}`}
          onClick={() => setActiveTab('book')}
        >
          Book Appointment
        </button>
        <button 
          className={`appointment-tab ${activeTab === 'my-appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-appointments')}
        >
          My Appointments
        </button>
        <button 
          className={`appointment-tab ${activeTab === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          Find Doctors
        </button>
      </div>

      {activeTab === 'book' && (
        <div className="appointment-card">
          <h2>Book New Appointment</h2>
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-group">
              <label>Select Department</label>
              <select 
                name="department" 
                value={formData.department}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Choose Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Oncology">Oncology</option>
              </select>
            </div>

            <div className="form-group">
              <label>Select Doctor</label>
              <select 
                name="doctorId" 
                value={formData.doctorId}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Choose Doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                className="form-control"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Appointment Time</label>
              <select 
                name="appointmentTime" 
                value={formData.appointmentTime}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select Time Slot</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Symptoms / Reason for Visit</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                className="form-control"
                rows="3"
                placeholder="Describe your symptoms or reason for appointment..."
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Additional Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="form-control"
                rows="2"
                placeholder="Any additional information..."
              />
            </div>

            <div className="form-group full-width">
              <button type="submit" className="btn-primary">
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'my-appointments' && (
        <div className="appointment-card">
          <h2>My Appointments</h2>
          <div className="appointment-list">
            {appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              appointments.map(appointment => (
                <div key={appointment._id} className="appointment-item">
                  <div className="appointment-info">
                    <h3>Appointment with Dr. {appointment.doctorName}</h3>
                    <div className="appointment-meta">
                      <span>Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                      <span>Time: {appointment.appointmentTime}</span>
                      <span>Department: {appointment.department}</span>
                      <span>Fee: ${appointment.consultationFee}</span>
                    </div>
                    <p><strong>Symptoms:</strong> {appointment.symptoms}</p>
                    {appointment.notes && <p><strong>Notes:</strong> {appointment.notes}</p>}
                  </div>
                  <div className="appointment-actions">
                    <span className={`appointment-status status-${appointment.status}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                    {appointment.status === 'scheduled' && (
                      <button 
                        onClick={() => cancelAppointment(appointment._id)}
                        className="btn-cancel"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'doctors' && (
        <div className="appointment-card">
          <h2>Available Doctors</h2>
          <div className="doctor-grid">
            {doctors.map(doctor => (
              <div key={doctor._id} className="doctor-card">
                <div className="doctor-avatar">
                  {doctor.name.charAt(0)}
                </div>
                <h3>Dr. {doctor.name}</h3>
                <div className="doctor-specialization">{doctor.specialization}</div>
                <div className="doctor-department">{doctor.department}</div>
                <div className="doctor-experience">{doctor.experience} years experience</div>
                <div className="availability-badge">Available</div>
                <div className="consultation-fee">${doctor.consultationFee} consultation</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentSystem;