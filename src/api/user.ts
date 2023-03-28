import { UserInfoRequest, UserResult } from "../types/user";
import { fetchClient } from "./fetchClient";

export const getUserInfoApi = async (): Promise<UserResult | null> => {
  const userInfoRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/user`,
    {
      method: "GET"
    }
  );

  if (userInfoRes.ok) {
    return userInfoRes.json() as Promise<UserResult>;
  }

  return null;
};

export const putUserInfoApi = async (
  args: UserInfoRequest
): Promise<UserResult | null> => {
  const userInfoRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/user`,
    { method: "PUT", body: JSON.stringify(args) }
  );

  if (userInfoRes.ok) {
    return userInfoRes.json() as Promise<UserResult>;
  }

  return null;
};
