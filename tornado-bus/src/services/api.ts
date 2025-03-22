import axios from 'axios';

// Configuración base de axios
const api = axios.create({
  baseURL: 'https://discovery.local.onroadts.com/v1/web',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export interface City {
  id: number;
  name: string;

  key?: string;
  cityAbrev?: string;
  abrev?: string;
}

// Interfaz para el viaje
export interface Trip {
  id: number;
  dateInitFormat: string;
  HourInitFormat: string;
  dateEndFormat: string;
  HourEndFormat: string;
  travelTime: string;
  cityInitID: number;
  cityInit: string;
  cityEndID: number;
  cityEnd: string;
  addressInit: string;
  totalSeats: number;
  totalNivel: number;
  amount: string;
  companyName: string;
  companyLogo: string;
  currency: string;
}

// Interfaz para el asiento
export interface Seat {
  id: number;
  row: number;
  column: number;
  seat: number;
  status: string;
  colorGroup: string;
}

// Interfaz para el tipo de pasajero
export interface PassengerType {
  id: number;
  name: string;
  ageMin: number;
  ageMax: number;
}

export const searchOriginCities = async (value: string): Promise<City[]> => {
  const response = await api.post('/select/origin', { value });
  return response.data.data;
};

export const searchDestinationCities = async (cityInitId: number, value: string): Promise<City[]> => {
  const response = await api.post(`/select/destiny/${cityInitId}`, { value });
  return response.data.data;
};

export const getPassengerTypes = async (): Promise<PassengerType[]> => {
  const response = await axios.get('https://api.local.onroadts.com/v1/web/select/type');
  return response.data.data; // Asegúrate de que response.data.data sea un array
};

export const fetchTrips = async (
  originId: number,
  destinationId: number,
  date: string,
  passengers: number
) => {
  const response = await api.post("/list/departure-travels?isMultiRoute=true&isReturn=false", {
    limit: 25,
    page: 1,
    filters: {
      date,
      city: [originId, destinationId],
      passengerNumber: passengers,
      passengerDisabilityNumber: 0,
      orderTravel: 1060,
      orderMaxMinTravel: 1,
      isPoint: false,
      currencyID: 567,
      externalInitId: 0,
      externalEndId: 0,
      routeID: null,
      _rowId: null,
    },
  });
  return response.data.data;
};

export const getAvailableSeats = async (
  travelId: number,
  cityInitId: number,
  cityEndId: number
): Promise<Seat[]> => {
  const response = await axios.get(
    `/list/seats/${travelId}/${cityInitId}/${cityEndId}`
  );
  return response.data.data;
};



export default api;