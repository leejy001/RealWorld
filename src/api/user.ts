import { UserResult } from "../types/sign";
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
