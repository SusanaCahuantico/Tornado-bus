import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addSelectedSeat, removeSelectedSeat } from '../redux/tripSlice';
import { Seat } from '../services/api';
import axios from 'axios';

interface BusSeatMapProps {
  travelId: number;
  cityInitId: number;
  cityEndId: number;
  seats: Seat[];
  onSeatSelect: (seatNumber: number) => void;
}

interface SelectionModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const SelectionModal: React.FC<SelectionModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <div className="mb-4">
          <p className="text-gray-800">{message}</p>
        </div>
        <div className="flex justify-end">
          <button
          type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

const BusSeatMap: React.FC<BusSeatMapProps> = ({ travelId, cityInitId, cityEndId }) => {
  const dispatch = useAppDispatch();
  const { selectedSeats, passengerCounts, passengerTypesList } = useAppSelector((state) => state.trips);
  const [busLayout, setBusLayout] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState({
    isOpen: false,
    message: '',
  });

  React.useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.local.onroadts.com/v1/web/list/seats/${travelId}/${cityInitId}/${cityEndId}`
        );
        
        if (response.data.statusCode === 200) {
          const allSeats = response.data.data.flatMap((level: any) => level.seats);
          setBusLayout(allSeats.filter((seat: Seat) => seat.seat > 0));
        } else {
          setError("No se pudieron cargar los asientos");
        }
      } catch (err) {
        setError("Error al cargar los asientos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (travelId && cityInitId && cityEndId) {
      fetchSeats();
    }
  }, [travelId, cityInitId, cityEndId]);
  
  const totalPassengers = Object.values(passengerCounts).reduce((sum, count) => sum + count, 0);
  const handleSeatClick = (seat: Seat) => {
    if (seat.status !== 'Disponible') return;

    const isSelected = selectedSeats.some(s => s.id === seat.id);
    if (isSelected) {
      dispatch(removeSelectedSeat(seat.id));
      return;
    }

    if (totalPassengers <= 0) {
      alert("Por favor selecciona al menos un pasajero primero");
      return;
    }

    if (selectedSeats.length >= totalPassengers) {
      alert(`Solo puedes seleccionar ${totalPassengers} asientos`);
      return;
    }

    dispatch(addSelectedSeat(seat));
  };

  const getSeatStatus = (seat: Seat) => {
    if (selectedSeats.some(s => s.id === seat.id)) return 'selected';
    if (seat.status !== 'Disponible') return 'occupied';
    return 'available';
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  if (loading) return <div className="text-center py-8">Cargando asientos...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!busLayout.length) return <div className="text-center py-8">No hay asientos disponibles.</div>;

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Selecciona tus asientos</h2>
        
        <div className="driver-area mb-6 p-3 bg-gray-100 rounded-lg text-center">
          <span className="font-medium">Área del conductor</span>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {busLayout.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.status !== 'Disponible'}
              className={`relative p-4 rounded-lg flex items-center justify-center transition-all duration-200 ${
                getSeatStatus(seat) === 'selected'
                  ? 'bg-blue-500 text-white shadow-md transform scale-105'
                  : getSeatStatus(seat) === 'occupied'
                    ? 'bg-red-400 text-white cursor-not-allowed'
                    : 'bg-green-100 hover:bg-green-200 cursor-pointer'
              }`}
              style={{ backgroundColor: seat.colorGroup || '' }}
            >
              <span className="seat-number absolute top-1 left-1 text-xs">{seat.seat}</span>
              <span className="font-medium">{seat.seat}</span>
              <span className="seat-type absolute bottom-1 right-1 text-xs">
                {seat.status === 'Disponible' ? 'Disponible' : 'Ocupado'}
              </span>
            </button>
          ))}
        </div>
        
        <div className="seat-legend flex justify-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-400"></div>
            <span>Ocupado</span>
          </div>
        </div>
      </div>

      <SelectionModal
        isOpen={modal.isOpen}
        message={modal.message}
        onClose={closeModal}
      />
    </>
  );
};

export default BusSeatMap;