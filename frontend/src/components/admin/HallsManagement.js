import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const HallsManagement = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentHall, setCurrentHall] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    rows: '',
    seats_per_row: ''
  });

  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = async () => {
    setLoading(true);
    try {
      const response = await api.get('/halls/');
      setHalls(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch halls');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If changing rows or seats_per_row, recalculate capacity
    if (name === 'rows' || name === 'seats_per_row') {
      const rows = name === 'rows' ? parseInt(value) || 0 : parseInt(formData.rows) || 0;
      const seatsPerRow = name === 'seats_per_row' ? parseInt(value) || 0 : parseInt(formData.seats_per_row) || 0;
      const capacity = rows * seatsPerRow;
      
      setFormData({
        ...formData,
        [name]: value,
        capacity: capacity.toString()
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddHall = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.capacity || !formData.rows || !formData.seats_per_row) {
      alert('All fields are required');
      return;
    }

    try {
      await api.post('/halls/', {
        ...formData,
        capacity: parseInt(formData.capacity),
        rows: parseInt(formData.rows),
        seats_per_row: parseInt(formData.seats_per_row)
      });
      
      fetchHalls();
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      alert('Failed to add hall');
    }
  };

  const handleEditHall = async (e) => {
    e.preventDefault();
    
    try {
      await api.put(`/halls/${currentHall.id}`, {
        ...formData,
        capacity: parseInt(formData.capacity),
        rows: parseInt(formData.rows),
        seats_per_row: parseInt(formData.seats_per_row)
      });
      
      fetchHalls();
      setIsEditModalOpen(false);
      resetForm();
    } catch (err) {
      alert('Failed to update hall');
    }
  };

  const handleDeleteHall = async (hallId) => {
    if (window.confirm('Are you sure you want to delete this hall? This will also delete all associated showtimes and seats.')) {
      try {
        await api.delete(`/halls/${hallId}`);
        fetchHalls();
      } catch (err) {
        alert('Failed to delete hall. It may still have showtimes or reservations associated with it.');
      }
    }
  };

  const openEditModal = (hall) => {
    setCurrentHall(hall);
    setFormData({
      name: hall.name,
      capacity: hall.capacity.toString(),
      rows: hall.rows.toString(),
      seats_per_row: hall.seats_per_row.toString()
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      capacity: '',
      rows: '',
      seats_per_row: ''
    });
    setCurrentHall(null);
  };

  if (loading && halls.length === 0) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Halls Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Hall
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Layout
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {halls.map((hall) => (
              <tr key={hall.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{hall.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{hall.capacity} seats</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{hall.rows} rows × {hall.seats_per_row} seats</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openEditModal(hall)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteHall(hall.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Hall Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Hall</h2>
            <form onSubmit={handleAddHall}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Hall Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Number of Rows</label>
                <input
                  type="number"
                  name="rows"
                  value={formData.rows}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  min="1"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Seats per Row</label>
                <input
                  type="number"
                  name="seats_per_row"
                  value={formData.seats_per_row}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  min="1"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Total Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                  readOnly
                />
                <p className="text-sm text-gray-500 mt-1">Auto-calculated from rows and seats</p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Hall
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Hall Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Hall</h2>
            <form onSubmit={handleEditHall}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Hall Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Number of Rows</label>
                <input
                  type="number"
                  name="rows"
                  value={formData.rows}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  min="1"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Seats per Row</label>
                <input
                  type="number"
                  name="seats_per_row"
                  value={formData.seats_per_row}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  min="1"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Total Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                  readOnly
                />
                <p className="text-sm text-gray-500 mt-1">Auto-calculated from rows and seats</p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update Hall
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HallsManagement;
