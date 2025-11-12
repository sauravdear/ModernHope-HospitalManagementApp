const mongoose = require('mongoose');

const staffScheduleSchema = new mongoose.Schema({
    staffName:{
        type:String,
        required:true,
        trim:true
    },
    staffRole:{
        type:String,
        required:true,
        enum:['Doctor', 'Nurse', 'Receptionist', 'Compounder', 'Technician', 'Therapist' ],
        trim:true
    },
    shiftDate:{
         type:Date,
         required:true
    },
      startTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:MM format
  },
  endTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:MM format
  },
  department:{
    type:String,
    required:true,
    enum:['Emergency','OPD', 'ICU', 'Radiology', 'Pharmacy', 'Laboratory' ],
    trim:true
  },
   notes: {
    type: String,
    trim: true,
    maxlength: 200
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  }
}, {
  timestamps: true
});
staffScheduleSchema.index({shiftDate:1,StaffName:1});

module.exports = mongoose.model('StaffSchedule', staffScheduleSchema);

//Scheduling of the staff has been created.(Schema)