interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  username: string;
  // refreshToken: string;
}
