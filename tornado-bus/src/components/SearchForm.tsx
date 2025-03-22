import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { searchOriginCities, City, searchDestinationCities, fetchTrips } from "../services/api";
import { searchSchema } from "../utils/validation";
import { useAppDispatch } from "../redux/hooks";
import { setAvailableTrips } from "../redux/tripSlice";
import PassengerSelector from './PassengerSelector';

const SearchForm: React.FC = () => {
  const [originCities, setOriginCities] = useState<City[]>([]);
  const [showOriginList, setShowOriginList] = useState<boolean>(false);
  const [destinationCities, setDestinationCities] = useState<City[]>([]);
  const [showDestinationList, setShowDestinationList] = useState<boolean>(false);
  const [passengers, setPassengers] = useState<{ [Key: number]: number}>({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleSearchOrigin = async (value: string) => {
    const cities = await searchOriginCities(value);
    setOriginCities(cities);
  };

  const handleSearchDestination = async (cityInitId: number, value: string) => {
    const cities = await searchDestinationCities(cityInitId, value);
    setDestinationCities(cities);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const originCity = originCities.find((city) => city.name === values.origin);
      const destinationCity = destinationCities.find((city) => city.name === values.destination);

      if (!originCity || !destinationCity) {
        throw new Error("No se encontraron las ciudades seleccionadas.");
      }

      const formattedDate = new Date(values.date).toISOString().split('T')[0];
            const totalPassengers = Object.values(passengers).reduce((acc, count) => acc + count, 0);

            const trips = await fetchTrips(originCity.id, destinationCity.id, formattedDate, totalPassengers);

      dispatch(setAvailableTrips(trips));
    } catch (error) {
      console.error("Error al buscar viajes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ origin: "", destination: "", date: "", passengers: 1 }}
        validationSchema={searchSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, validateField }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4 relative">
              <label htmlFor="origin" className="block text-gray-700 font-bold mb-2">
                Ciudad origen:
              </label>
              <Field
                className="w-full p-2.5 border border-gray-300 rounded focus:outline-none"
                name="origin"
                placeholder="Ciudad origen"
                onFocus={async () => {
                  await handleSearchOrigin("");
                  setShowOriginList(true);
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("origin", e.target.value);
                  handleSearchOrigin(e.target.value);
                }}
                onBlur={() => setTimeout(() => setShowOriginList(false), 200)}
              />
              <ErrorMessage
                name="origin"
                component="div"
                className="text-red-500 text-sm"
              />
              {showOriginList && originCities.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-md list-none m-0 p-0 z-50 max-h-[250px] overflow-y-auto">
                  {originCities.map((city) => (
                    <li
                      key={city.id}
                      onClick={() => {
                        setFieldValue("origin", city.name);
                        setShowOriginList(false);
                        validateField("origin");
                      }}
                      className="p-2.5 cursor-pointer hover:bg-gray-100 border-b border-gray-200 focus:ring-2 focus:ring-blue-500 select-none"
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="origin"
                className="block text-gray-700 font-bold mb-2"
              >
                Ciudad destino:
              </label>
              <Field
                name="destination"
                placeholder="Ciudad destino"
                className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none"
                onFocus={async () => {
                  if (values.origin) {
                    const originCity = originCities.find(
                      (city) => city.name === values.origin
                    );
                    if (originCity) {
                      await handleSearchDestination(originCity.id, "");
                      setShowDestinationList(true);
                    }
                  }
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("destination", e.target.value);
                  if (values.origin) {
                    const originCity = originCities.find(
                      (city) => city.name === values.origin
                    );
                    if (originCity) {
                      handleSearchDestination(originCity.id, e.target.value);
                    }
                  }
                }}
                onBlur={() =>
                  setTimeout(() => setShowDestinationList(false), 200)
                }
              />
              <ErrorMessage
                name="destination"
                component="div"
                className="text-red-500 text-sm"
              />
              {showDestinationList && destinationCities.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-md list-none m-0 p-0 z-50 max-h-[250px] overflow-y-auto focus:ring-2 focus:ring-blue-500 select-none">
                  {destinationCities
                    .filter((city) => city.name !== values.origin)
                    .map((city) => (
                      <li
                        key={city.id}
                        onClick={() => {
                          setFieldValue("destination", city.name);
                          setShowDestinationList(false);
                        }}
                        className="p-2.5 cursor-pointer hover:bg-gray-100 border-b border-gray-200 focus:ring-2 focus:ring-blue-500 select-none"
                      >
                        {city.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>

             <PassengerSelector onPassengersChange={setPassengers} />

            <div>
              <Field
                name="date"
                type="date"
                className="text-blue-500 text-sm m-2"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2.5 rounded hover:bg-blue-600" disabled={isLoading}>
              {isLoading ? "Buscando..." : "Buscar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;