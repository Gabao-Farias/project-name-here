import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MachineAxios } from "../../api";
import { RootState } from "../root";

export interface MachineSliceState {
  machineHealth?: MachineHealthResponseBody;

  fetchMachineHealthStatus: AsyncCallStatus;
}

const initialState: MachineSliceState = {
  machineHealth: undefined,

  fetchMachineHealthStatus: "idle",
};

export const fetchMachineHealthAsync = createAsyncThunk(
  "place/fetchMachineHealthAsync",
  async (props: MachineHealthRequestBody) => {
    const data = await MachineAxios.machineHealth(props);

    return data;
  }
);

export const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchMachineHealthAsync.pending, (state) => {
        state.fetchMachineHealthStatus = "loading";
      })
      .addCase(fetchMachineHealthAsync.fulfilled, (state, action) => {
        state.fetchMachineHealthStatus = "success";
        state.machineHealth = action.payload;
      })
      .addCase(fetchMachineHealthAsync.rejected, (state) => {
        state.fetchMachineHealthStatus = "failed";
      }),
});

export const getMachineHealth = (state: RootState) =>
  state.machine.machineHealth;

export const getFetchMachineHealthStatus = (state: RootState) =>
  state.machine.fetchMachineHealthStatus;
