import { createSlice,type PayloadAction } from "@reduxjs/toolkit";


interface ExchangeRateState {
  exchangeRate: number;
}


const initialState: ExchangeRateState = {
  exchangeRate: 0, 
};

const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState,
  reducers: {
    setExchangeRate: (state, action: PayloadAction<number>) => {
      state.exchangeRate = action.payload;
    },
  },
});


export const { setExchangeRate } = exchangeRateSlice.actions;
export default exchangeRateSlice.reducer;