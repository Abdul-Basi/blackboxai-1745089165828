import React, { useEffect, useState } from 'react';

function AttendanceList() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  function fetchAttendance() {
    window.electronAPI.invoke('getAttendanceByDate', date)
      .then(result => {
        if (result.error) {
          setError(result.error);
        } else {
          setAttendanceRecords(result);
          setError(null);
        }
      })
      .catch(err => setError(err.message));
  }

  useEffect(() => {
    fetchAttendance();
  }, [date]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button onClick={fetchAttendance} className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Refresh</button>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Student ID</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map(record => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{record.id}</td>
              <td className="border px-4 py-2">{record.studentId}</td>
              <td className="border px-4 py-2">{record.date}</td>
              <td className="border px-4 py-2">{record.status}</td>
              <td className="border px-4 py-2">{record.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;
