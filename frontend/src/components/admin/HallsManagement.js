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
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cinema-black">Halls Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-cinema-red-dark text-white px-4 py-2 rounded-lg hover:bg-cinema-red transition-colors"
        >
          Add New Hall
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-cinema-red text-cinema-red-dark px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-cinema-gray-light">
          <thead className="bg-cinema-gray-light">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cinema-black uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cinema-black uppercase tracking-wider">
                Capacity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cinema-black uppercase tracking-wider">
                Layout
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-cinema-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-cinema-gray-light">
            {halls.map((hall) => (
              <tr key={hall.id} className="hover:bg-cinema-gray-light transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-cinema-black">{hall.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-cinema-black">{hall.capacity} seats</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-cinema-black">{hall.rows} rows × {hall.seats_per_row} seats</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openEditModal(hall)}
                    className="text-cinema-orange hover:text-cinema-orange-light mr-4"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteHall(hall.id)}
                    className="text-cinema-red-dark hover:text-cinema-red"
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
        <div className="fixed inset-0 bg-cinema-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-cinema-black">Add New Hall</h2>
            <form onSubmit={handleAddHall}>
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Hall Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Number of Rows</label>
                <input
                  type="number"
                  name="rows"
                  value={formData.rows}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  min="1"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Seats per Row</label>
                <input
                  type="number"
                  name="seats_per_row"
                  value={formData.seats_per_row}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  min="1"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-cinema-black mb-2">Total Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg bg-cinema-gray-light"
                  readOnly
                />
                <p className="text-sm text-cinema-gray mt-1">Auto-calculated from rows and seats</p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-cinema-gray hover:text-cinema-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cinema-red-dark text-white rounded-lg hover:bg-cinema-red transition-colors"
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
        <div className="fixed inset-0 bg-cinema-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-cinema-black">Edit Hall</h2>
            <form onSubmit={handleEditHall}>
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Hall Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Number of Rows</label>
                <input
                  type="number"
                  name="rows"
                  value={formData.rows}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  min="1"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Seats per Row</label>
                <input
                  type="number"
                  name="seats_per_row"
                  value={formData.seats_per_row}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  min="1"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-cinema-black mb-2">Total Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg bg-cinema-gray-light"
                  readOnly
                />
                <p className="text-sm text-cinema-gray mt-1">Auto-calculated from rows and seats</p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-cinema-gray hover:text-cinema-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cinema-red-dark text-white rounded-lg hover:bg-cinema-red transition-colors"
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
