const Attendance = require('../models/attendance');

async function recordAttendance(data) {
  try {
    const attendance = await Attendance.create(data);
    return attendance;
  } catch (error) {
    throw error;
  }
}

async function getAttendanceByDate(date) {
  try {
    const records = await Attendance.findAll({ where: { date } });
    return records;
  } catch (error) {
    throw error;
  }
}

async function getAttendanceByStudent(studentId) {
  try {
    const records = await Attendance.findAll({ where: { studentId } });
    return records;
  } catch (error) {
    throw error;
  }
}

async function updateAttendance(id, data) {
  try {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      throw new Error('Attendance record not found');
    }
    await attendance.update(data);
    return attendance;
  } catch (error) {
    throw error;
  }
}

async function deleteAttendance(id) {
  try {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      throw new Error('Attendance record not found');
    }
    await attendance.destroy();
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  recordAttendance,
  getAttendanceByDate,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance,
};
