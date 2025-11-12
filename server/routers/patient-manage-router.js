const express = require("express");
const router = express.Router();
const {
  registerPatient,
  patientLogin,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addMedicalHistory,
  addMedication
} = require("../controllers/patient-controller");

// Public routes
router.post("/login", patientLogin);

// Protected routes (would typically add auth middleware)
router.post("/register", registerPatient);
router.get("/", getAllPatients);
router.get("/:patientId", getPatientById);
router.put("/:patientId", updatePatient);
router.delete("/:patientId", deletePatient);
router.post("/:patientId/history", addMedicalHistory);
router.post("/:patientId/medications", addMedication);

module.exports = router;