import { CommentsResult } from "../types/comment";
import { fetchClient } from "./fetchClient";

export const getCommentsInfoApi = async (
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

export const postCommentApi = async (
  slug: string,
  body: string
): Promise<string> => {
  console.log(body);
  const postCommentRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles/${slug}/comments`,
    { method: "POST", body: JSON.stringify({ comment: { body } }) }
  );

  if (postCommentRes.ok) {
    return "success";
  }
  return "fail";
};

export const deleteCommentApi = async (
  slug: string,
  id: number
): Promise<string> => {
  const deleteCommentRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles/${slug}/comments/${id}`,
    { method: "DELETE" }
  );

  if (deleteCommentRes.ok) {
    return "success";
  }
  return "fail";
};
