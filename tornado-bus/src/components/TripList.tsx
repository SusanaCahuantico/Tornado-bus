import React from "react";
import { Trip } from "../services/api";
import TripItem from "./TripItem";

interface TripListProps {
  availableTrips: Trip[];
  hasSearched: boolean;
  onTripSelect: (trip: Trip) => void;
}

const TripList: React.FC<TripListProps> = ({ availableTrips, hasSearched, onTripSelect }) => {
  return (
    <div className="mt-4">
      {hasSearched && (
        <>
          <h2 className="text-xl font-bold mb-4">Viajes Disponibles</h2>
          {availableTrips.length > 0 ? (
            <ul className="text-center">
              {availableTrips.map((trip) => (
                <TripItem key={trip.id} trip={trip} onSelect={onTripSelect} />
              ))}
            </ul>
          ) : (
            <p>No hay viajes disponibles.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TripList;