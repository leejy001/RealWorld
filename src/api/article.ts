import {
  ArticleRequest,
  ArticleResult,
  ArticlesResult,
  ArticleEditResult,
  ArticleEditRequest
} from "../types/article";
import { fetchClient } from "./fetchClient";

export const getArticlesInfoApi = async (
  query: string
): Promise<ArticlesResult> => {
  const articlesInfoRes = await fetchClient(`/articles${query}`, {
    method: "GET"
  });

  if (articlesInfoRes.ok) {
    return articlesInfoRes.json() as Promise<ArticlesResult>;
  }
  return { articles: [], articlesCount: 0 };
};

export const getArticleInfoApi = async (
  slug: string
): Promise<ArticleResult | null> => {
  const articleInfoRes = await fetchClient(`/articles/${slug}`, {
    method: "GET"
  });

  if (articleInfoRes.ok) {
    return articleInfoRes.json() as Promise<ArticleResult>;
  }

  return null;
};

export const postArticleApi = async (
  args: ArticleRequest
): Promise<ArticleEditResult> => {
  const articlePostRes = await fetchClient(`/articles`, {
    method: "POST",
    body: JSON.stringify({ article: args })
  });

  const articlePostResponseData = await articlePostRes.json();

  if (articlePostRes.ok) {
    return { ...articlePostResponseData, status: "success" };
  }

  return { status: "fail" };
};

export const putArticleApi = async (
  args: ArticleEditRequest
): Promise<ArticleEditResult> => {
  const { title, description, body, tagList } = args;
  const articlePutRes = await fetchClient(`/articles/${args.slug}`, {
    method: "PUT",
    body: JSON.stringify({ article: { title, description, body, tagList } })
  });

  const articlePutResponseData = await articlePutRes.json();

  if (articlePutRes.ok) {
    return { ...articlePutResponseData, status: "success" };
  }

  return { status: "fail" };
};

export const deleteArticleApi = async (slug: string): Promise<string> => {
  const articleDeleteRes = await fetchClient(`/articles/${slug}`, {
    method: "DELETE"
  });

  if (articleDeleteRes.ok) return "success";
  return "fail";
};
