
import { FaHospital, FaUserMd, FaHandHoldingHeart, FaShieldAlt } from "react-icons/fa";
import { MdHealthAndSafety, MdPeople } from "react-icons/md";
import "../styles/About.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
export const About = () => {
  const stats = [
    { value: "250+", label: "Healthcare Partners" },
    { value: "1M+", label: "Patients Served" },
    { value: "99.9%", label: "System Uptime" },
    { value: "24/7", label: "Support Available" }
  ];

  const values = [
    {
      icon: <MdHealthAndSafety />,
      title: "Patient-Centered",
      description: "We prioritize patient outcomes above all else"
    },
    {
      icon: <FaShieldAlt />,
      title: "Security First",
      description: "Military-grade protection for sensitive health data"
    },
    {
      icon: <MdPeople />,
      title: "Collaborative",
      description: "We work hand-in-hand with healthcare teams"
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Our Mission: Transforming Healthcare</h1>
          <p>ModernHope was founded by clinicians and technologists to revolutionize hospital management</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="story-content">
          <h2>Our Journey</h2>
          <p>Founded in 2015 by Dr. Sarah Chen and tech entrepreneur Michael Rodriguez, ModernHope began as a solution to the administrative burdens plaguing healthcare providers. What started as a small clinic management tool has grown into the most trusted hospital management platform in the industry.</p>
          <div className="story-highlights">
            <div className="highlight">
              <FaHospital className="highlight-icon" />
              <p>First hospital implementation in 2017</p>
            </div>
            <div className="highlight">
              <FaUserMd className="highlight-icon" />
              <p>200+ clinical advisors</p>
            </div>
            <div className="highlight">
              <FaHandHoldingHeart className="highlight-icon" />
              <p>Recognized for patient safety innovation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div className="value-card" key={index}>
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
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

