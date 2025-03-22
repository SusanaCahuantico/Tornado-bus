// src/redux/slices/tripSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trip, Seat, PassengerType } from "../services/api";

interface TripState {
  availableTrips: Trip[];
  selectedTrip: Trip | null;
  busLayout: Seat[] | null;
  selectedSeats: Seat[];
  passengerTypes: PassengerType[];
}

const initialState: TripState = {
  availableTrips: [],
  selectedTrip: null,
  busLayout: null,
  selectedSeats: [],
  passengerTypes: [],
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setAvailableTrips(state, action: PayloadAction<Trip[]>) {
      state.availableTrips = action.payload;
    },
    setSelectedTrip(state, action: PayloadAction<Trip>) {
      state.selectedTrip = action.payload;
    },
    setBusLayout(state, action: PayloadAction<Seat[]>) {
      state.busLayout = action.payload;
    },
    addSelectedSeat(state, action: PayloadAction<Seat>) {
      state.selectedSeats.push(action.payload);
    },
    removeSelectedSeat(state, action: PayloadAction<number>) {
      state.selectedSeats = state.selectedSeats.filter((seat) => seat.id !== action.payload );
    },
    setPassengerTypes(state, action: PayloadAction<PassengerType[]>) {
      state.passengerTypes = action.payload;
    },
  },
});

export const {
  setAvailableTrips,
  setSelectedTrip,
  setBusLayout,
  addSelectedSeat,
  removeSelectedSeat,
  setPassengerTypes,
} = tripSlice.actions;

export default tripSlice.reducer;