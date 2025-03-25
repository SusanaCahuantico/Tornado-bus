import React, { useEffect, useState } from "react";
import { getPassengerTypes } from "../services/api";
import { PassengerType } from "../services/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updatePassengerCount } from "../redux/tripSlice";

interface PassengerSelectorProps {
  onPassengersChange: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}
const PassengerSelector: React.FC<PassengerSelectorProps> = () => {
  const dispatch = useAppDispatch();
  const [passengerTypes, setPassengerTypes] = useState<PassengerType[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchPassengerTypes = async () => {
      try {
        const types = await getPassengerTypes();
        setPassengerTypes(types);
        
        types.forEach(type => {
          dispatch(updatePassengerCount({ typeId: type.id, count: 0 }));
        });
        
        setInitialized(true);
      } catch (error) {
        console.error("Error loading passenger types:", error);
      }
    };

    fetchPassengerTypes();
  }, [dispatch]);

  const handleCountChange = (typeId: number, change: number) => {
    dispatch(updatePassengerCount({ typeId, count: change }));
  };

  if (!initialized) return <div>Cargando tipos de pasajero...</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Selecciona tus pasajeros</h2>
      {passengerTypes.map((type) => (
        <div key={type.id} className="mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{type.name}</h3>
              <p className="text-sm text-gray-600">
                Edad: {type.ageMin}-{type.ageMax} años
              </p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleCountChange(type.id, -1)}
                className="px-3 py-1 bg-gray-200 rounded-l"
              >
                -
              </button>
              <span className="px-3 py-1 bg-gray-100">
                <PassengerCountDisplay typeId={type.id} />
              </span>
              <button
                type="button"
                onClick={() => handleCountChange(type.id, 1)}
                className="px-3 py-1 bg-gray-200 rounded-r"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const PassengerCountDisplay: React.FC<{ typeId: number }> = ({ typeId }) => {
  const count = useAppSelector((state) => state.trips.passengerCounts[typeId] || 0);
  return <>{count}</>;
};

export default PassengerSelector;