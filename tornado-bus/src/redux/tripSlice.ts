import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trip, Seat, PassengerType } from "../services/api";

interface TripState {
  availableTrips: Trip[];
  selectedTrip: Trip | null;
  busLayout: Seat[] | null;
  selectedSeats: Seat[];
  passengerCounts: Record<number, number>;
  passengerTypesList: PassengerType[];
}

const initialState: TripState = {
  availableTrips: [],
  selectedTrip: null,
  busLayout: null,
  selectedSeats: [],
  passengerCounts: {},
  passengerTypesList: [],
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
      state.selectedSeats = [];
    },
    setBusLayout(state, action: PayloadAction<Seat[]>) {
      state.busLayout = action.payload;
    },
    addSelectedSeat(state, action: PayloadAction<Seat>) {
      const totalPassengers = Object.values(state.passengerCounts).reduce((sum, count) => sum + count, 0);
      if (state.selectedSeats.length < totalPassengers) {
        state.selectedSeats.push(action.payload);
      }
    },
    removeSelectedSeat(state, action: PayloadAction<number>) {
      state.selectedSeats = state.selectedSeats.filter((seat) => seat.id !== action.payload);
    },
    setPassengerTypes(state, action: PayloadAction<PassengerType[]>) {
      state.passengerTypesList = action.payload;
      if (Object.keys(state.passengerCounts).length === 0) {
        state.passengerCounts = action.payload.reduce((acc, type) => {
          acc[type.id] = 0;
          return acc;
        }, {} as Record<number, number>);
      }
    },
    updatePassengerCount(state, action: PayloadAction<{typeId: number, count: number}>) {
      const { typeId, count } = action.payload;
      state.passengerCounts[typeId] = Math.max(0, count);
      
      const totalPassengers = Object.values(state.passengerCounts).reduce((sum, c) => sum + c, 0);
      if (state.selectedSeats.length > totalPassengers) {
        state.selectedSeats = state.selectedSeats.slice(0, totalPassengers);
      }
    },
    clearSelection(state) {
      state.selectedSeats = [];
    }
  },
});

export const {
  setAvailableTrips,
  setSelectedTrip,
  setBusLayout,
  addSelectedSeat,
  removeSelectedSeat,
  setPassengerTypes,
  updatePassengerCount,
  clearSelection
} = tripSlice.actions;

export default tripSlice.reducer;