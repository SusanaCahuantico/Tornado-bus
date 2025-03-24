import React from "react";
import { Trip } from "../services/api";

interface TripItemProps {
  trip: Trip;
  onSelect: (trip: Trip) => void;
}

const TripItem: React.FC<TripItemProps> = ({ trip, onSelect }) => {
  return (
    <div className="p-4 border-b">
      <h3 className="font-semibold">{trip.cityInit} → {trip.cityEnd}</h3>
      <p>Fecha de salida: {trip.dateInitFormat} a las {trip.HourInitFormat}</p>
      <p>Fecha de llegada: {trip.dateEndFormat} a las {trip.HourEndFormat}</p>
      <p>Precio: ${trip.amount}</p>
      <p>Compañía: {trip.companyName}</p>
      <img
        src="https://tornadobus.com/wp-content/uploads/2022/07/Recurso-3.svg"
        alt={`Logo de Tornado`}
        className="w-20 h-20 mx-auto"
      />
      <button
      type="button"
        onClick={() => onSelect(trip)}
        className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Seleccionar
      </button>
    </div>
  );
};

export default TripItem;