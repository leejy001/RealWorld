import {
  ArticleResult,
  ArticleRequest,
  ArticlesResult
} from "../types/article";
import { fetchClient } from "./fetchClient";

export const getGlobalArticleInfoApi = async (
  args: ArticleRequest
): Promise<ArticlesResult | null> => {
  const queryString =
    "?" +
    Object.entries(args)
      .map((item) => `${item[0]}=${item[1]}`)
      .join("&");
  const articlesInfoRes = await fetch(
    `${process.env.REACT_APP_BASIC_URL}/articles${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (articlesInfoRes.ok) {
    return articlesInfoRes.json() as Promise<ArticlesResult>;
  }

  return null;
};

export const getMyArticleInfoApi = async (
  args: ArticleRequest
): Promise<ArticlesResult | null> => {
  const queryString =
    "?" +
    Object.entries(args)
      .map((item) => `${item[0]}=${item[1]}`)
      .join("&");
  const articlesInfoRes = await fetchClient(
    `${process.env.REACT_APP_BASIC_URL}/articles/feed${queryString}`,
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
  const articleInfoRes = await fetch(
    `${process.env.REACT_APP_BASIC_URL}/articles/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (articleInfoRes.ok) {
    return articleInfoRes.json() as Promise<ArticleResult>;
  }

  return null;
};
