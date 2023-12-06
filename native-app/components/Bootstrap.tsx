import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useAppDispatch } from "../hooks";
import { loadMachineValuesAsync } from "../stores/slices";

export const Bootstrap = () => {
  const dispatch = useAppDispatch();
  const { refreshToken } = useContext(AuthContext);

  useEffect(() => {
    dispatch(loadMachineValuesAsync());
    refreshToken();
  }, []);

  return null;
};
