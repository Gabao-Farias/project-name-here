import { useCallback } from "react";
import MachineState from "../../components/MachineState";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchMachineHealthAsync,
  fetchMachineHistoryAsync,
  getFetchMachineHealthStatus,
  getLoadMachineHealthValuesStatus,
  getLoadMachineValuesStatus,
  getMachineHealth,
  getMachineValues,
  resetMachineValues,
} from "../../stores/slices";

export default function StateScreen() {
  const machineHealth = useAppSelector(getMachineHealth);
  const fetchMachineHealthStatus = useAppSelector(getFetchMachineHealthStatus);

  const loadMachineHealthValueStatus = useAppSelector(
    getLoadMachineHealthValuesStatus
  );
  const loadMachineValuesStatus = useAppSelector(getLoadMachineValuesStatus);

  const machineValues = useAppSelector(getMachineValues);

  const dispatch = useAppDispatch();

  const resetMachine = () => {
    dispatch(resetMachineValues());
  };

  const calculateHealth = useCallback(async () => {
    try {
      await dispatch(fetchMachineHealthAsync(machineValues));
      dispatch(fetchMachineHistoryAsync());
    } catch (error) {
      console.error(error);
      console.log(
        `There was an error calculating health. ${
          error.toString() === "AxiosError: Network Error"
            ? "Is the api server started?"
            : error
        }`
      );
    }
  }, [machineValues]);

  const isLoading =
    fetchMachineHealthStatus === "loading" ||
    loadMachineHealthValueStatus === "loading" ||
    loadMachineValuesStatus === "loading";

  return (
    <MachineState
      calculateHealth={calculateHealth}
      resetMachineValues={resetMachine}
      isLoading={isLoading}
      machineHealth={machineHealth}
      machineValues={machineValues}
    />
  );
}
