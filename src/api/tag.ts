import { TagResult } from "../types/tag";
import { fetchClient } from "./fetchClient";

export const getTagApi = async (): Promise<TagResult | null> => {
  const tagRes = await fetchClient("/tags", {
    method: "GET"
  });

  if (tagRes.ok) {
    return tagRes.json() as Promise<TagResult>;
  }

  return null;
};
