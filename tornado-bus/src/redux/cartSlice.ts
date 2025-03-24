import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  selectedSeats: string[];
  total: number;
}

const initialState: CartState = {
  selectedSeats: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addSeat: (state, action: PayloadAction<string>) => {
      state.selectedSeats.push(action.payload);
    },
    removeSeat: (state, action: PayloadAction<string>) => {
      state.selectedSeats = state.selectedSeats.filter(seat => seat !== action.payload);
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const { addSeat, removeSeat, setTotal } = cartSlice.actions;
export default cartSlice.reducer;