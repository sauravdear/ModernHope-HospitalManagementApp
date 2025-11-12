const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  prescribed: {
    type: Date,
    default: Date.now
  },
  doctor: {
    type: String,
    required: true
  }
});

const medicalHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  doctor: {
    type: String,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  treatment: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
});

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: [true, "Patient name is required"],
    trim: true
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"]
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  contact: {
    type: String,
    required: [true, "Contact information is required"]
  },
  address: {
    type: String,
    required: true
  },
  insurance: {
    type: String,
    default: ""
  },
  allergies: {
    type: String,
    default: "None"
  },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true
  },
  medications: [medicationSchema],
  history: [medicalHistorySchema],
  lastVisit: {
    type: Date,
    default: Date.now
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  }
}, {
  timestamps: true
});

// Generate patientId before saving
patientSchema.pre('save', async function(next) {
  if (!this.patientId) {
    const lastPatient = await this.constructor.findOne().sort({ patientId: -1 });
    const lastNumber = lastPatient ? parseInt(lastPatient.patientId.substring(1)) : 1000;
    this.patientId = `P${lastNumber + 1}`;
  }
  next();
});

module.exports = mongoose.model("Patient", patientSchema);