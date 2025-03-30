import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

const HallsManagement = () => {
  const { t } = useLanguage();
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHall, setEditingHall] = useState(null);
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
    try {
      setLoading(true);
      const response = await api.get('/halls/');
      setHalls(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching halls:', err);
      setError('Failed to load halls');
      setLoading(false);
    }
  };

  const handleOpenModal = (hall = null) => {
    if (hall) {
      setEditingHall(hall);
      setFormData({
        name: hall.name || '',
        capacity: hall.capacity ? String(hall.capacity) : '',
        rows: hall.rows ? String(hall.rows) : '',
        seats_per_row: hall.seats_per_row ? String(hall.seats_per_row) : ''
      });
    } else {
      setEditingHall(null);
      setFormData({
        name: '',
        capacity: '',
        rows: '',
        seats_per_row: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingHall(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If changing rows or seats_per_row, auto-calculate capacity
    if (name === 'rows' || name === 'seats_per_row') {
      const rows = name === 'rows' ? parseInt(value, 10) || 0 : parseInt(formData.rows, 10) || 0;
      const seatsPerRow = name === 'seats_per_row' ? parseInt(value, 10) || 0 : parseInt(formData.seats_per_row, 10) || 0;
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        capacity: String(rows * seatsPerRow)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hallData = {
        ...formData,
        capacity: parseInt(formData.capacity, 10),
        rows: parseInt(formData.rows, 10),
        seats_per_row: parseInt(formData.seats_per_row, 10)
      };

      if (editingHall) {
        await api.put(`/halls/${editingHall.id}`, hallData);
      } else {
        await api.post('/halls/', hallData);
      }

      fetchHalls();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving hall:', err);
      setError('Failed to save hall');
    }
  };

  const handleDeleteHall = async (id) => {
    if (!window.confirm(t("admin.confirmDeleteHall") || "Are you sure you want to delete this hall?")) return;
    
    try {
      await api.delete(`/halls/${id}`);
      fetchHalls();
    } catch (err) {
      console.error('Error deleting hall:', err);
      setError('Failed to delete hall. It may have associated showtimes.');
      // Show a more specific error message
      if (err.response && err.response.status === 400) {
        setError(t("admin.cannotDeleteHall") || 'Cannot delete hall with associated showtimes');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cinema-black">
          {t("admin.halls")}
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-cinema-red-dark text-white px-4 py-2 rounded-lg hover:bg-cinema-red transition-colors"
        >
          {t("admin.addHall")}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </button>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.hallName")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.capacity")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.rows")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.seatsPerRow")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {halls.map((hall) => (
                <tr key={hall.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {hall.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hall.capacity} seats
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hall.rows}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hall.seats_per_row}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(hall)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      {t("admin.edit")}
                    </button>
                    <button
                      onClick={() => handleDeleteHall(hall.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      {t("admin.delete")}
                    </button>
                  </td>
                </tr>
              ))}
              {halls.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    {t("admin.noHallsFound")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hall Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-cinema-black">
                {editingHall ? t("admin.editHall") : t("admin.addHall")}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  {t("admin.hallName")}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rows">
                  {t("admin.rows")}
                </label>
                <input
                  type="number"
                  name="rows"
                  id="rows"
                  value={formData.rows}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  min="1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seats_per_row">
                  {t("admin.seatsPerRow")}
                </label>
                <input
                  type="number"
                  name="seats_per_row"
                  id="seats_per_row"
                  value={formData.seats_per_row}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  min="1"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                  {t("admin.capacity")}
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t("admin.capacityCalculated")}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
                >
                  {t("admin.cancel")}
                </button>
                <button
                  type="submit"
                  className="bg-cinema-red-dark text-white px-4 py-2 rounded-lg hover:bg-cinema-red transition-colors"
                >
                  {t("admin.save")}
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
