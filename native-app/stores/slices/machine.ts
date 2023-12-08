import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MachineAxios } from "../../api";
import { AsyncStorage } from "../../services";
import { RootState } from "../root";

export interface MachineSliceState {
  machineHealth?: MachineHealthResponseBody;

  machineValues?: MachineValues;

  machineHistory?: MachineHealthHistoryResponseBody;

  fetchMachineHistoryStatus: AsyncCallStatus;

  fetchMachineHealthStatus: AsyncCallStatus;

  loadMachineValuesStatus: AsyncCallStatus;

  loadMachineHealthStatus: AsyncCallStatus;
}

const initialState: MachineSliceState = {
  machineHealth: undefined,

  machineValues: undefined,

  machineHistory: [],

  fetchMachineHistoryStatus: "idle",

  fetchMachineHealthStatus: "idle",

  loadMachineValuesStatus: "idle",

  loadMachineHealthStatus: "idle",
};

export const fetchMachineHistoryAsync = createAsyncThunk(
  "machine/fetchMachineHistoryAsync",
  async () => {
    const data = await MachineAxios.machineHealthHistory();

    return data;
  }
);

export const fetchMachineHealthAsync = createAsyncThunk(
  "machine/fetchMachineHealthAsync",
  async (props: MachineHealthRequestBody) => {
    const data = await MachineAxios.machineHealth(props);

    AsyncStorage.setValue("MACHINE_HEALTH", JSON.stringify(data));

    return data;
  }
);

export const loadMachineValuesAsync = createAsyncThunk(
  "machine/loadMachineValuesAsync",
  async () => {
    try {
      const machineValues = await MachineAxios.machineValuesState();

      return machineValues;
    } catch (error) {
      return undefined;
    }
  }
);

export const loadMachineHealthAsync = createAsyncThunk(
  "machine/loadMachineHealthAsync",
  async () => {
    try {
      const machineValues = await MachineAxios.machineHealthState();

      return machineValues;
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
      })
      .addCase(loadMachineHealthAsync.pending, (state) => {
        state.loadMachineValuesStatus = "loading";
      })
      .addCase(loadMachineHealthAsync.fulfilled, (state, action) => {
        state.loadMachineValuesStatus = "success";
        state.machineHealth = action.payload;
      })
      .addCase(loadMachineHealthAsync.rejected, (state) => {
        state.loadMachineValuesStatus = "failed";
      })
      .addCase(fetchMachineHistoryAsync.pending, (state) => {
        state.fetchMachineHistoryStatus = "loading";
      })
      .addCase(fetchMachineHistoryAsync.fulfilled, (state, action) => {
        state.fetchMachineHistoryStatus = "success";
        state.machineHistory = action.payload;
      })
      .addCase(fetchMachineHistoryAsync.rejected, (state) => {
        state.fetchMachineHistoryStatus = "failed";
      }),
});

export const { resetMachineValues, setMachineValues } = machineSlice.actions;

export const getMachineHealth = (state: RootState) =>
  state.machine.machineHealth;

export const getMachineValues = (state: RootState) =>
  state.machine.machineValues;

export const getMachineHistory = (state: RootState) =>
  state.machine.machineHistory;

export const getFetchMachineHistoryStatus = (state: RootState) =>
  state.machine.fetchMachineHistoryStatus;

export const getFetchMachineHealthStatus = (state: RootState) =>
  state.machine.fetchMachineHealthStatus;

export const getLoadMachineValuesStatus = (state: RootState) =>
  state.machine.loadMachineValuesStatus;

export const getLoadMachineHealthValuesStatus = (state: RootState) =>
  state.machine.loadMachineHealthStatus;
