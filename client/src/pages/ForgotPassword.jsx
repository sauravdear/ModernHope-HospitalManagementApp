import  { useState } from "react";
import { FaEnvelope, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <Link to="/login" className="back-link">
          <FaArrowLeft className="back-icon" />
          Back to Login
        </Link>

        <div className="password-header">
          <FaShieldAlt className="shield-icon" />
          <h1>Reset Your Password</h1>
          <p>
            {submitted
              ? "If an account exists with this email, you'll receive a password reset link shortly."
              : "Enter your email to receive a password reset link"}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="password-form">
            <div className="input-group">
              <label htmlFor="email">
                <FaEnvelope className="input-icon" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <div className="checkmark">✓</div>
            <h3>Reset Link Sent!</h3>
            <p>
              Please check your inbox and follow the instructions to reset your password.
              The link will expire in 1 hour.
            </p>
            <p className="not-received">
              Didn't receive the email? <button className="resend-link">Resend Link</button>
            </p>
          </div>
        )}

        <div className="support-note">
          <p>
            Need help? Contact our <Link to="/support">support team</Link> or call 
            <strong> +1 (800) 555-HELP</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

