import styled from "styled-components";
import Container from "../../../components/Container";
import { ArticleInfo } from "../../../types/article";
import ArticleAuthor from "./ArticleAuthor";

interface ArticleProps {
  isUser: boolean;
  article: ArticleInfo | null;
  favoritedClickHandler: () => Promise<void>;
}

function AritcleInfoBanner({
  isUser,
  article,
  favoritedClickHandler
}: ArticleProps) {
  return (
    <ArticleInfoBanner>
      <Container>
        {!article ? (
          <p>Loading...</p>
        ) : (
          <>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleAuthor
              isUser={isUser}
              article={article}
              titleColor={"#fff"}
              favoritedClickHandler={favoritedClickHandler}
            />
          </>
        )}
      </Container>
    </ArticleInfoBanner>
  );
}

export default AritcleInfoBanner;

const ArticleInfoBanner = styled.div`
  width: 100%;
  background-color: #333;
  padding: 32px 0px;
`;

const ArticleTitle = styled.p`
  font-size: 44px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 32px;
`;
