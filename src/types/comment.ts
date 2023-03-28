import { ProfileInfo } from "./profile";

export interface CommentsResult {
  status: string;
  comments: CommentResult[];
}

export interface CommentResult {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: ProfileInfo;
}
