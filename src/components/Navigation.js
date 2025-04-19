import React from 'react';

function Navigation({ user, onSelectModule, selectedModule }) {
  const modules = [
    { key: 'students', label: 'Student Management', roles: ['admin', 'departmentHead', 'staff', 'itManager'] },
    { key: 'teachers', label: 'Teacher Management', roles: ['admin', 'departmentHead', 'staff', 'itManager'] },
    { key: 'attendance', label: 'Attendance Management', roles: ['admin', 'departmentHead', 'staff'] },
    { key: 'exams', label: 'Examination & Grading', roles: ['admin', 'departmentHead'] },
    { key: 'fees', label: 'Fee Management', roles: ['admin', 'staff'] },
    { key: 'timetable', label: 'Timetable Management', roles: ['admin', 'departmentHead', 'itManager'] },
    { key: 'userManagement', label: 'User Management', roles: ['admin'] },
  ];

  const availableModules = modules.filter(m => m.roles.includes(user.role));

  return (
    <nav className="mb-6 flex space-x-4 border-b pb-2">
      {availableModules.map((mod) => (
        <button
          key={mod.key}
          onClick={() => onSelectModule(mod.key)}
          className={`px-4 py-2 rounded ${
            selectedModule === mod.key ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {mod.label}
        </button>
      ))}
    </nav>
  );
}

export default Navigation;
