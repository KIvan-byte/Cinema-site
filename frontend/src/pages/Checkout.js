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
        // Note: You'll need to create this endpoint in your backend
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
      // In a real app, you'd integrate with a payment gateway
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
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!reservation) {
    return <div className="text-center py-10 text-red-600">Reservation not found</div>;
  }

  // Расчет общей стоимости
  const totalPrice = reservation.showtime.price * reservation.seats.length;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="font-bold text-lg">Order Summary</h2>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <p className="text-gray-600">Movie:</p>
            <p className="font-semibold">{reservation.showtime?.movie?.title}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Date & Time:</p>
            <p className="font-semibold">
              {new Date(reservation.showtime?.start_time).toLocaleString()}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Seats:</p>
            <p className="font-semibold">
              {reservation.seats.map(seat => `Row ${seat.row}, Seat ${seat.number}`).join(', ')}
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <p className="font-bold">Total Amount:</p>
              <p className="font-bold">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="font-bold text-lg">Payment Method</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={paymentMethod === 'credit_card'}
                onChange={() => setPaymentMethod('credit_card')}
                className="h-5 w-5 text-blue-600"
              />
              <span>Credit Card</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
                className="h-5 w-5 text-blue-600"
              />
              <span>PayPal</span>
            </label>
          </div>

          {paymentMethod === 'credit_card' && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Expiration Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
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
            py-3 px-8 rounded-lg font-bold text-white
            ${processing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
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
