export interface UserInfo {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserResult {
  user: UserInfo;
}

export interface UserInfoRequest {
  user: {
    email: string;
    password: string;
    username: string;
    bio: string;
    image: string;
  };
}
