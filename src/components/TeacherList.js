import React, { useEffect, useState } from 'react';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.electronAPI.invoke('getAllTeachers')
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setTeachers(result);
          setError(null);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Teacher List</h2>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Qualifications</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{teacher.id}</td>
              <td className="border px-4 py-2">{teacher.firstName}</td>
              <td className="border px-4 py-2">{teacher.lastName}</td>
              <td className="border px-4 py-2">{teacher.qualifications}</td>
              <td className="border px-4 py-2">{teacher.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherList;
