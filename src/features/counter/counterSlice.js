import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchStatus } from './counterAPI';
const SECONDS = 30;

export const boxes = Array.from(Array(9), (_, i) => ( {id: i, status: 'free'} ));

const initialState = {
  counters: boxes,
  reserve: false,
};
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    setStatusReserved: (state, action) => {
      const counterId = action.payload.ID;
      const date = new Date().getTime() + SECONDS * 1000;

      state.counters[counterId] = { 
        ...state.counters[counterId],
        time: date, 
        counting: true, 
        status: "reserved" 
      };

      state.reserve = true;
    },

    setStatusFree: (state, action) => {
      const counterId = action.payload.ID;
      // const status=true ? "booked" : "canceled";
      state.counters[counterId] = {
        ...state.counters[counterId],
        time: 0, 
        counting: false, 
        status: "free" 
      };
      
      state.reserve = false;
    },

    setStatusBooked: (state, action) => {
      const counterId = action.payload.ID;
      state.counters[counterId] = { ...state.counters[counterId], time: 0, counting: false, status: "booked" };
      state.reserve = false;
    },
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     });
  // },
});

export const { half, setStatusReserved, setStatusFree } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const allExistingCounters = (state) => state.counter.counters;
export const reserveStatus = (state) => state.counter.reserve;


export const reservedCards = (state) => state.counter.counters.filter((item) => {
  if (item.status === "reserved" && item.counting === true) {
    return item;
  }
})

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = totalSeconds(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default counterSlice.reducer;
