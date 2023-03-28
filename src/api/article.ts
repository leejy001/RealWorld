import {
  ArticleRequest,
  ArticleResult,
  ArticlesResult,
  ArticleEditResult
} from "../types/article";
import { fetchClient } from "./fetchClient";

export const getArticlesInfoApi = async (
  query: string
): Promise<ArticlesResult | null> => {
  const articlesInfoRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles${query}`,
    {
      method: "GET"
    }
  );

  if (articlesInfoRes.ok) {
    return articlesInfoRes.json() as Promise<ArticlesResult>;
  }
  return null;
};

export const getArticleInfoApi = async (
  slug: string
): Promise<ArticleResult | null> => {
  const articleInfoRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles/${slug}`,
    { method: "GET" }
  );

  if (articleInfoRes.ok) {
    return articleInfoRes.json() as Promise<ArticleResult>;
  }

  return null;
};

export const postArticleApi = async (
  args: ArticleRequest
): Promise<ArticleEditResult> => {
  const articlePostRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles`,
    {
      method: "POST",
      body: JSON.stringify({ article: args })
    }
  );

  const articlePostResponseData = await articlePostRes.json();

  if (articlePostRes.ok) {
    return { ...articlePostResponseData, status: "success" };
  }

  return { status: "fail" };
};

export const putArticleApi = async (
  slug: string,
  args: ArticleRequest
): Promise<ArticleEditResult> => {
  const articlePutRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles/${slug}`,
    {
      method: "PUT",
      body: JSON.stringify({ article: args })
    }
  );

  const articlePutResponseData = await articlePutRes.json();

  if (articlePutRes.ok) {
    return { ...articlePutResponseData, status: "success" };
  }

  return { status: "fail" };
};

export const deleteArticleApi = async (slug: string): Promise<string> => {
  const articleDeleteRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles/${slug}`,
    {
      method: "DELETE"
    }
  );

  if (articleDeleteRes.ok) return "success";
  return "fail";
};
