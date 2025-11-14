import { NavLink } from "react-router-dom";
import { FaHospital } from "react-icons/fa";
import { useAuth } from '../auth/AuthContext'; // ✅ Auth context import karein
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth(); // ✅ user aur logout function get karein

  const handleLogout = () => {
    logout();
    // Optional: navigate to home after logout
    // navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="logo-container">
          <FaHospital className="hospital-icon" />
          <h1 className="logo">ModernHope</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/features" className={({ isActive }) => isActive ? "active" : ""}>Features</NavLink>
            </li>
            <li>
              <NavLink to="/solutions" className={({ isActive }) => isActive ? "active" : ""}>Solutions</NavLink>
            </li>
            <li>
              <NavLink to="/pricing" className={({ isActive }) => isActive ? "active" : ""}>Pricing</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
            </li>
          </ul>
        </nav>
        
        {user ? (
          <div className="user-menu">
            <div className="user-profile">
              <span className="user-name">
  Welcome, {user?.name || user?.email || 'User'}
</span>
              <div className="profile-dropdown">
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/settings">Settings</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <NavLink to="/login" className="login-btn">Login</NavLink>
            <NavLink to="/register" className="signup-btn">Sign Up</NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;