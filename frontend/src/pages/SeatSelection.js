import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const SeatSelection = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);  // Изменено на массив
  const [showtimeDetails, setShowtimeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const MAX_SEATS = 5; // Максимальное количество мест для выбора

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch seat information
        const seatsResponse = await api.get(`/showtime/${showtimeId}/seats`);
        setSeats(seatsResponse.data);
        
        // Get showtime details
        const showtimeResponse = await api.get(`/showtimes/`);
        const showtime = showtimeResponse.data.find(s => s.id === parseInt(showtimeId));
        setShowtimeDetails(showtime);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load seat information');
        setLoading(false);
      }
    };

    fetchData();
  }, [showtimeId]);

  const handleSeatSelect = (seat) => {
    if (seat.is_reserved) return; // Нельзя выбрать зарезервированное место
    
    setSelectedSeats(prevSelectedSeats => {
      // Если место уже выбрано, удалить его из выбранных
      if (prevSelectedSeats.includes(seat.id)) {
        return prevSelectedSeats.filter(id => id !== seat.id);
      } 
      // Если выбрано максимальное количество мест и пытаемся выбрать ещё одно - показать предупреждение
      else if (prevSelectedSeats.length >= MAX_SEATS) {
        alert(`You cannot select more than ${MAX_SEATS} seats at once`);
        return prevSelectedSeats;
      } 
      // Добавить место к выбранным
      else {
        return [...prevSelectedSeats, seat.id];
      }
    });
  };

  const handleConfirmSelection = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    try {
      const response = await api.post('/reservations/', {
        showtime_id: parseInt(showtimeId),
        seat_ids: selectedSeats  // Отправляем массив ID мест
      });
      
      navigate(`/checkout/${response.data.id}`);
    } catch (err) {
      setError('Failed to reserve the seats. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  // Group seats by row for better display
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  // Расчет общей стоимости
  const totalPrice = showtimeDetails ? (showtimeDetails.price * selectedSeats.length) : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Select Your Seats</h1>
      
      {showtimeDetails && (
        <div className="mb-8 bg-gray-100 p-4 rounded-lg">
          <p className="font-bold">{showtimeDetails.movie?.title}</p>
          <p>Hall: {showtimeDetails.hall?.name}</p>
          <p>Time: {new Date(showtimeDetails.start_time).toLocaleString()}</p>
          <p>Price per seat: ${showtimeDetails.price}</p>
          <p className="font-semibold mt-2">
            Selected: {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'}
          </p>
          {selectedSeats.length > 0 && (
            <p className="font-bold text-blue-600">Total: ${totalPrice.toFixed(2)}</p>
          )}
        </div>
      )}
      
      <div className="mb-8">
        <div className="w-full max-w-2xl mx-auto bg-gray-200 p-6 rounded-lg">
          <div className="mb-6 text-center">
            <div className="w-1/2 h-2 bg-gray-400 mx-auto mb-6 rounded"></div>
            <p className="text-sm text-gray-600">SCREEN</p>
          </div>
          
          <div className="space-y-4">
            {Object.keys(seatsByRow).sort((a, b) => a - b).map(rowNum => (
              <div key={rowNum} className="flex justify-center space-x-2">
                <div className="w-6 flex items-center justify-center text-gray-600">{rowNum}</div>
                <div className="flex space-x-2">
                  {seatsByRow[rowNum]
                    .sort((a, b) => a.number - b.number)
                    .map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatSelect(seat)}
                        disabled={seat.is_reserved}
                        className={`
                          w-10 h-10 rounded-t-lg flex items-center justify-center
                          ${seat.is_reserved 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : selectedSeats.includes(seat.id)
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-100 hover:bg-blue-200'
                          }
                        `}
                      >
                        {seat.number}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center mb-8 space-x-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-100 mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-green-500 mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-400 mr-2"></div>
          <span>Reserved</span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleConfirmSelection}
          disabled={selectedSeats.length === 0}
          className={`
            py-2 px-6 rounded font-bold
            ${selectedSeats.length > 0 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {selectedSeats.length > 0 
            ? `Confirm Selection (${selectedSeats.length} ${selectedSeats.length === 1 ? 'seat' : 'seats'})` 
            : 'Select at least one seat'
          }
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
