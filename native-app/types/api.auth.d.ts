declare type AuthSignInRequestBody = {
  email: string;
  password: string;
};

declare type AuthSignUpRequestBody = {
  email: string;
  password: string;
};

declare type AuthSignOutRequestBody = {
  refreshToken: string;
};

declare type AuthSignInResponseBody = {
  accessToken: string;
  refreshToken: string;
};

declare type AuthRefreshRequestBody = {
  refreshToken: string;
};

declare type AuthRefreshResponseBody = {
  accessToken: string;
};
