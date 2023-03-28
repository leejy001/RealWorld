import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled, { css } from "styled-components";
import ArticleList from "../../../components/ArticleList";
import { useRouter } from "../../../hooks/useRouter";

function ArticleBody() {
  const { currentPath, routeTo } = useRouter();
  const [isFavorited, setIsFavorited] = useState<boolean>(
    !!currentPath.split("/")[3]
  );

  const getMyArticles = () => {
    setIsFavorited(false);
    routeTo(`/profile/${currentPath.split("/")[2]}`);
  };

  const getFavoriteArticles = () => {
    setIsFavorited(true);
    routeTo(`/profile/${currentPath.split("/")[2]}/favorites`);
  };

  return (
    <ArticleListContainer>
      <ArticleNavWrapper>
        <ArticleNavItem
          isFavorited={isFavorited === false}
          onClick={getMyArticles}
        >
          My Articles
        </ArticleNavItem>
        <ArticleNavItem
          isFavorited={isFavorited === true}
          onClick={getFavoriteArticles}
        >
          Favorited Articles
        </ArticleNavItem>
      </ArticleNavWrapper>
      <Routes>
        <Route
          path="/"
          element={
            <ArticleList query={`?author=${currentPath.split("/")[2]}&`} />
          }
        />
        <Route
          path="/favorites"
          element={
            <ArticleList query={`?favorited=${currentPath.split("/")[2]}&`} />
          }
        />
      </Routes>
    </ArticleListContainer>
  );
}

export default ArticleBody;

const ArticleListContainer = styled.div`
  margin: 32px 0px;
`;

const ArticleNavWrapper = styled.ul`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.BORDER_GRAY};
`;

const ArticleNavItem = styled.li<{ isFavorited: boolean }>`
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  ${({ isFavorited }) =>
    isFavorited &&
    css`
      border-bottom: 2px solid ${({ theme }) => theme.colors.COLOR_GREEN};
      margin-bottom: -1px;
      color: ${({ theme }) => theme.colors.FONT_GREEN};
    `};
`;
