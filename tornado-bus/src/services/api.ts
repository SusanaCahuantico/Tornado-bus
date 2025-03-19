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

export const searchOriginCities = async (value: string): Promise<City[]> => {
  const response = await api.post('/select/origin', { value });
  return response.data.data;
};

export const searchDestinationCities = async (cityInitId: number, value: string): Promise<City[]> => {
  const response = await api.post(`/select/destiny/${cityInitId}`, { value });
  return response.data.data;
};


export default api;