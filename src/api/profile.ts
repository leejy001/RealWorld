import { ProfileResult } from "../types/profile";

export const getProfileApi = async (
  username: string
): Promise<ProfileResult | null> => {
  const profileRes = await fetch(
    `${process.env.REACT_APP_BASIC_URL}/profiles/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (profileRes.ok) {
    return profileRes.json() as Promise<ProfileResult>;
  }

  return null;
};
