import { router } from "expo-router";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { AuthAxios } from "../api";
import { SecureStore } from "../services";

type AuthData = {
  userToken?: string;
  refreshingToken: boolean;
  signIn: (props: AuthSignInRequestBody) => Promise<void>;
  refreshToken: () => Promise<void>;
};

export const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | undefined>();
  const [refreshingToken, setRefreshingToken] = useState(false);

  const signIn = async (props: AuthSignInRequestBody) => {
    const { accessToken, refreshToken } = await AuthAxios.signIn(props);

    await SecureStore.setValue("ACCESS_TOKEN", accessToken);
    await SecureStore.setValue("REFRESH_TOKEN", refreshToken);

    setUserToken(accessToken);
  };

  const refreshToken = async () => {
    setRefreshingToken(true);

    try {
      const refreshToken = await SecureStore.getValue("REFRESH_TOKEN");

      const { accessToken } = await AuthAxios.refresh({ refreshToken });

      await SecureStore.setValue("ACCESS_TOKEN", accessToken);

      setUserToken(accessToken);
    } catch (error) {
      setUserToken(undefined);
    } finally {
      setRefreshingToken(false);
    }
  };

  useEffect(() => {
    if (!userToken) {
      router.replace("/login");
    } else {
      router.replace("/");
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{ userToken, signIn, refreshToken, refreshingToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
