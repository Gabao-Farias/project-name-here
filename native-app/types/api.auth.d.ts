declare type AuthSignInRequestBody = {
  email: string;
  password: string;
};

declare type AuthSignInResponseBody = {
  accessToken: string;
  refreshToken: string;
};
