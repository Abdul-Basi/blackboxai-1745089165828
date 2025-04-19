import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import AttendanceList from './components/AttendanceList';
import FeeManagement from './components/FeeManagement';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import UserManagement from './components/UserManagement';

function App() {
  const [user, setUser] = useState(null);
  const [selectedModule, setSelectedModule] = useState('students');

  function handleLoginSuccess(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
  }

  if (!user) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  function renderModule() {
    switch (selectedModule) {
      case 'students':
        return <StudentList />;
      case 'teachers':
        return <TeacherList />;
      case 'attendance':
        return <AttendanceList />;
      case 'fees':
        return <FeeManagement />;
      case 'userManagement':
        return <UserManagement />;
      // TODO: Add other modules here
      default:
        return <div>Select a module</div>;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">School Management System</h1>
        <div>
          <span className="mr-4">Welcome, {user.username} ({user.role})</span>
          <button onClick={handleLogout} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Logout</button>
        </div>
      </header>
      <Navigation user={user} selectedModule={selectedModule} onSelectModule={setSelectedModule} />
      <main>
        {renderModule()}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
