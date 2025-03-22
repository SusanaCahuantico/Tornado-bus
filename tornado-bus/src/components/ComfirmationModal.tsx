import React from 'react';
import { useAppSelector } from '../redux/hooks';

const ConfirmationModal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => {
  const { selectedSeats, selectedTrip } = useAppSelector((state) => state.trips);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Confirmar Compra</h2>
        <p>Viaje: {selectedTrip?.cityInit} → {selectedTrip?.cityEnd}</p>
        <p>Asientos seleccionados: {selectedSeats.map((seat) => seat.seat).join(', ')}</p>
        <p>Total a pagar: ${selectedTrip ? selectedTrip.amount * selectedSeats.length : 0}</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onCancel} className="mr-2 p-2 bg-gray-500 text-white rounded">
            Cancelar
          </button>
          <button onClick={onConfirm} className="p-2 bg-blue-500 text-white rounded">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;