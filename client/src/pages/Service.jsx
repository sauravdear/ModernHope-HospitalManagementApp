
import { FaLaptopMedical, FaMobileAlt, FaCloud, FaChartLine, FaShieldAlt, FaUsers } from "react-icons/fa";
import "../styles/Service.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const Service = () => {
  const services = [
    {
      icon: <FaLaptopMedical />,
      title: "Hospital Management",
      description: "Complete inpatient and outpatient management solutions"
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Applications",
      description: "Provider and patient apps for iOS and Android"
    },
    {
      icon: <FaCloud />,
      title: "Cloud Hosting",
      description: "Secure HIPAA-compliant cloud infrastructure"
    },
    {
      icon: <FaChartLine />,
      title: "Analytics",
      description: "Advanced reporting and predictive analytics"
    },
    {
      icon: <FaShieldAlt />,
      title: "Security",
      description: "End-to-end encryption and compliance management"
    },
    {
      icon: <FaUsers />,
      title: "Training",
      description: "Comprehensive staff training programs"
    }
  ];

  return (
    <div className="services-container">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1>Comprehensive Healthcare Services</h1>
          <p>End-to-end solutions tailored to your organization's needs</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation Section */}
      <section className="implementation-section">
        <div className="implementation-content">
          <h2>Our Implementation Process</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Discovery</h4>
              <p>Needs assessment and workflow analysis</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Planning</h4>
              <p>Custom implementation roadmap</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Training</h4>
              <p>Comprehensive staff education</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h4>Go-Live</h4>
              <p>Seamless transition with full support</p>
            </div>
          </div>
        </div>
      </section>
      <button className="back-to-home-btn">
              <FaArrowLeft className="back-icon" />
              <NavLink to="/">Back to Home</NavLink>
            </button>
    </div>
  );
};
