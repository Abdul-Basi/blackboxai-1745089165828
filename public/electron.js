const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../src/controllers/studentController');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for student operations
ipcMain.handle('getAllStudents', async () => {
  try {
    const students = await getAllStudents();
    return students;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('createStudent', async (event, studentData) => {
  try {
    const student = await createStudent(studentData);
    return student;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getStudentById', async (event, id) => {
  try {
    const student = await getStudentById(id);
    return student;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('updateStudent', async (event, id, studentData) => {
  try {
    const student = await updateStudent(id, studentData);
    return student;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('deleteStudent', async (event, id) => {
  try {
    const result = await deleteStudent(id);
    return result;
  } catch (error) {
    return { error: error.message };
  }
});

const { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('../src/controllers/teacherController');
const { createUser, authenticateUser } = require('../src/controllers/userController');

// IPC handlers for teacher operations
ipcMain.handle('getAllTeachers', async () => {
  try {
    const teachers = await getAllTeachers();
    return teachers;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('createTeacher', async (event, teacherData) => {
  try {
    const teacher = await createTeacher(teacherData);
    return teacher;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getTeacherById', async (event, id) => {
  try {
    const teacher = await getTeacherById(id);
    return teacher;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('updateTeacher', async (event, id, teacherData) => {
  try {
    const teacher = await updateTeacher(id, teacherData);
    return teacher;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('deleteTeacher', async (event, id) => {
  try {
    const result = await deleteTeacher(id);
    return result;
  } catch (error) {
    return { error: error.message };
  }
});

const { recordAttendance, getAttendanceByDate, getAttendanceByStudent, updateAttendance, deleteAttendance } = require('../src/controllers/attendanceController');

// IPC handlers for user authentication
ipcMain.handle('createUser', async (event, userData) => {
  try {
    const user = await createUser(userData);
    return user;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('authenticateUser', async (event, username, password) => {
  try {
    const user = await authenticateUser(username, password);
    return user;
  } catch (error) {
    return { error: error.message };
  }
});

const { createExam, getAllExams, getExamById, updateExam, deleteExam, createGrade, getGradesByExam, getGradesByStudent, updateGrade, deleteGrade } = require('../src/controllers/examController');

// IPC handlers for attendance management
ipcMain.handle('recordAttendance', async (event, attendanceData) => {
  try {
    const attendance = await recordAttendance(attendanceData);
    return attendance;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getAttendanceByDate', async (event, date) => {
  try {
    const records = await getAttendanceByDate(date);
    return records;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getAttendanceByStudent', async (event, studentId) => {
  try {
    const records = await getAttendanceByStudent(studentId);
    return records;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('updateAttendance', async (event, id, attendanceData) => {
  try {
    const attendance = await updateAttendance(id, attendanceData);
    return attendance;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('deleteAttendance', async (event, id) => {
  try {
    const result = await deleteAttendance(id);
    return result;
  } catch (error) {
    return { error: error.message };
  }
});

const { createFee, getFeesByStudent, updateFee, deleteFee } = require('../src/controllers/feeController');

// IPC handlers for examination and grading
ipcMain.handle('createExam', async (event, examData) => {
  try {
    const exam = await createExam(examData);
    return exam;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getAllExams', async () => {
  try {
    const exams = await getAllExams();
    return exams;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getExamById', async (event, id) => {
  try {
    const exam = await getExamById(id);
    return exam;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('updateExam', async (event, id, examData) => {
  try {
    const exam = await updateExam(id, examData);
    return exam;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('deleteExam', async (event, id) => {
  try {
    const result = await deleteExam(id);
    return result;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('createGrade', async (event, gradeData) => {
  try {
    const grade = await createGrade(gradeData);
    return grade;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getGradesByExam', async (event, examId) => {
  try {
    const grades = await getGradesByExam(examId);
    return grades;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getGradesByStudent', async (event, studentId) => {
  try {
    const grades = await getGradesByStudent(studentId);
    return grades;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('updateGrade', async (event, id, gradeData) => {
  try {
    const grade = await updateGrade(id, gradeData);
    return grade;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('deleteGrade', async (event, id) => {
  try {
    const result = await deleteGrade(id);
    return result;
  } catch (error) {
    return { error: error.message };
  }
});

const { createTimetableEntry, getTimetableByDay, updateTimetableEntry, deleteTimetableEntry, createResource, getAllResources, updateResource, deleteResource } = require('../src/controllers/timetableController');

// IPC handlers for fee management
ipcMain.handle('createFee', async (event, feeData) => {
  try {
    const fee = await createFee(feeData);
    return fee;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getFeesByStudent', async (event, studentId) => {
  try {
    const fees = await getFeesByStudent(studentId);
    return fees;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('updateFee', async (event, id, feeData) => {
  try {
    const fee = await updateFee(id, feeData);
    return fee;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('deleteFee', async (event, id) => {
  try {
    const result = await deleteFee(id);
    return result;
  } catch (error) {
    return { error: error.message };
  }
});

// IPC handlers for timetable management
ipcMain.handle('createTimetableEntry', async (event, entryData) => {
  try {
    const entry = await createTimetableEntry(entryData);
    return entry;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getTimetableByDay', async (event, dayOfWeek) => {
  try {
    const entries = await getTimetableByDay(dayOfWeek);
    return entries;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('updateTimetableEntry', async (event, id, entryData) => {
  try {
    const entry = await updateTimetableEntry(id, entryData);
    return entry;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('deleteTimetableEntry', async (event, id) => {
  try {
    const result = await deleteTimetableEntry(id);
    return result;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('createResource', async (event, resourceData) => {
  try {
    const resource = await createResource(resourceData);
    return resource;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('getAllResources', async () => {
  try {
    const resources = await getAllResources();
    return resources;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('updateResource', async (event, id, resourceData) => {
  try {
    const resource = await updateResource(id, resourceData);
    return resource;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('deleteResource', async (event, id) => {
  try {
    const result = await deleteResource(id);
    return result;
  } catch (error) {
    return { error: error.message };
  }
});
