import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const SeatSelection = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtimeDetails, setShowtimeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const MAX_SEATS = 5;

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
    if (seat.is_reserved) return;
    
    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seat.id)) {
        return prevSelectedSeats.filter(id => id !== seat.id);
      } 
      else if (prevSelectedSeats.length >= MAX_SEATS) {
        alert(`You cannot select more than ${MAX_SEATS} seats at once`);
        return prevSelectedSeats;
      } 
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
        seat_ids: selectedSeats
      });
      
      navigate(`/checkout/${response.data.id}`);
    } catch (err) {
      setError('Failed to reserve the seats. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 px-4">
        <div className="bg-red-100 border border-cinema-red text-cinema-red-dark p-4 rounded-lg inline-block">
          {error}
        </div>
      </div>
    );
  }

  // Group seats by row for better display
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const totalPrice = showtimeDetails ? (showtimeDetails.price * selectedSeats.length) : 0;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-cinema-black">Select Your Seats</h1>
      
      {showtimeDetails && (
        <div className="mb-8 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="font-bold text-xl mb-2 text-cinema-black">{showtimeDetails.movie?.title}</h2>
              <p className="text-cinema-gray mb-1">Hall: {showtimeDetails.hall?.name}</p>
              <p className="text-cinema-gray">Time: {new Date(showtimeDetails.start_time).toLocaleString()}</p>
            </div>
            
            <div className="mt-4 md:mt-0 md:text-right">
              <p className="text-cinema-gray mb-1">Price per seat: 
                <span className="font-semibold text-cinema-black ml-1">${showtimeDetails.price}</span>
              </p>
              <p className="font-semibold mt-2 text-cinema-black">
                Selected: {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'}
              </p>
              {selectedSeats.length > 0 && (
                <p className="font-bold text-lg text-cinema-red-dark">Total: ${totalPrice.toFixed(2)}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <div className="mb-8 text-center">
            <div className="w-2/3 h-2 bg-cinema-red-dark mx-auto mb-6 rounded"></div>
            <p className="text-sm text-cinema-gray uppercase">SCREEN</p>
          </div>
          
          <div className="space-y-4 mt-10">
            {Object.keys(seatsByRow).sort((a, b) => a - b).map(rowNum => (
              <div key={rowNum} className="flex justify-center space-x-2">
                <div className="w-8 flex items-center justify-center text-cinema-gray-light bg-cinema-gray rounded-l-lg">
                  {rowNum}
                </div>
                <div className="flex space-x-2">
                  {seatsByRow[rowNum]
                    .sort((a, b) => a.number - b.number)
                    .map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatSelect(seat)}
                        disabled={seat.is_reserved}
                        className={`
                          w-10 h-10 flex items-center justify-center rounded transition-all
                          ${seat.is_reserved 
                            ? 'bg-cinema-gray text-white cursor-not-allowed' 
                            : selectedSeats.includes(seat.id)
                              ? 'bg-cinema-red-dark text-white shadow-md scale-105 hover:bg-cinema-red'
                              : 'bg-cinema-gray-light hover:bg-cinema-red-light'
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
          <div className="w-6 h-6 bg-cinema-gray-light mr-2 rounded"></div>
          <span className="text-cinema-black">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-cinema-red-dark text-white mr-2 rounded flex items-center justify-center">
            <span className="text-xs">✓</span>
          </div>
          <span className="text-cinema-black">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-cinema-gray mr-2 rounded"></div>
          <span className="text-cinema-black">Reserved</span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleConfirmSelection}
          disabled={selectedSeats.length === 0}
          className={`
            py-3 px-8 rounded-lg font-bold transition-colors
            ${selectedSeats.length > 0 
              ? 'bg-cinema-red-dark text-white hover:bg-cinema-red shadow-lg' 
              : 'bg-cinema-gray text-white cursor-not-allowed'
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
