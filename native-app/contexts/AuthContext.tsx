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
  user?: User;
  signIn: (props: AuthSignInRequestBody) => Promise<void>;
};

export const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  const signIn = async (props: AuthSignInRequestBody) => {
    const { email } = props;
    const { accessToken, refreshToken } = await AuthAxios.signIn(props);

    await SecureStore.setValue("ACCESS_TOKEN", accessToken);
    await SecureStore.setValue("REFRESH_TOKEN", refreshToken);

    setUser({ email });
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      router.replace("/");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
