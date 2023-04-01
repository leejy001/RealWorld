import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import ListItem from "./ListItem";
import Spinner from "./Spinner";
import useArticlesQuery from "../hooks/article/useArticlesQuery";

interface ParentProps {
  query: string;
}

function ArticleList({ query }: ParentProps) {
  const { isLoading, isFetching, data, fetchNextPage, hasNextPage } =
    useArticlesQuery(query);
  const mergeArticles = useMemo(
    () => data && data.pages.flatMap((page) => page.articles),
    [data]
  );

  const onIntersect: IntersectionObserverCallback = useCallback(
    ([{ isIntersecting }]) => {
      if (isIntersecting && hasNextPage && !isLoading) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isLoading]
  );

  const { setTarget } = useIntersectionObserver({
    onIntersect,
    enabled: hasNextPage
  });

  return (
    <ArticleListContainer>
      <ArticleListWrapper>
        {mergeArticles &&
          mergeArticles.map((item, index) => (
            <ListItem key={index} article={item} />
          ))}
      </ArticleListWrapper>
      <div ref={setTarget}>{isFetching && <Spinner size={50} />}</div>
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
