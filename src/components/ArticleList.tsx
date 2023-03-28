import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getArticlesInfoApi } from "../api/article";
import { ArticleInfo, ArticlesResult } from "../types/article";
import ListItem from "./ListItem";
import Spinner from "./Spinner";

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
    result = await getArticlesInfoApi(`${query}limit=${10}&offset=${0}`);
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
        <Spinner size={50} />
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

const ArticleListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
