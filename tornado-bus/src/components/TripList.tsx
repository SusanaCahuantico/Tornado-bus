import React from "react";
import { Trip } from "../services/api";

interface TripListProps {
  availableTrips: Trip[];
  hasSearched: boolean;
}

const TripList: React.FC<TripListProps> = ({ availableTrips, hasSearched }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Viajes Disponibles</h2>
      {hasSearched ? (
        availableTrips.length > 0 ? (
          <ul className="text-center">
            {availableTrips.map((trip: Trip) => (
              <li key={trip.id} className="p-4 border-b">
                <h3>{trip.cityInit} → {trip.cityEnd}</h3>
                <p>Fecha de salida: {trip.dateInitFormat} a las {trip.HourInitFormat}</p>
                <p>Fecha de llegada: {trip.dateEndFormat} a las {trip.HourEndFormat}</p>
                <p>Precio: ${trip.amount}</p>
                <p>Compañía: {trip.companyName}</p>
                <img
                  src={trip.companyLogo}
                  alt={`Logo de ${trip.companyName}`}
                  className="w-20 h-20 mx-auto"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay viajes disponibles.</p>
        )
      ) : null}
    </div>
  );
};

export default TripList;