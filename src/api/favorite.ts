import { fetchClient } from "./fetchClient";

export const favoriteApi = async (slug: string): Promise<string> => {
  const favoriteRes = await fetchClient(`/articles/${slug}/favorite`, {
    method: "POST"
  });

  if (favoriteRes.ok) return "success";

  return "fail";
};

export const unfavoriteApi = async (slug: string): Promise<string> => {
  const favoriteRes = await fetchClient(`/articles/${slug}/favorite`, {
    method: "DELETE"
  });

  if (favoriteRes.ok) return "success";

  return "fail";
};
