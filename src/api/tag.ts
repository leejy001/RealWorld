import { TagResult } from "../types/tag";

export const getTagApi = async (): Promise<TagResult | null> => {
  const tagRes = await fetch(`${process.env.REACT_APP_BASIC_URL}/tags`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (tagRes.ok) {
    return tagRes.json() as Promise<TagResult>;
  }

  return null;
};
