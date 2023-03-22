import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getArticleInfoApi } from "../../api/article";
import { getUserInfoApi } from "../../api/user";
import Container from "../../components/Container";
import { ArticleInfo } from "../../types/article";
import ArticleAuthor from "./components/ArticleAuthor";
import ArticleInfoBanner from "./components/ArticleInfoBanner";

function Article() {
  const locate = useLocation();
  const [article, setArticle] = useState<ArticleInfo | null>(null);
  const [isUser, setIsUser] = useState<boolean>(false);

  const getUserInfo = useCallback(async () => {
    const userRes = await getUserInfoApi();
    setIsUser(userRes?.user.username === article?.author.username);
  }, [article?.author.username]);

  const getArticleInfo = useCallback(async () => {
    const result = await getArticleInfoApi(locate.pathname.split("/")[2]);
    if (result?.article) setArticle(result?.article);
  }, [locate.pathname]);

  useEffect(() => {
    getUserInfo();
    getArticleInfo();
  }, [getUserInfo, getArticleInfo]);

  return (
    <>
      <ArticleInfoBanner isUser={isUser} article={article} />
      <Container>
        <ArticleDetail>{article?.body}</ArticleDetail>
        <ArticleTagList>
          {article?.tagList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ArticleTagList>
        <AritcleDivide />
        <AritcleAuthorWrapper>
          {article && (
            <ArticleAuthor
              isUser={isUser}
              article={article}
              titleColor={"#5cb85c"}
            />
          )}
        </AritcleAuthorWrapper>
        <CommentWrapper>
          <p>
            <span>Sign in</span> or <span>sign up</span> to add comments on this
            article.
          </p>
        </CommentWrapper>
      </Container>
    </>
  );
}

export default Article;

const ArticleDetail = styled.p`
  font-size: 20px;
  margin: 32px 0px;
  line-height: 1.4;
`;

const ArticleTagList = styled.ul`
  display: flex;
  gap: 3px;
  li {
    height: 18px;
    line-height: 14px;
    border: 1px solid #aaa;
    border-radius: 50px;
    color: #aaa;
    font-size: 12px;
    padding: 0px 8px;
  }
`;

const AritcleDivide = styled.hr`
  margin: 30px 0px;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const AritcleAuthorWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CommentWrapper = styled.div`
  margin: 40px 0px;
  p span {
    color: #5cb85c;
  }
`;
