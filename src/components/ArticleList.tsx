import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import ListItem from "./ListItem";
import Spinner from "./Spinner";
import useArticlesQuery from "../hooks/article/useArticlesQuery";

interface ParentProps {
  query: string;
}

function ArticleList({ query }: ParentProps) {
  const { isLoading, data, fetchNextPage, hasNextPage, remove } =
    useArticlesQuery(query);
  const mergeArticles = useMemo(
    () => data?.pages.flatMap((page) => page.articles),
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

  useEffect(() => {
    remove();
  }, [remove]);

  return (
    <ArticleListContainer>
      <ArticleListWrapper>
        {mergeArticles &&
          mergeArticles.map((item, index) => (
            <ListItem key={index} article={item} />
          ))}
      </ArticleListWrapper>
      <div ref={setTarget}>{isLoading && <Spinner size={50} />}</div>
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
