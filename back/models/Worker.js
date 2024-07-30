const mongoose = require('mongoose');

const workScheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  }
});

const defaultWorkSchedule = () => {
  const schedule = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const startTime = new Date();
  const endTime = new Date();

  // Set the time to 09:00 and 18:00
  startTime.setHours(9, 0, 0, 0); // 9:00 AM
  endTime.setHours(18, 0, 0, 0);  // 6:00 PM

  days.forEach(day => {
    schedule.push({
      day,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    });
  });

  return schedule;
};

const workerSchema = new mongoose.Schema({
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone_number: {
      type: String,
      required: true,
      unique: true
    },
    salary: {
      type: Number,
      default: 0
    },
    roles: [{
      type: String,
      default: "Employee"
    }],
    active: {
      type: Boolean,
      default: true
    },
    work_schedule: {
      type: [workScheduleSchema],
      default: defaultWorkSchedule
    }
  });
  
  module.exports = mongoose.model('Worker', workerSchema);
