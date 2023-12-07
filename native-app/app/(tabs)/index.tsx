import { useCallback } from "react";
import MachineState from "../../components/MachineState";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchMachineHealthAsync,
  getFetchMachineHealthStatus,
  getMachineHealth,
  getMachineValues,
  resetMachineValues,
} from "../../stores/slices";

export default function StateScreen() {
  const machineHealth = useAppSelector(getMachineHealth);
  const fetchMachineHealthStatus = useAppSelector(getFetchMachineHealthStatus);

  const machineValues = useAppSelector(getMachineValues);

  const dispatch = useAppDispatch();

  const resetMachine = () => {
    dispatch(resetMachineValues());
  };

  const calculateHealth = useCallback(async () => {
    try {
      await dispatch(fetchMachineHealthAsync(machineValues));
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

  const isLoading = fetchMachineHealthStatus === "loading";

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
