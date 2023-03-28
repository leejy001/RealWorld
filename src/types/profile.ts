export interface ProfileInfo {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ProfileResult {
  profile: ProfileInfo;
}
