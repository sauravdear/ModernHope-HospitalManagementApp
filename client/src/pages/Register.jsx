import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHospital,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaShieldAlt,
  FaStethoscope,
  FaUserMd,
  FaUserInjured,
  FaGraduationCap,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaVenusMars,
  FaTint,
  FaMapMarkerAlt
} from "react-icons/fa";
import { MdBusiness, MdHealthAndSafety } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "../styles/Register.css";
import { FaArrowLeft } from "react-icons/fa";

export const Register = () => {
  const [formData, setFormData] = useState({
    // Basic fields
    username: "",
    email: "",
    phone: "",
    facility: "",
    facilityType: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    termsAccepted: false,
    
    // Doctor specific fields
    specialization: "",
    department: "",
    experience: "",
    consultationFee: "",
    qualifications: [""],
    
    // Patient specific fields
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    }
  });

  const [currentQualification, setCurrentQualification] = useState("");

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData(prev => ({
      ...prev,
      role: role,
      // Reset role-specific fields when changing roles
      ...(role === "patient" && {
        specialization: "",
        department: "",
        experience: "",
        consultationFee: "",
        qualifications: [""]
      }),
      ...(role === "doctor" && {
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        address: { street: "", city: "", state: "", zipCode: "" }
      })
    }));
  };

  const addQualification = () => {
    if (currentQualification.trim()) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, currentQualification.trim()]
      }));
      setCurrentQualification("");
    }
  };

  const removeQualification = (index) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    // Prepare data for API
    const submitData = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      facility: formData.facility,
      facilityType: formData.facilityType,
      password: formData.password,
      role: formData.role
    };

    // Add role-specific fields
    if (formData.role === "doctor") {
      submitData.specialization = formData.specialization;
      submitData.department = formData.department;
      submitData.experience = parseInt(formData.experience) || 0;
      submitData.consultationFee = parseInt(formData.consultationFee) || 50;
      submitData.qualifications = formData.qualifications.filter(q => q.trim() !== "");
    }

    if (formData.role === "patient") {
      if (formData.dateOfBirth) submitData.dateOfBirth = formData.dateOfBirth;
      if (formData.gender) submitData.gender = formData.gender;
      if (formData.bloodGroup) submitData.bloodGroup = formData.bloodGroup;
      if (Object.values(formData.address).some(val => val.trim() !== "")) {
        submitData.address = formData.address;
      }
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.log("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <FaHospital className="hospital-icon" />
          <h1>Create Your Account</h1>
          <p>Get started with ModernHope's healthcare platform</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="input-group">
            <label htmlFor="role">
              <FaUser className="input-icon" />
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="username">
                  <FaUser className="input-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInput}
                  placeholder={formData.role === "doctor" ? "Dr. John Smith" : "John Smith"}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">
                <FaEnvelope className="input-icon" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInput}
                placeholder="john.doe@hospital.org"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">
                <FaPhone className="input-icon" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInput}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="facility">
                <MdBusiness className="input-icon" />
                Facility Name
              </label>
              <input
                type="text"
                id="facility"
                name="facility"
                value={formData.facility}
                onChange={handleInput}
                placeholder="City General Hospital"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="facilityType">
                <MdHealthAndSafety className="input-icon" />
                Facility Type
              </label>
              <select
                id="facilityType"
                name="facilityType"
                value={formData.facilityType}
                onChange={handleInput}
                required
              >
                <option value="">Select facility type</option>
                <option value="clinic">Private Clinic</option>
                <option value="hospital">General Hospital</option>
                <option value="specialty">Specialty Center</option>
                <option value="system">Hospital System</option>
              </select>
            </div>
          </div>

          {/* Doctor Specific Fields */}
          {formData.role === "doctor" && (
            <div className="form-section">
              <h3>
                <FaUserMd className="section-icon" />
                Professional Information
              </h3>
              
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="specialization">
                    <FaStethoscope className="input-icon" />
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInput}
                    placeholder="Cardiology"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="department">
                    <FaHospital className="input-icon" />
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInput}
                    placeholder="Heart Center"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="experience">
                    <FaCalendarAlt className="input-icon" />
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInput}
                    placeholder="5"
                    min="0"
                    max="60"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="consultationFee">
                    <FaMoneyBillWave className="input-icon" />
                    Consultation Fee ($)
                  </label>
                  <input
                    type="number"
                    id="consultationFee"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleInput}
                    placeholder="50"
                    min="0"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>
                  <FaGraduationCap className="input-icon" />
                  Qualifications
                </label>
                <div className="qualifications-input">
                  <input
                    type="text"
                    value={currentQualification}
                    onChange={(e) => setCurrentQualification(e.target.value)}
                    placeholder="Add qualification (e.g., MD, MBBS)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQualification())}
                  />
                  <button type="button" onClick={addQualification} className="add-qualification-btn">
                    Add
                  </button>
                </div>
                <div className="qualifications-list">
                  {formData.qualifications.filter(q => q.trim() !== "").map((qual, index) => (
                    <div key={index} className="qualification-tag">
                      {qual}
                      <button type="button" onClick={() => removeQualification(index)}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Patient Specific Fields */}
          {formData.role === "patient" && (
            <div className="form-section">
              <h3>
                <FaUserInjured className="section-icon" />
                Medical Information
              </h3>
              
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="dateOfBirth">
                    <FaCalendarAlt className="input-icon" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInput}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="gender">
                    <FaVenusMars className="input-icon" />
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInput}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="bloodGroup">
                  <FaTint className="input-icon" />
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInput}
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

              <div className="input-group">
                <label>
                  <FaMapMarkerAlt className="input-icon" />
                  Address
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInput}
                  placeholder="Street Address"
                />
                <div className="form-row">
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInput}
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInput}
                    placeholder="State"
                  />
                </div>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleInput}
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          )}

          {/* Password Fields */}
          <div className="form-section">
            <h3>Security</h3>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="password">
                  <FaLock className="input-icon" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                  placeholder="Create password"
                  required
                  minLength="8"
                />
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">
                  <FaLock className="input-icon" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInput}
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
          </div>

          <div className="terms-agreement">
            <input
              type="checkbox"
              id="terms"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInput}
              required
            />
            <label htmlFor="terms">
              I agree to ModernHope's{" "}
              <NavLink to="/terms">Terms of Service</NavLink> and{" "}
              <NavLink to="/privacy">Privacy Policy</NavLink>, including HIPAA
              compliance terms
            </label>
          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>

          <div className="login-redirect">
            Already have an account? <NavLink to="/login">Log in</NavLink>
          </div>
        </form>

        <div className="security-assurance">
          <FaShieldAlt className="shield-icon" />
          <span>Enterprise-grade security & HIPAA compliance</span>
        </div>
      </div>
      <button className="back-to-home-btn">
        <FaArrowLeft className="back-icon" />
        <NavLink to="/">Back to Home</NavLink>
      </button>
    </div>
  );
};