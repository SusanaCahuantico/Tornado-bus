import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

const initialState: SearchState = {
  origin: '',
  destination: '',
  date: '',
  passengers: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<SearchState>) => {
      state.origin = action.payload.origin;
      state.destination = action.payload.destination;
      state.date = action.payload.date;
      state.passengers = action.payload.passengers;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;