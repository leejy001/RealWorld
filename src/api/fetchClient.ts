import { getAccessTokenFromSessionStorage } from "../utils/accessTokenHandler";

export const fetchClient = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  const accessToken = getAccessTokenFromSessionStorage();
  if (accessToken) {
    const newOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    };

    return fetch(url, newOptions);
  } else {
    const newOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json"
      }
    };
    return fetch(url, newOptions);
  }
};
