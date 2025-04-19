const Exam = require('../models/exam');
const Grade = require('../models/grade');

async function createExam(data) {
  try {
    const exam = await Exam.create(data);
    return exam;
  } catch (error) {
    throw error;
  }
}

async function getAllExams() {
  try {
    const exams = await Exam.findAll();
    return exams;
  } catch (error) {
    throw error;
  }
}

async function getExamById(id) {
  try {
    const exam = await Exam.findByPk(id);
    return exam;
  } catch (error) {
    throw error;
  }
}

async function updateExam(id, data) {
  try {
    const exam = await Exam.findByPk(id);
    if (!exam) {
      throw new Error('Exam not found');
    }
    await exam.update(data);
    return exam;
  } catch (error) {
    throw error;
  }
}

async function deleteExam(id) {
  try {
    const exam = await Exam.findByPk(id);
    if (!exam) {
      throw new Error('Exam not found');
    }
    await exam.destroy();
    return true;
  } catch (error) {
    throw error;
  }
}

async function createGrade(data) {
  try {
    const grade = await Grade.create(data);
    return grade;
  } catch (error) {
    throw error;
  }
}

async function getGradesByExam(examId) {
  try {
    const grades = await Grade.findAll({ where: { examId } });
    return grades;
  } catch (error) {
    throw error;
  }
}

async function getGradesByStudent(studentId) {
  try {
    const grades = await Grade.findAll({ where: { studentId } });
    return grades;
  } catch (error) {
    throw error;
  }
}

async function updateGrade(id, data) {
  try {
    const grade = await Grade.findByPk(id);
    if (!grade) {
      throw new Error('Grade not found');
    }
    await grade.update(data);
    return grade;
  } catch (error) {
    throw error;
  }
}

async function deleteGrade(id) {
  try {
    const grade = await Grade.findByPk(id);
    if (!grade) {
      throw new Error('Grade not found');
    }
    await grade.destroy();
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
  createGrade,
  getGradesByExam,
  getGradesByStudent,
  updateGrade,
  deleteGrade,
};
