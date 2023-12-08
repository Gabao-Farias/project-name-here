import { axiosInstance } from "./request";

const baseAuthURL = "/auth";

export class AuthAxios {
  static async signIn(
    props: AuthSignInRequestBody
  ): Promise<AuthSignInResponseBody> {
    try {
      const { data } = await axiosInstance.post<AuthSignInResponseBody>(
        `${baseAuthURL}/signin`,
        props
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async refresh(
    props: AuthRefreshRequestBody
  ): Promise<AuthRefreshResponseBody> {
    try {
      const { data } = await axiosInstance.post<AuthRefreshResponseBody>(
        `${baseAuthURL}/token`,
        props
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async signout(
    props: AuthSignOutRequestBody
  ): Promise<AuthSignInResponseBody> {
    try {
      const { data } = await axiosInstance.delete<AuthSignInResponseBody>(
        `${baseAuthURL}/signout`,
        {
          data: props,
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
}
