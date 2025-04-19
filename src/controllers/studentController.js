const Student = require('../models/student');

async function createStudent(data) {
  try {
    const student = await Student.create(data);
    return student;
  } catch (error) {
    throw error;
  }
}

async function getAllStudents() {
  try {
    const students = await Student.findAll();
    return students;
  } catch (error) {
    throw error;
  }
}

async function getStudentById(id) {
  try {
    const student = await Student.findByPk(id);
    return student;
  } catch (error) {
    throw error;
  }
}

async function updateStudent(id, data) {
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new Error('Student not found');
    }
    await student.update(data);
    return student;
  } catch (error) {
    throw error;
  }
}

async function deleteStudent(id) {
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new Error('Student not found');
    }
    await student.destroy();
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
