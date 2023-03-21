import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import ListItem from "../../../components/ListItem";

function ArticleList() {
  const [searchParams] = useSearchParams();
  return (
    <ArticleListContainer>
      <ArticleNavWrapper>
        <ArticleNavItem isFavorites={searchParams.get("article") === null}>
          <a href="/profile/lee12345">My Articles</a>
        </ArticleNavItem>
        <ArticleNavItem
          isFavorites={searchParams.get("article") === "favorites"}
        >
          <a href="/profile/lee12345?article=favorites">Favorited Articles</a>
        </ArticleNavItem>
      </ArticleNavWrapper>
      <ArticleListWrapper>
        {/* {[1, 2, 3, 4].map((item) => (
          <ListItem key={item} />
        ))} */}
      </ArticleListWrapper>
    </ArticleListContainer>
  );
}

export default ArticleList;

const ArticleListContainer = styled.div`
  margin: 32px 0px;
`;

const ArticleNavWrapper = styled.ul`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ArticleNavItem = styled.li<{ isFavorites: boolean }>`
  padding: 8px 16px;
  font-size: 16px;
  ${({ isFavorites }) =>
    isFavorites &&
    css`
      border-bottom: 2px solid #5cb85c;
      margin-bottom: -1px;
      a {
        color: #5cb85c;
      }
    `}
`;

const ArticleListWrapper = styled.ul``;
