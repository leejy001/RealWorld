import { fetchClient } from "./fetchClient";

export const favoriteApi = async (slug: string): Promise<string> => {
  const favoriteRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles/${slug}/favorite`,
    {
      method: "POST"
    }
  );

  if (favoriteRes.ok) return "success";

  return "fail";
};

export const unfavoriteApi = async (slug: string): Promise<string> => {
  const favoriteRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles/${slug}/favorite`,
    {
      method: "DELETE"
    }
  );

  if (favoriteRes.ok) return "success";

  return "fail";
};
