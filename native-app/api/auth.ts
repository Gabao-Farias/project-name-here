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
}
