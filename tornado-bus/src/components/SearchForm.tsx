import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  searchOriginCities,
  City,
  searchDestinationCities,
} from "../services/api";
import { searchSchema } from "../utils/validation";

const SearchForm: React.FC = () => {
  const [originCities, setOriginCities] = useState<City[]>([]);
  const [showOriginList, setShowOriginList] = useState<boolean>(false);
  const [destinationCities, setDestinationCities] = useState<City[]>([]);
  const [showDestinationList, setShowDestinationList] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<{
    origin: string;
    destination: string;
    date: string;
    passengers: number;
  } | null>(null);

  const handleSearchOrigin = async (value: string) => {
    const cities = await searchOriginCities(value);
    setOriginCities(cities);
  };

  const handleSearchDestination = async (cityInitId: number, value: string) => {
    const cities = await searchDestinationCities(cityInitId, value);
    setDestinationCities(cities);
  };

  return (
    <div>
      <Formik
        initialValues={{ origin: "", destination: "", date: "", passengers: 1 }}
        validationSchema={searchSchema}
        onSubmit={(values) => {
          setFormValues(values);
          console.log(values, "VALUESSS");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4 relative">
              <label htmlFor="origin" className="block text-gray-700 font-bold mb-2">
                Ciudad origen:
              </label>
              <Field
                className="w-full p-2.5 border border-gray-300 rounded"
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
                className="w-full p-2 text-base border border-gray-300 rounded"
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
                      handleSearchDestination(originCity.id, e.target.value); // Buscar ciudades de destino mientras el usuario escribe
                    }
                  }
                }}
                onBlur={() =>
                  setTimeout(() => setShowDestinationList(false), 200)
                } // Ocultar la lista al perder el foco
              />
              <ErrorMessage
                name="destination"
                component="div"
                className="text-red-500 text-sm"
              />
              {/* Mostrar la lista de ciudades de destino sugeridas */}
              {showDestinationList && destinationCities.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-md list-none m-0 p-0 z-50 max-h-[250px] overflow-y-auto focus:ring-2 focus:ring-blue-500 select-none">
                  {destinationCities.map((city) => (
                    <li
                      key={city.id}
                      onClick={() => {
                        setFieldValue("destination", city.name); // Actualizar el valor en Formik
                        setShowDestinationList(false); // Ocultar la lista después de seleccionar
                      }}
                      className="p-2.5 cursor-pointer hover:bg-gray-100 border-b border-gray-200 focus:ring-2 focus:ring-blue-500 select-none"
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
  
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
  
            <div>
              <Field
                name="passengers"
                type="number"
                className="w-full p-2.5 text-base border border-gray-300 rounded"
              />
              <ErrorMessage
                name="passengers"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
  
            <button type="submit" className="w-full bg-blue-500 text-white p-2.5 rounded hover:bg-blue-600">
              Buscar
            </button>
          </Form>
        )}
      </Formik>
  
  {formValues && (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <p><strong>Origen:</strong> {formValues.origin}</p>
      <p><strong>Destino:</strong> {formValues.destination}</p>
      <p><strong>Fecha:</strong> {formValues.date}</p>
      <p><strong>Pasajeros:</strong> {formValues.passengers}</p>
    </div>
  )}
    </div>
  );
};

export default SearchForm;
