import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useAppDispatch } from "../hooks";
import {
  fetchMachineHistoryAsync,
  loadMachineHealthAsync,
  loadMachineValuesAsync,
} from "../stores/slices";

export const Bootstrap = () => {
  const dispatch = useAppDispatch();
  const { refreshToken, userToken } = useContext(AuthContext);

  useEffect(() => {
    const loggedOutBootstrap = () => {
      refreshToken();
    };

    const loggedInBootstrap = () => {
      dispatch(loadMachineValuesAsync());
      dispatch(loadMachineHealthAsync());
      dispatch(fetchMachineHistoryAsync());
    };

    if (!userToken) {
      loggedOutBootstrap();
    } else {
      loggedInBootstrap();
    }
  }, [userToken]);

  return null;
};
