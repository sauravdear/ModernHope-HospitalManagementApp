import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../sec-styles/Profile.css';
import { FaUser, FaShieldAlt, FaStethoscope, FaNotesMedical, FaEdit, FaHospital, FaBuilding } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    facility: '',
    facilityType: '',
    role: '',
    specialization: '',
    department: '',
    experience: '',
    consultationFee: '',
    qualifications: [],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.user) {
        setUser(response.data.user);
        setFormData(response.data.user);
      } else {
        setError('No user data received');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedInputChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');
    
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value
      }
    }));
  };

  const handleArrayInputChange = (e, index) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.map((qual, i) => 
        i === index ? value : qual
      )
    }));
  };

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, '']
    }));
  };

  const removeQualification = (index) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const handleAvailabilityChange = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: !prev.availability[day]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.user) {
        setUser(response.data.user);
        setIsEditing(false);
        setMessage('Profile updated successfully');
        setError('');
        
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData(user);
    }
    setIsEditing(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="profile-wrapper">
        <div className="profile-container">
          <div className="loading">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-wrapper">
        <div className="profile-container">
          <div className="empty-state">
            <div className="empty-icon"><FaUser /></div>
            <h3>No Profile Data</h3>
            <p>Unable to load profile information. Please try again.</p>
            <button 
              className="save-button" 
              onClick={fetchUserProfile}
              style={{ marginTop: '15px' }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <h1><FaUser /> My Profile</h1>
          {!isEditing && (
            <button 
              className="edit-profile-button"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        {message && <div className="message success">{message}</div>}
        {error && <div className="message error">{error}</div>}

        <div className="profile-content">
          <form className="profile-form" onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="form-section">
              <h3><FaUser /> Basic Information</h3>
              
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Facility Information */}
            <div className="form-section">
              <h3><FaBuilding /> Facility Information</h3>
              
              <div className="form-group">
                <label>Facility Name</label>
                <input
                  type="text"
                  name="facility"
                  value={formData.facility || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Facility Type</label>
                <input
                  type="text"
                  name="facilityType"
                  value={formData.facilityType || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="form-section">
              <h3><FaUser /> Address Information</h3>
              
              <div className="form-group">
                <label>Street</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address?.street || ''}
                  onChange={handleNestedInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address?.city || ''}
                    onChange={handleNestedInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address?.state || ''}
                    onChange={handleNestedInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address?.zipCode || ''}
                  onChange={handleNestedInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Doctor Specific Fields */}
            {user.role === 'doctor' && (
              <div className="form-section">
                <h3><FaStethoscope /> Professional Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label>Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Experience (Years)</label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label>Consultation Fee ($)</label>
                    <input
                      type="number"
                      name="consultationFee"
                      value={formData.consultationFee || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Qualifications */}
                <div className="form-group">
                  <label>Qualifications</label>
                  {formData.qualifications?.map((qual, index) => (
                    <div key={index} className="qualification-item">
                      <input
                        type="text"
                        value={qual}
                        onChange={(e) => handleArrayInputChange(e, index)}
                        disabled={!isEditing}
                        placeholder="Enter qualification"
                      />
                      {isEditing && (
                        <button 
                          type="button" 
                          className="remove-qualification"
                          onClick={() => removeQualification(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      type="button" 
                      className="add-qualification"
                      onClick={addQualification}
                    >
                      Add Qualification
                    </button>
                  )}
                </div>

                {/* Availability */}
                {isEditing && (
                  <div className="form-group">
                    <label>Availability</label>
                    <div className="availability-grid">
                      {Object.entries(formData.availability || {}).map(([day, available]) => (
                        <label key={day} className="availability-day">
                          <input
                            type="checkbox"
                            checked={available}
                            onChange={() => handleAvailabilityChange(day)}
                          />
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Patient Specific Fields */}
            {user.role === 'patient' && (
              <div className="form-section">
                <h3><FaShieldAlt /> Medical Information</h3>
                
                <div className="form-group">
                  <label>Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="form-section">
                  <h4>Emergency Contact</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="emergencyContact.name"
                        value={formData.emergencyContact?.name || ''}
                        onChange={handleNestedInputChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        name="emergencyContact.phone"
                        value={formData.emergencyContact?.phone || ''}
                        onChange={handleNestedInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Relationship</label>
                    <input
                      type="text"
                      name="emergencyContact.relationship"
                      value={formData.emergencyContact?.relationship || ''}
                      onChange={handleNestedInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Save Changes
                </button>
              </div>
            )}
          </form>

          {!isEditing && (
            <div className="profile-summary">
              <div className="summary-card">
                <div className="avatar">
                  {user.username?.charAt(0) || 'U'}
                </div>
                <h2>{user.username || 'User'}</h2>
                <p className="role">{user.role || 'User'}</p>
                {user.specialization && (
                  <p className="specialization">{user.specialization}</p>
                )}
                {user.department && (
                  <p className="department">{user.department}</p>
                )}
                <div className="contact-info">
                  <p>📧 {user.email || 'No email'}</p>
                  {user.phone && <p>📞 {user.phone}</p>}
                  {user.facility && <p>🏥 {user.facility}</p>}
                  {user.address?.city && <p>📍 {user.address.city}, {user.address.state}</p>}
                </div>
                
                {user.role === 'patient' && user.bloodGroup && (
                  <div className="medical-highlight">
                    <h5>Medical Info</h5>
                    <p>Blood Group: {user.bloodGroup}</p>
                    {user.emergencyContact?.name && (
                      <p>Emergency: {user.emergencyContact.name} ({user.emergencyContact.relationship})</p>
                    )}
                  </div>
                )}

                {user.role === 'doctor' && user.experience && (
                  <div className="medical-highlight">
                    <h5>Professional Info</h5>
                    <p>Experience: {user.experience} years</p>
                    {user.consultationFee && (
                      <p>Fee: ${user.consultationFee}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;