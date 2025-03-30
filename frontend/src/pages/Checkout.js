import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await api.get(`/reservations/${reservationId}`);
        setReservation(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reservation details');
        setLoading(false);
      }
    };

    fetchReservation();
  }, [reservationId]);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      // This is just a simulation of payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update reservation status to completed
      await api.patch(`/reservations/${reservationId}`, {
        payment_status: 'completed'
      });
      
      navigate('/profile', { state: { paymentSuccess: true } });
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      setProcessing(false);
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

  if (!reservation) {
    return (
      <div className="text-center py-10">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-lg inline-block">
          Reservation not found
        </div>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = reservation.showtime.price * reservation.seats.length;

  return (
    <div className="container mx-auto max-w-xl px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-cinema-black">Checkout</h1>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-cinema-red to-cinema-red-dark text-white p-5">
          <h2 className="font-bold text-xl">Order Summary</h2>
        </div>
        <div className="p-5">
          <div className="mb-4">
            <p className="text-cinema-gray mb-1">Movie:</p>
            <p className="font-semibold text-cinema-black">{reservation.showtime?.movie?.title}</p>
          </div>
          <div className="mb-4">
            <p className="text-cinema-gray mb-1">Date & Time:</p>
            <p className="font-semibold text-cinema-black">
              {new Date(reservation.showtime?.start_time).toLocaleString()}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-cinema-gray mb-1">Seats:</p>
            <p className="font-semibold text-cinema-black">
              {reservation.seats.map(seat => `Row ${seat.row}, Seat ${seat.number}`).join(', ')}
            </p>
          </div>
          <div className="pt-4 border-t border-cinema-gray-light">
            <div className="flex justify-between">
              <p className="font-bold text-cinema-black">Total Amount:</p>
              <p className="font-bold text-cinema-red-dark">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-cinema-red to-cinema-red-dark text-white p-5">
          <h2 className="font-bold text-xl">Payment Method</h2>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-2 rounded hover:bg-cinema-gray-light cursor-pointer transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={paymentMethod === 'credit_card'}
                onChange={() => setPaymentMethod('credit_card')}
                className="h-5 w-5 text-cinema-red-dark"
              />
              <span className="text-cinema-black">Credit Card</span>
            </label>

            <label className="flex items-center space-x-3 p-2 rounded hover:bg-cinema-gray-light cursor-pointer transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
                className="h-5 w-5 text-cinema-red-dark"
              />
              <span className="text-cinema-black">PayPal</span>
            </label>
          </div>

          {paymentMethod === 'credit_card' && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-cinema-black mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-cinema-gray-light rounded-lg focus:ring-2 focus:ring-cinema-red-light focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-cinema-black mb-2">Expiration Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-cinema-gray-light rounded-lg focus:ring-2 focus:ring-cinema-red-light focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-cinema-black mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-cinema-gray-light rounded-lg focus:ring-2 focus:ring-cinema-red-light focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handlePayment}
          disabled={processing}
          className={`
            py-3 px-10 rounded-lg font-bold text-white text-lg transition-colors
            ${processing 
              ? 'bg-cinema-gray cursor-not-allowed' 
              : 'bg-cinema-red-dark hover:bg-cinema-red shadow-lg'
            }
          `}
        >
          {processing ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
