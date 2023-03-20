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
  errors: {
    email?: string[];
    password?: string[];
    "email or password": string[];
  };
}

export interface UserInfo {
  email: "string";
  token: "string";
  username: "string";
  bio: "string";
  image: "string";
}

export interface UserResult {
  user: UserInfo;
}