import React from "react";
import { Provider } from "react-redux";
import { reduxStore } from "../stores";
import { AuthProvider } from "./AuthContext";

type MainProviderProps = {
  children?: React.ReactNode;
};

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  return (
    <Provider store={reduxStore}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};
