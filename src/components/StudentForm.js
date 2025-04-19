import React, { useState, useEffect } from 'react';

function StudentForm({ student, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    email: '',
    phone: '',
    address: '',
    enrollmentDate: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        dateOfBirth: student.dateOfBirth || '',
        gender: student.gender || 'Male',
        email: student.email || '',
        phone: student.phone || '',
        address: student.address || '',
        enrollmentDate: student.enrollmentDate || '',
      });
    }
  }, [student]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border px-2 py-1 rounded">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-semibold">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Enrollment Date</label>
          <input type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
      </div>
    </form>
  );
}

export default StudentForm;
