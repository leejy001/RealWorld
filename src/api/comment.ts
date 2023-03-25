import { CommentsResult } from "../types/comment";
import { fetchClient } from "./fetchClient";

export const getCommentsInfo = async (
  slug: string
): Promise<CommentsResult | null> => {
  const commentsInfoRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles/${slug}/comments`,
    { method: "GET" }
  );

  if (commentsInfoRes.ok) {
    return commentsInfoRes.json() as Promise<CommentsResult>;
  }
  return null;
};
