import React from "react";
import { FaHospital, FaUserMd, FaChartLine, FaShieldAlt, FaHandHoldingHeart } from "react-icons/fa";
import { MdHealthAndSafety, MdGroups } from "react-icons/md";
import "../styles/LearnMore.css";

const LearnMore = () => {
  return (
    <div className="learn-more-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>The ModernHope Difference</h1>
          <p>Why leading healthcare providers choose our platform</p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-proposition">
        <div className="section-content">
          <div className="text-content">
            <h2>Beyond Just Software - A Healthcare Revolution</h2>
            <p>
              ModernHope isn't just another hospital management system. We're a comprehensive 
              clinical-operational platform that bridges the gap between patient care and 
              administrative efficiency. Our solution is built by healthcare professionals 
              for healthcare professionals.
            </p>
          </div>
          <div className="image-placeholder">
            <div className="placeholder-content">
              <FaHospital className="placeholder-icon" />
              <p>Hospital Workflow Visualization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="differentiators">
        <h2>What Sets Us Apart</h2>
        <div className="cards-container">
          <div className="differentiator-card">
            <MdHealthAndSafety className="card-icon" />
            <h3>Clinical-Operational Alignment</h3>
            <p>
              Unique bidirectional workflow integration that synchronizes clinical 
              processes with back-office operations in real-time.
            </p>
          </div>
          <div className="differentiator-card">
            <FaChartLine className="card-icon" />
            <h3>Predictive Intelligence</h3>
            <p>
              AI-powered forecasting for patient volume, resource allocation, 
              and revenue cycle management.
            </p>
          </div>
          <div className="differentiator-card">
            <MdGroups className="card-icon" />
            <h3>Interdisciplinary Collaboration</h3>
            <p>
              Seamless care team coordination across departments with secure 
              messaging and shared workspaces.
            </p>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="outcomes">
        <div className="section-content reversed">
          <div className="image-placeholder">
            <div className="placeholder-content">
              <FaHandHoldingHeart className="placeholder-icon" />
              <p>Patient Outcomes Dashboard</p>
            </div>
          </div>
          <div className="text-content">
            <h2>Measurable Results</h2>
            <ul className="results-list">
              <li>
                <strong>30-45%</strong> reduction in administrative time per patient
              </li>
              <li>
                <strong>25%</strong> improvement in billing accuracy
              </li>
              <li>
                <strong>40%</strong> faster lab result integration
              </li>
              <li>
                <strong>95%+</strong> patient satisfaction scores
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="technology">
        <h2>Built on Cutting-Edge Technology</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <div className="tech-icon security"></div>
            <h3>Bank-Grade Security</h3>
            <p>End-to-end encryption with HIPAA and GDPR compliance</p>
          </div>
          <div className="tech-item">
            <div className="tech-icon cloud"></div>
            <h3>Cloud-Native Architecture</h3>
            <p>99.99% uptime with automatic scaling</p>
          </div>
          <div className="tech-item">
            <div className="tech-icon api"></div>
            <h3>Open API Ecosystem</h3>
            <p>Integrates with 200+ healthcare applications</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience the Future of Healthcare Management?</h2>
          <div className="cta-buttons">
            <button className="cta-button primary">Schedule Consultation</button>
            <button className="cta-button secondary">Download Overview</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;