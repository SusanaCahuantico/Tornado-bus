import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tornadobus.com',
});

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  price: number;
}

export const searchTrips = async (origin: string, destination: string, date: string): Promise<Trip[]> => {
  const response = await api.get('/trips', {
    params: { origin, destination, date },
  });
  return response.data;
};

export const getTripDetails = async (tripId: string): Promise<Trip> => {
  const response = await api.get(`/trips/${tripId}`);
  return response.data;
};