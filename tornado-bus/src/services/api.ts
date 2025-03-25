import axios from 'axios';

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
  amount: number;
  companyName: string;
  companyLogo: string;
  currency: string;
}

export interface Seat {
  id: number;
  row: number;
  column: number;
  seat: number;
  status: string;
  colorGroup: string;
}

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
  try {
    const response = await axios.get('https://api.local.onroadts.com/v1/web/select/type');
    
    if (!response.data?.data) {
      throw new Error('Estructura de respuesta inválida');
    }
    
    return response.data.data.map((item: any) => ({
      id: Number(item.id) || 0,
      name: item.name || 'Desconocido',
      ageMin: Number(item.ageMin) || 0,
      ageMax: Number(item.ageMax) || 0
    }));
  } catch (error) {
    console.error('Error al obtener tipos de pasajero:', error);
    return [];
  }
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

export const markSeat = async (
  seatId: number,
  ticketTypeId: number,
  cityInitId: number,
  cityEndId: number,
  itineraryID: number,
  ticketSessionId: number | null = null) => {
  const response = await axios.put('/list/seats/mark', {
    tickeTypeID: ticketTypeId,
    ticketSessionId,
    cityInitID: cityInitId,
    cityEndID: cityEndId,
    itineraryID,
    busPlaceID: [seatId],
    tempTicketId: null,
    ticketRef: null,
    idMulti: null,
    isReturn: false,
    currencyID: 567,
    mDestiny: null,
    mOrigin: null,
    mRow: null,
    timeZone: 'America/Lima',
    externalInitID: null,
    externalEndID: null,
  });

  return response.data;
};

export const getShoppingCart = async (ticketSessionId: number): Promise<any> => {
  const response = await axios.get(
    `/list/shopping-cart/${ticketSessionId}`
  );
  return response.data;
};

export default api;