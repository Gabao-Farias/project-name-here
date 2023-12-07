import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { machineSlice } from "./slices";

export const reduxStore = configureStore({
  reducer: {
    machine: machineSlice.reducer,
  },
});

export type AppDispatch = typeof reduxStore.dispatch;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
