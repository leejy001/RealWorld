import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getArticlesInfoApi } from "../api/article";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { ArticleInfo, ArticlesResult } from "../types/article";
import ListItem from "./ListItem";
import Spinner from "./Spinner";

interface ParentProps {
  query: string;
}

function ArticleList({ query }: ParentProps) {
  const [start, setStart] = useState<number>(0);
  const [articles, setArticles] = useState<ArticleInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(false);

  const getFirstArticles = useCallback(async () => {
    let result: ArticlesResult | null = {
      articles: [],
      articlesCount: 0
    };
    setArticles([]);
    setLoading(true);
    result = await getArticlesInfoApi(`${query}limit=${10}&offset=${0}`);
    if (result?.articles) {
      setArticles(result?.articles);
      setStart(10);
      setLoading(false);
      setIsMore(result?.articlesCount > 10);
    }
  }, [query]);

  const getMyArticles = useCallback(async () => {
    let result: ArticlesResult | null = {
      articles: [],
      articlesCount: 0
    };
    setLoading(true);
    result = await getArticlesInfoApi(`${query}limit=${10}&offset=${start}`);
    if (result?.articles) {
      setArticles([...articles, ...result?.articles]);
      setStart(start + 10);
      setLoading(false);
      setIsMore(result?.articlesCount > start + 10);
    }
  }, [articles, query, start]);

  useEffect(() => {
    getFirstArticles();
  }, [getFirstArticles]);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && isMore && !loading) {
      getMyArticles();
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <ArticleListContainer>
      <ArticleListWrapper>
        {articles.map((item, index) => (
          <ListItem key={index} article={item} />
        ))}
      </ArticleListWrapper>
      <div ref={setTarget}>{loading && <Spinner size={50} />}</div>
    </ArticleListContainer>
  );
}

export default ArticleList;

const ArticleListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArticleListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
