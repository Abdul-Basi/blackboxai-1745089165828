const Teacher = require('../models/teacher');

async function createTeacher(data) {
  try {
    const teacher = await Teacher.create(data);
    return teacher;
  } catch (error) {
    throw error;
  }
}

async function getAllTeachers() {
  try {
    const teachers = await Teacher.findAll();
    return teachers;
  } catch (error) {
    throw error;
  }
}

async function getTeacherById(id) {
  try {
    const teacher = await Teacher.findByPk(id);
    return teacher;
  } catch (error) {
    throw error;
  }
}

async function updateTeacher(id, data) {
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    await teacher.update(data);
    return teacher;
  } catch (error) {
    throw error;
  }
}

async function deleteTeacher(id) {
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    await teacher.destroy();
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
