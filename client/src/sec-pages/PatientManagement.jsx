import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; 
import "../sec-styles/PatientManagement.css";
import { FaUserInjured, FaNotesMedical, FaPills, FaCalendarCheck, FaSearch, FaPlus, FaTimes,FaShieldAlt } from "react-icons/fa";

export const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    dob: "",
    gender: "Male",
    contact: "",
    address: "",
    insurance: "",
    allergies: "",
    bloodType: "A+",
    medications: [],
    history: []
  });

  useEffect(() => {
    // Mock data fetch
    const mockPatients = [
      {
        id: "P1001",
        name: "John Smith",
        dob: "1985-04-23",
        gender: "Male",
        contact: "john.smith@email.com | (555) 123-4567",
        address: "123 Main St, Boston, MA",
        insurance: "Aetna - 123456789",
        allergies: "Penicillin, Peanuts",
        bloodType: "A+",
        lastVisit: "2023-10-15",
        medications: [
          { name: "Lisinopril", dosage: "10mg", frequency: "Daily", prescribed: "2023-09-10", doctor: "Dr. Sarah Johnson" },
          { name: "Metformin", dosage: "500mg", frequency: "Twice daily", prescribed: "2023-08-15", doctor: "Dr. Sarah Johnson" }
        ],
        history: [
          { date: "2023-10-15", doctor: "Dr. Sarah Johnson", diagnosis: "Hypertension follow-up", treatment: "Medication adjustment" },
          { date: "2023-08-15", doctor: "Dr. Sarah Johnson", diagnosis: "Type 2 Diabetes", treatment: "Prescribed Metformin" }
        ]
      },
    ];
    setPatients(mockPatients);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setIsEditing(false);
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing && selectedPatient) {
      setSelectedPatient({
        ...selectedPatient,
        [name]: value
      });
    } else {
      setNewPatient({
        ...newPatient,
        [name]: value
      });
    }
  };

  const handleAddPatient = () => {
    setShowAddForm(true);
    setSelectedPatient(null);
    setIsEditing(false);
  };

  const handleSaveNewPatient = () => {
    const patientToAdd = { 
      ...newPatient, 
      id: `P${1000 + patients.length + 1}`,
      lastVisit: new Date().toISOString().split('T')[0]
    };
    setPatients([...patients, patientToAdd]);
    setSelectedPatient(patientToAdd);
    setShowAddForm(false);
    setNewPatient({
      name: "",
      dob: "",
      gender: "Male",
      contact: "",
      address: "",
      insurance: "",
      allergies: "",
      bloodType: "A+",
      medications: [],
      history: []
    });
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewPatient({
      name: "",
      dob: "",
      gender: "Male",
      contact: "",
      address: "",
      insurance: "",
      allergies: "",
      bloodType: "A+",
      medications: [],
      history: []
    });
  };

  return (
    <div className="patient-management-wrapper">
      <Navbar />

      <main className="patient-management-container">
        <div className="patient-search-section">
          <h2><FaUserInjured /> Patient Management</h2>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or patient ID..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="add-patient-button" onClick={handleAddPatient}>
              <FaPlus /> Add New Patient
            </button>
          </div>

          <div className="patient-list">
            {filteredPatients.map(patient => (
              <div 
                key={patient.id} 
                className={`patient-card ${selectedPatient?.id === patient.id ? 'active' : ''}`}
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="patient-id">{patient.id}</div>
                <div className="patient-name">{patient.name}</div>
                <div className="patient-info">
                  <span>DOB: {patient.dob}</span>
                  <span>Last Visit: {patient.lastVisit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="patient-detail-section">
          {showAddForm ? (
            <div className="add-patient-form">
              <div className="form-header">
                <h3>Add New Patient</h3>
                <button className="cancel-button" onClick={handleCancelAdd}>
                  <FaTimes />
                </button>
              </div>
              
              <div className="patient-info-grid">
                <div className="info-section">
                  <h4><FaUserInjured /> Basic Information</h4>
                  <div className="info-fields">
                    <div className="info-field">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newPatient.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="info-field">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={newPatient.dob}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="info-field">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={newPatient.gender}
                        onChange={handleInputChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="info-field">
                      <label>Contact</label>
                      <input
                        type="text"
                        name="contact"
                        value={newPatient.contact}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="info-field">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={newPatient.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h4><FaShieldAlt /> Medical Information</h4>
                  <div className="info-fields">
                    <div className="info-field">
                      <label>Insurance</label>
                      <input
                        type="text"
                        name="insurance"
                        value={newPatient.insurance}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="info-field">
                      <label>Allergies</label>
                      <input
                        type="text"
                        name="allergies"
                        value={newPatient.allergies}
                        onChange={handleInputChange}
                        placeholder="None"
                      />
                    </div>
                    <div className="info-field">
                      <label>Blood Type</label>
                      <select
                        name="bloodType"
                        value={newPatient.bloodType}
                        onChange={handleInputChange}
                      >
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
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button className="cancel-button" onClick={handleCancelAdd}>
                  Cancel
                </button>
                <button className="save-button" onClick={handleSaveNewPatient}>
                  Save Patient
                </button>
              </div>
            </div>
          ) : selectedPatient ? (
            <div className="patient-detail-container">
              {/* ... (keep the existing selected patient view) ... */}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><FaUserInjured /></div>
              <h3>No Patient Selected</h3>
              <p>Select a patient from the list or add a new patient to view and manage their records.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};