import { UserInfo } from "./user";

export interface SignRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface SignInResult {
  status: string;
  user: UserInfo;
}

export interface SignInError {
  status: string;
  message: string;
}

export interface SignUpRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface SignUpResult {
  status: string;
  user: UserInfo;
}

export interface SignUpError {
  status: string;
  message: string;
}
