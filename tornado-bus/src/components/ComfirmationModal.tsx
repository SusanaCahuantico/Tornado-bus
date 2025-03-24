import React from 'react';
import { useAppSelector } from '../redux/hooks';

interface ConfirmationModalProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isProcessing: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  onConfirm, 
  onCancel,
  isProcessing 
}) => {
  const { selectedSeats, selectedTrip, passengerTypes } = useAppSelector((state) => state.trips);
  
  const totalPassengers = Object.values(passengerTypes).reduce((acc, count) => acc + count, 0);
  console.loh("TOTAL PASSENGER", totalPassengers)
  const totalPrice = selectedTrip ? selectedTrip.amount * selectedSeats.length : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 p-4 text-white">
          <h2 className="text-xl font-bold">Confirmar Compra</h2>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Detalles del Viaje</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Ruta:</span> {selectedTrip?.cityInit} → {selectedTrip?.cityEnd}</p>
              <p><span className="font-medium">Fecha:</span> {selectedTrip?.dateInitFormat}</p>
              <p><span className="font-medium">Hora:</span> {selectedTrip?.HourInitFormat}</p>
              <p><span className="font-medium">Empresa:</span> {selectedTrip?.companyName}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Asientos Seleccionados</h3>
            <div className="grid grid-cols-3 gap-2">
              {selectedSeats.map((seat) => (
                <div key={seat.id} className="bg-blue-100 text-blue-800 p-2 rounded text-center">
                  Asiento {seat.seat}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {selectedSeats.length} de {totalPassengers} asientos seleccionados
            </p>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total a pagar:</span>
              <span className="text-xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
          type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isProcessing || selectedSeats.length !== totalPassengers}
            className={`px-4 py-2 rounded-md text-white ${selectedSeats.length === totalPassengers ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} disabled:opacity-50`}
          >
            {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;