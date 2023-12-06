import React from "react";
import { AuthProvider } from "./AuthContext";

type MainProviderProps = {
  children?: React.ReactNode;
};

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
