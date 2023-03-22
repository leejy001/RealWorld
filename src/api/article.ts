import { ArticleResult, ArticlesResult } from "../types/article";
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
