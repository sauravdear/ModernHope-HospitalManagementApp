// src/pages/Home.jsx

import Navbar from "../components/Navbar";
import "../styles/Home.css";
import { FaHospital, FaUserMd, FaCalendarAlt, FaChartLine, FaShieldAlt, FaMobileAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home-wrapper">
      <Navbar />

      <header className="hero-section">
        <div className="hero-text">
          <h1>ModernHope Hospital Management</h1>
          <p className="hero-subtitle">Transforming healthcare delivery through innovative technology solutions</p>
          <div className="hero-buttons">
            <button className="cta-button primary"><NavLink to='/register'>Sign up</NavLink></button>
            <button className="cta-button secondary"><NavLink to='/learnmore'>Learn More</NavLink></button>
          </div>
        </div>
        <div className="hero-image">
          <div className="dashboard-preview">
            <div className="dashboard-header">
              <span className="red-dot"></span>
              <span className="yellow-dot"></span>
              <span className="green-dot"></span>
              <span className="dashboard-title">ModernHope Dashboard</span>
            </div>
            <div className="dashboard-content">
              <div className="metric-card">Patient Stats</div>
              <div className="metric-card">Appointments</div>
              <div className="metric-card">Revenue</div>
              <div className="metric-card">Staff</div>
            </div>
          </div>
        </div>
      </header>

      <section className="trust-badges">
        <div className="container">
          <p>Trusted by leading healthcare providers nationwide</p>
          <div className="badges">
            <span>Mayo Clinic</span>
            <span>Johns Hopkins</span>
            <span>Cleveland Clinic</span>
            <span>Mass General</span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Comprehensive Healthcare Solutions</h2>
          <p className="section-subtitle">Streamline operations, enhance patient care, and improve outcomes</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><FaHospital /></div>
            <h3><NavLink to='/patient-management'>Patient Management</NavLink></h3>
            <p>Efficiently manage patient records, history, and treatment plans in one centralized system.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaUserMd /></div>
             <h3><NavLink to='/staff-schedule'>Staff Scheduling</NavLink></h3>
            
            <p>Optimize workforce management with intelligent scheduling and shift planning tools.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaCalendarAlt /></div>
            {/* <h3>Appointment System</h3> */}
            <h3><NavLink to='/appointments'>Appointment System</NavLink></h3>
            <p>Reduce no-shows with automated reminders and easy online booking for patients.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaChartLine /></div>
            <h3>Analytics Dashboard</h3>
            <p>Gain actionable insights with real-time reporting and performance metrics.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaShieldAlt /></div>
            <h3>HIPAA Compliance</h3>
            <p>Enterprise-grade security and compliance to protect sensitive patient data.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaMobileAlt /></div>
            <h3>Mobile Access</h3>
            <p>Access critical systems anytime, anywhere with our secure mobile platform.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-header">
          <h2>Trusted by Healthcare Professionals</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              "ModernHope reduced our administrative workload by 40% while improving patient satisfaction scores."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <p className="author-name">Dr. Sarah Johnson</p>
                <p className="author-title">Chief Medical Officer, Boston General</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              "Implementation was seamless and the support team was exceptional. Our billing accuracy improved dramatically."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <p className="author-name">Michael Chen</p>
                <p className="author-title">Hospital Administrator, Pacific Health</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <div className="cta-content">
          <h2>Ready to Transform Your Healthcare Facility?</h2>
          <p>Schedule a personalized demo to see ModernHope in action</p>
          <div className="cta-buttons">
            <button className="cta-button primary">Book a Demo</button>
            <button className="cta-button outline">Contact Sales</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <FaHospital className="logo-icon" />
            <span>ModernHope</span>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="/">Features</a>
              <a href="/">Pricing</a>
              <a href="/">Demo</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="/">About Us</a>
              <a href="/">Careers</a>
              <a href="/">Contact</a>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <a href="/">Blog</a>
              <a href="/">Help Center</a>
              <a href="/">Webinars</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="/">Privacy</a>
              <a href="/">Terms</a>
              <a href="/">Compliance</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ModernHope Technologies. All rights reserved.</p>
          <div className="social-links">
            <a href="/">LinkedIn</a>
            <a href="/">Twitter</a>
            <a href="/">Facebook</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

