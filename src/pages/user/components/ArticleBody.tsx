import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import ArticleList from "../../../components/ArticleList";
import { useRouter } from "../../../hooks/useRouter";

function ArticleBody() {
  const { routeTo } = useRouter();
  const { pathname } = useLocation();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const getMyArticles = () => {
    setIsFavorited(false);
    routeTo(`/profile/${pathname.split("/")[2]}`);
  };

  const getFavoriteArticles = () => {
    setIsFavorited(true);
    routeTo(`/profile/${pathname.split("/")[2]}/favorites`);
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
          element={<ArticleList query={`?author=${pathname.split("/")[2]}&`} />}
        />
        <Route
          path="/favorites"
          element={
            <ArticleList query={`?favorited=${pathname.split("/")[2]}&`} />
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ArticleNavItem = styled.li<{ isFavorited: boolean }>`
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  ${({ isFavorited }) =>
    isFavorited &&
    css`
      border-bottom: 2px solid #5cb85c;
      margin-bottom: -1px;
      color: #5cb85c;
    `};
`;
