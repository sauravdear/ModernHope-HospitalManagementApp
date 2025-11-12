const mongoose = require('mongoose');
const User = require('../models/user-models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const home = async (req, res) => {
  try {
    res.status(200).send("You are at the home page of the controller logic");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { 
      username, 
      email, 
      phone, 
      facility, 
      facilityType, 
      password,
      role,
      // Doctor specific fields
      specialization,
      department,
      experience,
      consultationFee,
      qualifications,
      // Patient specific fields
      dateOfBirth,
      gender,
      bloodGroup,
      address
    } = req.body;

    // Required fields for all users
    if (!username || !email || !phone || !facility || !facilityType || !password) {
      return res.status(400).json({ message: "All basic fields are required" });
    }

    // Additional validation for doctors
    if (role === 'doctor' && (!specialization || !department)) {
      return res.status(400).json({ 
        message: "Specialization and department are required for doctors" 
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user data object
    const userData = {
      username,
      email,
      phone,
      facility,
      facilityType,
      password,
      role: role || 'patient',
    };

    // Add doctor-specific fields if role is doctor
    if (role === 'doctor') {
      userData.specialization = specialization;
      userData.department = department;
      userData.experience = experience || 0;
      userData.consultationFee = consultationFee || 50;
      userData.qualifications = qualifications || [];
    }

    // Add patient-specific fields if role is patient
    if (role === 'patient') {
      userData.dateOfBirth = dateOfBirth;
      userData.gender = gender;
      userData.bloodGroup = bloodGroup;
      userData.address = address;
    }

    const userCreated = await User.create(userData);

    console.log("User created:", userCreated);

    // Generate response data (exclude password)
    const responseUser = {
      _id: userCreated._id,
      username: userCreated.username,
      email: userCreated.email,
      phone: userCreated.phone,
      facility: userCreated.facility,
      facilityType: userCreated.facilityType,
      role: userCreated.role,
      specialization: userCreated.specialization,
      department: userCreated.department,
      experience: userCreated.experience,
      consultationFee: userCreated.consultationFee,
      dateOfBirth: userCreated.dateOfBirth,
      gender: userCreated.gender,
      bloodGroup: userCreated.bloodGroup,
      address: userCreated.address,
      isActive: userCreated.isActive
    };

    res.status(201).json({
      message: "User registered successfully",
      user: responseUser,
      token: userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if user is active
    if (!userExist.isActive) {
      return res.status(401).json({ 
        message: "Account is deactivated. Please contact administrator." 
      });
    }
   
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    console.log("Entered:", password);
    console.log("Stored Hash:", userExist.password);
    console.log("Match result:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Update last login
    userExist.lastLogin = new Date();
    await userExist.save();

    const token = userExist.generateToken();

    // Return user data (excluding password)
    const userData = {
      _id: userExist._id,
      username: userExist.username,
      email: userExist.email,
      phone: userExist.phone,
      facility: userExist.facility,
      facilityType: userExist.facilityType,
      role: userExist.role,
      specialization: userExist.specialization,
      department: userExist.department,
      experience: userExist.experience,
      consultationFee: userExist.consultationFee,
      dateOfBirth: userExist.dateOfBirth,
      gender: userExist.gender,
      bloodGroup: userExist.bloodGroup,
      address: userExist.address,
      isActive: userExist.isActive,
      lastLogin: userExist.lastLogin
    };

    res.status(200).json({
      message: "Login successful",
      token,
      userId: userExist._id.toString(),
      user: userData
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Please provide email" });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).send({ message: "User not found. Please register." });
    }

    const token = jwt.sign({ userId: checkUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const reciever = {
      from: "gauravgeeta1639@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Click on this link to generate new password ${process.env.CLIENT_URL}/reset-password/${token}`,
    };

    await transporter.sendMail(reciever);

    return res.status(200).send({ message: "Password reset link sent successfully to your Gmail account" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).send({ message: "Please provide password" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).send({ message: "Invalid token" });
    }

    user.password = password; 
    await user.save();

    return res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).send({ message: "Token has expired" });
    }
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { home, register, login, forgotPassword, resetPassword };