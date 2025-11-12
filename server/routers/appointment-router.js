const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getAvailableTimeSlots,
  rescheduleAppointment
} = require('../controllers/appointment-controllers');

// @route   POST /api/appointments/create
// @desc    Create new appointment
// @access  Private (Patient)
router.post('/create', auth, createAppointment);

// @route   GET /api/appointments/patient
// @desc    Get appointments for logged-in patient
// @access  Private (Patient)
router.get('/patient', auth, getPatientAppointments);

// @route   GET /api/appointments/doctor
// @desc    Get appointments for logged-in doctor
// @access  Private (Doctor)
router.get('/doctor', auth, getDoctorAppointments);

// @route   GET /api/appointments/all
// @desc    Get all appointments (Admin only)
// @access  Private (Admin)
router.get('/all', auth, getAllAppointments);

// @route   PUT /api/appointments/:id/status
// @desc    Update appointment status
// @access  Private (Patient/Doctor/Admin)
router.put('/:id/status', auth, updateAppointmentStatus);

// @route   DELETE /api/appointments/:id
// @desc    Delete appointment
// @access  Private (Patient/Admin)
router.delete('/:id', auth, deleteAppointment);

// @route   GET /api/appointments/available-slots/:doctorId/:date
// @desc    Get available time slots for a doctor on specific date
// @access  Private
router.get('/available-slots/:doctorId/:date', auth, getAvailableTimeSlots);

// @route   PUT /api/appointments/:id/reschedule
// @desc    Reschedule an appointment
// @access  Private (Patient/Admin)
router.put('/:id/reschedule', auth, rescheduleAppointment);

module.exports = router;