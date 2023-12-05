import React, { PropsWithChildren, createContext, useState } from "react";
import { AuthAxios } from "../api";
import { SecureStore } from "../services";

type AuthData = {
  user?: User;
  signIn: (props: AuthSignInRequestBody) => Promise<void>;
};

export const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  const signIn = async (props: AuthSignInRequestBody) => {
    const { accessToken, refreshToken } = await AuthAxios.signIn(props);

    await SecureStore.setValue("ACCESS_TOKEN", accessToken);
    await SecureStore.setValue("REFRESH_TOKEN", refreshToken);

    setUser({ email: "batatao@gas.cs" });
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
