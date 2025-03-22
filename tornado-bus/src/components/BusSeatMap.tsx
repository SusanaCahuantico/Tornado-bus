import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addSelectedSeat, removeSelectedSeat } from '../redux/tripSlice';
import { Seat } from '../services/api';

const BusSeatMap: React.FC = () => {
  const dispatch = useAppDispatch();
  const { busLayout, selectedSeats } = useAppSelector((state) => state.trips);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'Disponible') {
      if (selectedSeats.some((s) => s.id === seat.id)) {
        dispatch(removeSelectedSeat(seat.id));
      } else {
        dispatch(addSelectedSeat(seat));
      }
    }
  };

  if (!busLayout) return <div>No hay asientos disponibles.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Selecciona tus asientos</h2>
      <div className="grid grid-cols-5 gap-2">
        {busLayout.map((seat) => (
          <div
            key={seat.id}
            onClick={() => handleSeatClick(seat)}
            className={`p-2 border rounded ${
              seat.status === 'Disponible'
                ? 'bg-green-200 cursor-pointer'
                : 'bg-red-200 cursor-not-allowed'
            } ${selectedSeats.some((s) => s.id === seat.id) ? 'bg-blue-200' : ''}`}
          >
            {seat.seat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusSeatMap;