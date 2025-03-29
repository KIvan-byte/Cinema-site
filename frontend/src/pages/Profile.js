import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    // Check if we're coming from successful payment
    if (location.state?.paymentSuccess) {
      setSuccessMessage('Payment successful! Your ticket has been confirmed.');
    }
    
    fetchReservations();
  }, [location.state]);
  
  const fetchReservations = async () => {
    try {
      const response = await api.get('/users/me/reservations');
      setReservations(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load your reservations');
      setLoading(false);
    }
  };

  const handleDownloadTicket = async (reservationId) => {
    try {
      // Используем Blob для получения PDF и создания ссылки скачивания
      const response = await api.get(`/reservations/${reservationId}/ticket`, {
        responseType: 'blob'
      });
      
      // Создаем URL для скачивания
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ticket_${reservationId}.pdf`);
      
      // Добавляем ссылку, нажимаем на нее и удаляем
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error('Error downloading ticket:', err);
      alert('Failed to download ticket. Please try again.');
    }
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {successMessage}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Username</p>
            <p className="font-medium">{currentUser.username}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-xl font-semibold">My Tickets</h2>
        </div>
        
        {error && (
          <div className="p-4 text-red-600">{error}</div>
        )}
        
        {reservations.length === 0 ? (
          <div className="p-6 text-gray-600">
            You haven't purchased any tickets yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold text-lg">
                      {reservation.showtime?.movie?.title}
                    </h3>
                    <p className="text-gray-600">
                      {format(
                        new Date(reservation.showtime?.start_time), 
                        'MMMM dd, yyyy - h:mm a'
                      )}
                    </p>
                    <p className="mt-1">
                      {reservation.seats && reservation.seats.length > 0 ? (
                        <span>
                          Seats: {reservation.seats.map(seat => `Row ${seat.row}, Seat ${seat.number}`).join(', ')}
                        </span>
                      ) : (
                        <span>Seat: Row {reservation.seat?.row}, Number {reservation.seat?.number}</span>
                      )}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      reservation.payment_status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : reservation.payment_status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {reservation.payment_status.charAt(0).toUpperCase() + 
                        reservation.payment_status.slice(1)}
                    </span>
                    {reservation.payment_status === 'completed' && (
                      <button 
                        onClick={() => handleDownloadTicket(reservation.id)}
                        className="mt-2 text-blue-600 hover:underline"
                      >
                        Download Ticket
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
