import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getGlobalArticleInfoApi } from "../api/article";
import { ArticleInfo, ArticlesResult } from "../types/article";
import ListItem from "./ListItem";

interface ParentProps {
  query: string;
}

function ArticleList({ query }: ParentProps) {
  const [articles, setArticles] = useState<ArticleInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMyArticles = useCallback(async () => {
    let result: ArticlesResult | null = {
      articles: [],
      articlesCount: 0
    };
    setLoading(true);
    result = await getGlobalArticleInfoApi(`${query}limit=${10}&offset=${0}`);
    if (result?.articles) {
      setArticles(result?.articles);
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    getMyArticles();
  }, [getMyArticles]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ArticleListWrapper>
          {articles.map((item) => (
            <ListItem key={item.slug} article={item} />
          ))}
        </ArticleListWrapper>
      )}
    </>
  );
}

export default ArticleList;

const ArticleListWrapper = styled.div``;
