// src/pages/Pricing.jsx
import React, { useState } from "react";
import {
  FaCheck,
  FaHospital,
  FaClinicMedical,
  FaStar,
  FaSpinner,
} from "react-icons/fa";
import "../styles/Pricing.css";

import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Pricing = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 49900, // Amount in paise (₹499.00)
      displayPrice: "$499",
      period: "per month",
      icon: <FaClinicMedical />,
      features: [
        "Up to 10 providers",
        "Core patient management",
        "Basic reporting",
        "Email support",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: 129900, // Amount in paise (₹1,299.00)
      displayPrice: "$1,299",
      period: "per month",
      icon: <FaHospital />,
      features: [
        "Up to 50 providers",
        "Advanced analytics",
        "E-prescribing",
        "24/7 priority support",
      ],
      featured: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 499900, // Amount in paise (₹4,999.00)
      displayPrice: "$4,999",
      period: "per month",
      icon: <FaStar />,
      features: [
        "Unlimited providers",
        "Full customization",
        "Dedicated support manager",
        "On-premise option",
      ],
    },
  ];

  const handlePayment = async (plan) => {
    setLoading(true);
    setSelectedPlan(plan.id);

    try {
      // Step 1: Create order
      const orderResponse = await fetch(
        "http://localhost:5000/api/payments/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: plan.price, // Already in paise
            currency: "INR", // Changed to INR for Razorpay
            planId: plan.id,
            planName: plan.name,
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // Step 2: Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        const options = {
          key: orderData.key, // Use key from backend response
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Healthcare Solutions",
          description: `${plan.name} Subscription`,
          order_id: orderData.order_id,
          handler: async function (response) {
            // Step 3: Verify payment
            try {
              const verifyResponse = await fetch(
                "http://localhost:5000/api/payments/verify-payment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                }
              );

              const verifyData = await verifyResponse.json();

              if (verifyData.success) {
                alert(`Payment successful! Welcome to ${plan.name} plan.`);
              } else {
                alert("Payment verification failed: " + verifyData.message);
              }
            } catch (verifyError) {
              console.error("Verification error:", verifyError);
              alert("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#4F46E5",
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              setSelectedPlan(null);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };

      script.onerror = () => {
        throw new Error("Failed to load Razorpay SDK");
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="pricing-page">
      {/* Your existing JSX remains the same */}
      <div className="pricing-hero">
        <div className="hero-content ">
          <h1 className="text-blue-900 ">Simple, Transparent Pricing</h1>
          <p>
            Choose the perfect plan for your healthcare organization. All plans
            include a 7-day free trial.
          </p>
        </div>
      </div>

      <div className="pricing-container">
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.featured ? "featured" : ""}`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.featured && (
                <div className="popular-badge">Most Popular</div>
              )}

              <div className="plan-header">
                <div className="plan-icon">{plan.icon}</div>
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="amount">{plan.displayPrice}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>

              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <FaCheck className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`select-btn ${
                  plan.featured ? "primary" : "secondary"
                } ${loading && selectedPlan === plan.id ? "loading" : ""} ${
                  hoveredPlan === plan.id ? "hover-blue" : ""
                }`}
                onClick={() => handlePayment(plan)}
                disabled={loading && selectedPlan === plan.id}
              >
                {loading && selectedPlan === plan.id ? (
                  <>
                    <FaSpinner className="spinner" />
                    Processing...
                  </>
                ) : (
                  "Start Free Trial"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pricing-footer">
        <p>
          All plans include our 7-day free trial. No credit card required to
          start.
        </p>
        <p>
          Need a custom solution? <a href="/contact">Contact our sales team</a>
        </p>
      </div>
      <button className="back-to-home-btn">
        <FaArrowLeft className="back-icon" />
        <NavLink to="/">Back to Home</NavLink>
      </button>
    </div>
  );
};

export default Pricing;
