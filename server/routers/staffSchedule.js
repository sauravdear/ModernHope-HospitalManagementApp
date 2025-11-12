const express = require('express');
const router  =  express.Router();

const staffSchedule = require('../controllers/staff-schedule-controllers');



router.get('/',staffSchedule.getAllSchedules);
router.get('/:id', staffSchedule.getScheduleById);

// POST /api/staff-schedule - Create new schedule
router.post('/', staffSchedule.createSchedule);

// PUT /api/staff-schedule/:id - Update schedule
router.put('/:id', staffSchedule.updateSchedule);

// DELETE /api/staff-schedule/:id - Delete schedule
router.delete('/:id', staffSchedule.deleteSchedule);

module.exports = router;