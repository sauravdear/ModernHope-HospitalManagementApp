// src/pages/Features.jsx
import React from "react";
import { FaUserInjured, FaProcedures, FaFileMedicalAlt, FaPills, FaClinicMedical, FaMobileAlt } from "react-icons/fa";
import { MdHealthAndSafety, MdMedicalServices } from "react-icons/md";
import "../styles/Features.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaUserInjured />,
      title: "Patient Management",
      description: "Complete digital patient records with medical history tracking"
    },
    {
      icon: <FaProcedures />,
      title: "Appointment System",
      description: "Automated scheduling with SMS/email reminders"
    },
    {
      icon: <FaPills />,
      title: "Pharmacy Module",
      description: "Integrated e-prescriptions and medication tracking"
    },
    {
      icon: <MdMedicalServices />,
      title: "Lab Integration",
      description: "Seamless connection with diagnostic laboratories"
    },
    {
      icon: <MdHealthAndSafety />,
      title: "Billing System",
      description: "Automated insurance claims and payment processing"
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Access",
      description: "Full functionality on iOS and Android devices"
    }
  ];

  return (
    <div className="features-container">
      <section className="features-hero">
        <div className="features-hero-content">
          <h1>Advanced Healthcare Features</h1>
          <p>Specialized modules designed for modern medical facilities</p>
        </div>
      </section>

      <section className="features-grid-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon-container">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <button className="back-to-home-btn">
              <FaArrowLeft className="back-icon" />
              <NavLink to="/">Back to Home</NavLink>
            </button>
    </div>
  );
};

export default Features;