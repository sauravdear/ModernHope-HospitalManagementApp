import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import '../sec-styles/ManagerProfile.css';

const HospitalManagerProfile = () => {
    const { user } = useAuth();
    const [managerProfile, setManagerProfile] = useState({
        // Hospital Information
        hospitalDetails: {
            name: "ModernHope Super Specialty Hospital",
            registrationId: "HOSP-MH-2024-001",
            type: "Multi-Specialty Tertiary Care",
            accreditation: "NABH & NABL Accredited",
            established: "2015",
            bedStrength: 500,
            specialities: ["Cardiology", "Oncology", "Neurology", "Orthopedics"]
        },
        
        // Manager's Operational Role
        managementScope: {
            position: "Hospital Administrator",
            department: "Hospital Management",
            reportingTo: "Medical Director",
            employeeId: "HM-001",
            joiningDate: "2023-01-15",
            accessLevel: "Super Admin",
            systemPermissions: ["Full System Access", "Staff Management", "Financial Oversight"]
        },
        
        // Hospital Operations Data
        operationalMetrics: {
            totalStaff: 350,
            dailyPatientFlow: 600,
            bedOccupancyRate: "82%",
            otUtilization: "75%",
            averageStay: "4.2 days"
        },
        
        // Contact for Hospital Operations
        operationalContacts: {
            controlRoom: "+91-11-2678-9000",
            emergencyLine: "+91-11-2678-9100",
            adminOffice: "+91-11-2678-9200",
            email: "admin@modernhopehospital.com",
            emergencyPager: "PAGER-001"
        },
        
        // Current Hospital Status
        currentStatus: {
            availableBeds: 90,
            emergencyCases: 12,
            scheduledSurgeries: 25,
            criticalPatients: 8,
            staffOnDuty: 280
        }
    });

    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="hospital-manager-profile">
            {/* Hospital Identity Header */}
            <div className="hospital-header">
                <div className="hospital-branding">
                    <h1>🏥 {managerProfile.hospitalDetails.name}</h1>
                    <div className="hospital-badges">
                        <span className="badge accreditation">{managerProfile.hospitalDetails.accreditation}</span>
                        <span className="badge established">Est. {managerProfile.hospitalDetails.established}</span>
                    </div>
                </div>
                
                <div className="manager-identity">
                    <div className="manager-card">
                        <h3>Hospital Manager</h3>
                        <p className="manager-name">{user?.name || "Administrator"}</p>
                        <span className="manager-id">ID: {managerProfile.managementScope.employeeId}</span>
                    </div>
                </div>
            </div>

            {/* Hospital Overview Section */}
            <section className="hospital-overview">
                <h2>📊 Hospital Overview</h2>
                <div className="overview-grid">
                    <div className="overview-card">
                        <div className="card-icon">🛏️</div>
                        <h4>Bed Capacity</h4>
                        <p className="metric-large">{managerProfile.hospitalDetails.bedStrength}</p>
                        <span className="metric-sub">Total Beds</span>
                    </div>
                    
                    <div className="overview-card">
                        <div className="card-icon">👥</div>
                        <h4>Medical Staff</h4>
                        <p className="metric-large">{managerProfile.operationalMetrics.totalStaff}</p>
                        <span className="metric-sub">Healthcare Professionals</span>
                    </div>
                    
                    <div className="overview-card">
                        <div className="card-icon">🚶</div>
                        <h4>Daily Patients</h4>
                        <p className="metric-large">{managerProfile.operationalMetrics.dailyPatientFlow}</p>
                        <span className="metric-sub">Average Daily Flow</span>
                    </div>
                    
                    <div className="overview-card">
                        <div className="card-icon">📈</div>
                        <h4>Occupancy Rate</h4>
                        <p className="metric-large">{managerProfile.operationalMetrics.bedOccupancyRate}</p>
                        <span className="metric-sub">Current Utilization</span>
                    </div>
                </div>
            </section>

            {/* Current Hospital Status */}
            <section className="current-status">
                <h2>🔄 Real-time Hospital Status</h2>
                <div className="status-grid">
                    <div className="status-item available">
                        <span className="status-label">Available Beds</span>
                        <span className="status-value">{managerProfile.currentStatus.availableBeds}</span>
                    </div>
                    
                    <div className="status-item emergency">
                        <span className="status-label">Emergency Cases</span>
                        <span className="status-value">{managerProfile.currentStatus.emergencyCases}</span>
                    </div>
                    
                    <div className="status-item surgery">
                        <span className="status-label">Scheduled Surgeries</span>
                        <span className="status-value">{managerProfile.currentStatus.scheduledSurgeries}</span>
                    </div>
                    
                    <div className="status-item critical">
                        <span className="status-label">Critical Patients</span>
                        <span className="status-value">{managerProfile.currentStatus.criticalPatients}</span>
                    </div>
                    
                    <div className="status-item staff">
                        <span className="status-label">Staff on Duty</span>
                        <span className="status-value">{managerProfile.currentStatus.staffOnDuty}</span>
                    </div>
                </div>
            </section>

            {/* Management Authority Section */}
            <section className="management-authority">
                <h2>⚙️ Management Authority</h2>
                <div className="authority-grid">
                    <div className="authority-card">
                        <h4>Position & Department</h4>
                        <p><strong>Role:</strong> {managerProfile.managementScope.position}</p>
                        <p><strong>Department:</strong> {managerProfile.managementScope.department}</p>
                        <p><strong>Reports To:</strong> {managerProfile.managementScope.reportingTo}</p>
                    </div>
                    
                    <div className="authority-card">
                        <h4>System Access Level</h4>
                        <p><strong>Access:</strong> {managerProfile.managementScope.accessLevel}</p>
                        <div className="permissions-list">
                            {managerProfile.managementScope.systemPermissions.map((permission, index) => (
                                <span key={index} className="permission-tag">✓ {permission}</span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="authority-card">
                        <h4>Hospital Specialities</h4>
                        <div className="specialities-list">
                            {managerProfile.hospitalDetails.specialities.map((speciality, index) => (
                                <span key={index} className="speciality-tag">🏥 {speciality}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Operational Contacts */}
            <section className="operational-contacts">
                <h2>📞 Operational Contacts</h2>
                <div className="contacts-grid">
                    <div className="contact-item">
                        <span className="contact-type">Control Room</span>
                        <span className="contact-value">{managerProfile.operationalContacts.controlRoom}</span>
                    </div>
                    
                    <div className="contact-item emergency-contact">
                        <span className="contact-type">Emergency Line</span>
                        <span className="contact-value">{managerProfile.operationalContacts.emergencyLine}</span>
                    </div>
                    
                    <div className="contact-item">
                        <span className="contact-type">Admin Office</span>
                        <span className="contact-value">{managerProfile.operationalContacts.adminOffice}</span>
                    </div>
                    
                    <div className="contact-item">
                        <span className="contact-type">Email</span>
                        <span className="contact-value">{managerProfile.operationalContacts.email}</span>
                    </div>
                    
                    <div className="contact-item">
                        <span className="contact-type">Emergency Pager</span>
                        <span className="contact-value">{managerProfile.operationalContacts.emergencyPager}</span>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="quick-actions">
                <h2>🚀 Quick Management Actions</h2>
                <div className="action-buttons">
                    <button className="action-btn primary">Generate Daily Report</button>
                    <button className="action-btn secondary">Check Bed Availability</button>
                    <button className="action-btn secondary">Staff Roster</button>
                    <button className="action-btn primary">Emergency Protocol</button>
                </div>
            </section>
        </div>
    );
};

export default HospitalManagerProfile;