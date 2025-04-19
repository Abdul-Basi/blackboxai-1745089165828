import React, { useEffect, useState } from 'react';

function FeeManagement() {
  const [fees, setFees] = useState([]);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [formData, setFormData] = useState({
    studentId: '',
    amount: '',
    dueDate: '',
    paidDate: '',
    status: 'Pending',
    receiptNumber: '',
  });
  const [showForm, setShowForm] = useState(false);

  function fetchFees() {
    if (!studentId) {
      setFees([]);
      return;
    }
    window.electronAPI.invoke('getFeesByStudent', parseInt(studentId))
      .then(result => {
        if (result.error) {
          setError(result.error);
        } else {
          setFees(result);
          setError(null);
        }
      })
      .catch(err => setError(err.message));
  }

  useEffect(() => {
    fetchFees();
  }, [studentId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const data = {
      ...formData,
      studentId: parseInt(formData.studentId),
      amount: parseFloat(formData.amount),
    };
    window.electronAPI.invoke('createFee', data)
      .then(result => {
        if (result.error) {
          setError(result.error);
        } else {
          setShowForm(false);
          setFormData({
            studentId: '',
            amount: '',
            dueDate: '',
            paidDate: '',
            status: 'Pending',
            receiptNumber: '',
          });
          fetchFees();
        }
      })
      .catch(err => setError(err.message));
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Fee Management</h2>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Student ID</label>
        <input
          type="number"
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          placeholder="Enter student ID to view fees"
        />
        <button onClick={fetchFees} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Load Fees</button>
      </div>
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add Fee</button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 max-w-md">
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Student ID</label>
            <input type="number" name="studentId" value={formData.studentId} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Amount</label>
            <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Paid Date</label>
            <input type="date" name="paidDate" value={formData.paidDate} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full border px-2 py-1 rounded">
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Receipt Number</label>
            <input type="text" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Fee</button>
          </div>
        </form>
      )}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Student ID</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Due Date</th>
            <th className="border px-4 py-2">Paid Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Receipt Number</th>
          </tr>
        </thead>
        <tbody>
          {fees.map(fee => (
            <tr key={fee.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{fee.id}</td>
              <td className="border px-4 py-2">{fee.studentId}</td>
              <td className="border px-4 py-2">{fee.amount}</td>
              <td className="border px-4 py-2">{fee.dueDate}</td>
              <td className="border px-4 py-2">{fee.paidDate || '-'}</td>
              <td className="border px-4 py-2">{fee.status}</td>
              <td className="border px-4 py-2">{fee.receiptNumber || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeeManagement;
