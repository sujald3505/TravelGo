export interface AuthResponse {

  isSuccess: boolean;

  message: string;

  token: string;

  expiration: string;

  userId: number;

  firstName: string;

  lastName: string;

  email: string;

  role: string;

}