import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import "../styles/Contact.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const Contact = () => {


  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>Our team is ready to assist you with any questions about ModernHope</p>
        </div>
      </section>

  
      <section className="contact-grid-section">
        <div className="contact-grid">
          
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h4>Headquarters</h4>
                <p>123 Healthcare Plaza, Suite 500<br />San Francisco, CA 94107</p>
              </div>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <h4>Phone</h4>
                <p>+1 (800) 555-HEAL<br />+1 (415) 123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h4>Email</h4>
                <p>support@modernhope.com<br />sales@modernhope.com</p>
              </div>
            </div>
            <div className="info-item">
              <FaClock className="info-icon" />
              <div>
                <h4>Support Hours</h4>
                <p>24/7 Emergency Support<br />Business Hours: 8AM-6PM PST</p>
              </div>
            </div>
          </div>

         
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Dr. Sarah Johnson" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="s.johnson@hospital.org" />
              </div>
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <input type="text" id="organization" placeholder="City General Hospital" />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject">
                  <option value="">Select a subject</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="demo">Request a Demo</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="support-section">
        <div className="support-content">
          <MdSupportAgent className="support-icon" />
          <h2>24/7 Emergency Support</h2>
          <p>For critical system issues, call our emergency support line at <strong>+1 (800) 555-EMER</strong></p>
          <button className="support-btn">
            Open Support Ticket
          </button>
        </div>
      </section>
      <button className="back-to-home-btn">
              <FaArrowLeft className="back-icon" />
              <NavLink to="/">Back to Home</NavLink>
            </button>
    </div>
  );
};



