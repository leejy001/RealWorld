import { ProfileResult } from "../types/profile";
import { fetchClient } from "./fetchClient";

export const getProfileApi = async (
  username: string
): Promise<ProfileResult | null> => {
  const profileRes = await fetchClient(`/profiles/${username}`, {
    method: "GET"
  });

  if (profileRes.ok) {
    return profileRes.json() as Promise<ProfileResult>;
  }

  return null;
};

export const followAuthorApi = async (username: string): Promise<string> => {
  const followRes = await fetchClient(`/profiles/${username}/follow`, {
    method: "POST"
  });

  if (followRes.ok) {
    return "success";
  }

  return "fail";
};

export const unfollowAuthorApi = async (username: string): Promise<string> => {
  const unfollowRes = await fetchClient(`/profiles/${username}/follow`, {
    method: "DELETE"
  });

  if (unfollowRes.ok) {
    return "success";
  }

  return "fail";
};
