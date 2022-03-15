import { createSlice } from '@reduxjs/toolkit';
const SECONDS = 120;

export const boxes = Array.from(
  Array(9), (_, i) => ( {
    id: i,
    status: 'free',
    time: 0, 
    counting: false}
  ));

const initialState = {
  counters: boxes,
  reserve: false,
};


export const bookingSlice = createSlice({
  name: 'counter',
  initialState,

    reducers: {

    setStatusReserved: (state, action) => {
      const counterId = action.payload.ID;
      const date = new Date().getTime() + SECONDS * 1000;

      state.counters[counterId] = { 
        ...state.counters[counterId],
        time: date, 
        counting: true, 
        status: 'reserved'
      };
    },

    setStatusFree: (state, action) => {
      const counterId = action.payload.ID;

      state.counters[counterId] = {
        ...state.counters[counterId],
        time: 0, 
        counting: false, 
        status: 'free'
      };
    },

    setStatusBooked: (state, action) => {
      const counterId = action.payload.ID;
      state.counters[counterId] = { 
        ...state.counters[counterId],
        time: 0,
        counting: false, 
        status: 'sold'
      };
    },

    enableButton: (state) => {
      state.reserve = true;
    },

    disableButton: (state) => {
      state.reserve = false;
    } 
  },
});

export const { 
  disableButton, 
  enableButton, 
  setStatusReserved, 
  setStatusFree, 
  setStatusBooked } = bookingSlice.actions;

export const allExistingCounters = (state) => state.counter.counters;
export const reserveStatus = (state) => state.counter.reserve;


export const reservedCards = (state) => state.counter.counters.filter((item) => {
  if (item.status === 'reserved' && item.counting === true) {
    return item;
  }
})

export default bookingSlice.reducer;
