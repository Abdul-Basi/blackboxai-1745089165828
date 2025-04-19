import React, { useEffect, useState } from 'react';
import StudentForm from './StudentForm';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function fetchStudents() {
    window.electronAPI.invoke('getAllStudents')
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setStudents(result);
          setError(null);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  function handleAdd() {
    setEditingStudent(null);
    setShowForm(true);
  }

  function handleEdit(student) {
    setEditingStudent(student);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this student?')) {
      window.electronAPI.invoke('deleteStudent', id)
        .then((result) => {
          if (result.error) {
            setError(result.error);
          } else {
            fetchStudents();
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }

  function handleSave(studentData) {
    if (editingStudent) {
      window.electronAPI.invoke('updateStudent', editingStudent.id, studentData)
        .then((result) => {
          if (result.error) {
            setError(result.error);
          } else {
            setShowForm(false);
            fetchStudents();
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      window.electronAPI.invoke('createStudent', studentData)
        .then((result) => {
          if (result.error) {
            setError(result.error);
          } else {
            setShowForm(false);
            fetchStudents();
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }

  function handleCancel() {
    setShowForm(false);
    setEditingStudent(null);
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Student List</h2>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      {!showForm && (
        <>
          <button onClick={handleAdd} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add Student</button>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">First Name</th>
                <th className="border px-4 py-2">Last Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{student.id}</td>
                  <td className="border px-4 py-2">{student.firstName}</td>
                  <td className="border px-4 py-2">{student.lastName}</td>
                  <td className="border px-4 py-2">{student.email}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(student)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleDelete(student.id)} className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {showForm && (
        <StudentForm student={editingStudent} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default StudentList;
