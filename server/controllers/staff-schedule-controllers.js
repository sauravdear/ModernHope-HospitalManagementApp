const StaffSchedule = require('../models/staff-schedule-model');


exports.getAllSchedules = async(req,res) =>{
   try{
     const {date,department} = req.body;
    let filter = {};
    if(date){
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);
        filter.shiftDate = {$gte : startDate,$lt :endDate};

    }

    if(department){
        filter.department = department;
    }

    const schedules = await StaffSchedule.find(filter)
        .sort({shiftDate:1,startTime:1})
        .lean();


        res.json({
            success:true,
            data:schedules,
            count:schedules.length
        });
   }catch(error){
    console.error('Error fetching schedules: ',error);
    res.status(500).json({
        success:false,
        message:'Error fetching staff schedules',
        error:error.message
    });
   }

};

exports.createSchedule = async (req, res) => {
  try {
    const { staffName, staffRole, shiftDate, startTime, endTime, department, notes } = req.body;

    // Check for scheduling conflicts
    const conflict = await StaffSchedule.findOne({
      staffName,
      shiftDate: new Date(shiftDate),
      $or: [
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gt: startTime } }
          ]
        },
        {
          $and: [
            { startTime: { $lt: endTime } },
            { endTime: { $gte: endTime } }
          ]
        }
      ]
    });

    if (conflict) {
      return res.status(400).json({
        success: false,
        message: 'Staff member already scheduled during this time'
      });
    }

    const newSchedule = new StaffSchedule({
      staffName,
      staffRole,
      shiftDate: new Date(shiftDate),
      startTime,
      endTime,
      department,
      notes
    });

    const savedSchedule = await newSchedule.save();

    res.status(201).json({
      success: true,
      message: 'Schedule created successfully',
      data: savedSchedule
    });
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating staff schedule',
      error: error.message
    });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.shiftDate) {
      updateData.shiftDate = new Date(updateData.shiftDate);
    }

    const updatedSchedule = await StaffSchedule.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }

    res.json({
      success: true,
      message: 'Schedule updated successfully',
      data: updatedSchedule
    });
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating staff schedule',
      error: error.message
    });
  }
};

// Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSchedule = await StaffSchedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }

    res.json({
      success: true,
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting staff schedule',
      error: error.message
    });
  }
};

// Get schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await StaffSchedule.findById(id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }

    res.json({
      success: true,
      data: schedule
    });
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching staff schedule',
      error: error.message
    });
  }
};