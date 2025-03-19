import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Trip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  price: number;
}

interface TripState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}

const initialState: TripState = {
  trips: [],
  loading: false,
  error: null,
};

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrips: (state, action: PayloadAction<Trip[]>) => {
      state.trips = action.payload;
    },
  },
});

export const { setTrips } = tripSlice.actions;
export default tripSlice.reducer;