// src/pages/Solutions.jsx
import React from "react";
import { FaHospital, FaClinicMedical, FaAmbulance, FaHome } from "react-icons/fa";
import "../styles/Solutions.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


const Solutions = () => {
  const solutions = [
    {
      icon: <FaHospital />,
      title: "Hospital System",
      description: "End-to-end management for large healthcare facilities"
    },
    {
      icon: <FaClinicMedical />,
      title: "Specialty Clinics",
      description: "Tailored solutions for specialized medical practices"
    },
    {
      icon: <FaAmbulance />,
      title: "Urgent Care",
      description: "Streamlined workflows for emergency care providers"
    },
    {
      icon: <FaHome />,
      title: "Telemedicine",
      description: "Integrated virtual care platform"
    }
  ];

  return (
    <div className="solutions-container">
      <section className="solutions-hero">
        <div className="solutions-hero-content">
          <h1>Tailored Healthcare Solutions</h1>
          <p>Custom implementations for different medical environments</p>
        </div>
      </section>

      <section className="solutions-grid-section">
        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <div className="solution-card" key={index}>
              <div className="solution-icon-container">{solution.icon}</div>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
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

export default Solutions;