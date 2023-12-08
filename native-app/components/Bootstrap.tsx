import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useAppDispatch } from "../hooks";
import {
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
    };

    if (!userToken) {
      loggedOutBootstrap();
    } else {
      loggedInBootstrap();
    }
  }, [userToken]);

  return null;
};
