import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MachineAxios } from "../../api";
import { AsyncStorage } from "../../services";
import { RootState } from "../root";

export interface MachineSliceState {
  machineHealth?: MachineHealthResponseBody;

  machineValues?: MachineValues;

  fetchMachineHealthStatus: AsyncCallStatus;

  loadMachineValuesStatus: AsyncCallStatus;
}

const initialState: MachineSliceState = {
  machineHealth: undefined,

  machineValues: undefined,

  fetchMachineHealthStatus: "idle",

  loadMachineValuesStatus: "idle",
};

export const fetchMachineHealthAsync = createAsyncThunk(
  "machine/fetchMachineHealthAsync",
  async (props: MachineHealthRequestBody) => {
    const data = await MachineAxios.machineHealth(props);

    return data;
  }
);

export const loadMachineValuesAsync = createAsyncThunk(
  "machine/loadMachineValuesAsync",
  async () => {
    try {
      const unparsedJOSN = await AsyncStorage.getValue("MACHINE_VALUES");

      const data = JSON.parse(unparsedJOSN) as MachineValues;

      return data;
    } catch (error) {
      return undefined;
    }
  }
);

const setMachineValuesReducer = (
  state: MachineSliceState,
  action: PayloadAction<MachineValues | undefined>
) => {
  const { payload } = action;

  AsyncStorage.setValue("MACHINE_VALUES", JSON.stringify(payload));

  state.machineValues = payload;
};

const resetMachineValuesReducer = (state: MachineSliceState) => {
  state.machineValues = undefined;

  AsyncStorage.setValue("MACHINE_VALUES", "");
};

export const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {
    setMachineValues: setMachineValuesReducer,
    resetMachineValues: resetMachineValuesReducer,
  },
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
      })
      .addCase(loadMachineValuesAsync.pending, (state) => {
        state.loadMachineValuesStatus = "loading";
      })
      .addCase(loadMachineValuesAsync.fulfilled, (state, action) => {
        state.loadMachineValuesStatus = "success";
        state.machineValues = action.payload;
      })
      .addCase(loadMachineValuesAsync.rejected, (state) => {
        state.loadMachineValuesStatus = "failed";
      }),
});

export const { resetMachineValues, setMachineValues } = machineSlice.actions;

export const getMachineHealth = (state: RootState) =>
  state.machine.machineHealth;

export const getMachineValues = (state: RootState) =>
  state.machine.machineValues;

export const getFetchMachineHealthStatus = (state: RootState) =>
  state.machine.fetchMachineHealthStatus;

export const getLoadMachineValuesStatus = (state: RootState) =>
  state.machine.loadMachineValuesStatus;
