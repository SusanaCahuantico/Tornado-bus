import React, { useEffect, useState } from "react";
import { getPassengerTypes } from "../services/api";
import { PassengerType } from "../services/api";

const PassengerSelector: React.FC<{ onPassengersChange: (passengers: { [key: number]: number }) => void }> = ({ onPassengersChange }) => {
  const [passengerTypes, setPassengerTypes] = useState<PassengerType[]>([]);
  const [passengers, setPassengers] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    onPassengersChange(passengers);
  }, [passengers, onPassengersChange]);

  useEffect(() => {
    const fetchPassengerTypes = async () => {
      try {
        const types = await getPassengerTypes();

        if (!Array.isArray(types)) {
          setPassengerTypes([]);
          return;
        }

        setPassengerTypes(types);

        const initialPassengers = types.reduce((acc, type) => {
          acc[type.id] = 0;
          return acc;
        }, {} as { [key: number]: number });

        setPassengers(initialPassengers);
      } catch (error) {
        setPassengerTypes([]);
      }
    };

    fetchPassengerTypes();
  }, []);

  const handleIncrement = (typeId: number) => {
    setPassengers((prev) => {
      const newPassengers = { ...prev, [typeId]: prev[typeId] + 1 };
      return newPassengers;
    });
  };

  const handleDecrement = (typeId: number) => {
    setPassengers((prev) => {
      const newPassengers = { ...prev, [typeId]: Math.max(0, prev[typeId] - 1) };
      return newPassengers;
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Selecciona tus pasajeros</h2>
      {passengerTypes.length === 0 ? (
        <p>Cargando tipos de pasajeros...</p>
      ) : (
        passengerTypes.map((type) => (
          <div key={type.id} className="mb-4">
            <h3 className="font-semibold">{type.name}</h3>
            <p className="text-sm text-gray-600">
              Edad: {type.ageMin} - {type.ageMax} años
            </p>
            <div className="flex items-center mt-4">
              <button
              type="submit"
                onClick={() => handleDecrement(type.id)}
                className="p-2 border rounded-l bg-gray-100"
              >
                -
              </button>
              <span className="p-2 border-t border-b border-gray-300">
                {passengers[type.id]}
              </span>
              <button
              type="button"
                onClick={() => handleIncrement(type.id)}
                className="p-2 border rounded-r bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PassengerSelector;