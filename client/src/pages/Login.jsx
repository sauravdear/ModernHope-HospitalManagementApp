import { useState } from "react";
import { FaHospital, FaUserShield, FaLock, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthContext';
import { NavLink} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to fetch user details by ID
  const fetchUserDetails = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/user/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        return userData;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Form Data:", formData);
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Login Successful - Response:", data);
        
        // Fetch user details using userId from response
        const userDetails = await fetchUserDetails(data.userId, data.token);
        
        if (userDetails) {
          console.log("✅ User Details:", userDetails);
          login(userDetails, data.token);
          navigate("/");
        } else {
          // Agar user details API nahi hai, toh basic user object banayein
          const basicUser = {
            name: formData.email.split('@')[0], // email se name extract karein
            email: formData.email,
            id: data.userId
          };
          console.log("✅ Using Basic User:", basicUser);
          login(basicUser, data.token);
          navigate("/");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error", error);
      setError("Network error. Please check your connection.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <FaHospital className="hospital-icon" />
          <h1>ModernHope</h1>
          <p>Hospital Management System</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">
              <FaUserShield className="input-icon" />
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleInput}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              <FaLock className="input-icon" />
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleInput}
            />
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleInput}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <Link to="/register" className="signup-link">
            Don't have an account? <strong>Sign Up</strong>
          </Link>
        </form>

        <div className="security-note">
          <FaShieldAlt className="shield-icon" />
          <span>HIPAA-compliant secure login</span>
        </div>
      </div>
      <button className="back-to-home-btn">
                    <FaArrowLeft className="back-icon" />
                    <NavLink to="/">Back to Home</NavLink>
                  </button>
    </div>
  );
};