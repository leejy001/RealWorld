import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { unfavoriteApi, favoriteApi } from "../../api/favorite";
import Container from "../../components/Container";
import Spinner from "../../components/Spinner";
import {
  AuthContext,
  AuthContextInfo
} from "../../contexts/AuthContextProvider";
import { useRouter } from "../../hooks/useRouter";
import ArticleAuthor from "./components/ArticleAuthor";
import Comments from "./components/Comments";
import useArticleQuery from "../../hooks/article/useArticleQuery";
import useFollowMutation from "../../hooks/profile/useFollowMutation";
import useUnfollowMutation from "../../hooks/profile/useUnfollowMutation";

function Article() {
  const { currentPath, routeTo } = useRouter();
  const { user } = useContext(AuthContext) as AuthContextInfo;
  const { isLoading, data, refetch } = useArticleQuery(
    currentPath.split("/")[2]
  );
  const { mutate: followMutate } = useFollowMutation();
  const { mutate: unfollowMutate } = useUnfollowMutation();

  const favoritedClickHandler = async () => {
    if (!user) return routeTo("/sign-in");
    if (data?.article?.favorited) {
      const deleteRes = await unfavoriteApi(currentPath.split("/")[2]);
      // if (deleteRes === "success") return getArticleInfo();
      return;
    }
    const postRes = await favoriteApi(currentPath.split("/")[2]);
    // if (postRes === "success") return getArticleInfo();
    return;
  };

  const followClickHandler = () => {
    if (!user) return routeTo("/sign-in");
    if (data?.article && data.article?.author.following) {
      unfollowMutate(data.article.author.username);
    } else if (data?.article && !data.article.author.following) {
      followMutate(data.article?.author.username);
    }
  };

  useEffect(() => {
    return () => {
      refetch();
    };
  }, [refetch]);

  return (
    <ArticleContainer>
      <Helmet>
        <title>Article - Conduit</title>
      </Helmet>
      <ArticleInfoBanner>
        <Container>
          {isLoading ? (
            <Spinner size={100} />
          ) : (
            <>
              <ArticleTitle>{data?.article?.title}</ArticleTitle>
              <ArticleAuthor
                isUser={data?.isUser}
                article={data?.article}
                titleColor={"#fff"}
                favoritedClickHandler={favoritedClickHandler}
                followClickHandler={followClickHandler}
              />
            </>
          )}
        </Container>
      </ArticleInfoBanner>
      <Container>
        {isLoading ? (
          <Spinner size={100} />
        ) : (
          <ArticleDetail>{data?.article?.body}</ArticleDetail>
        )}
        <ArticleTagList>
          {data?.article?.tagList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ArticleTagList>
        <AritcleDivide />
        <AritcleAuthorWrapper>
          {!isLoading && (
            <ArticleAuthor
              isUser={data?.isUser}
              article={data?.article}
              titleColor={"#5cb85c"}
              favoritedClickHandler={favoritedClickHandler}
              followClickHandler={followClickHandler}
            />
          )}
        </AritcleAuthorWrapper>
        <CommentsWrapper>
          {!user ? (
            <p>
              <span onClick={() => routeTo("/sign-in")}>Sign in</span> or{" "}
              <span onClick={() => routeTo("/sign-up")}>sign up</span> to add
              comments on this article.
            </p>
          ) : (
            <Comments slug={currentPath.split("/")[2]} userInfo={user} />
          )}
        </CommentsWrapper>
      </Container>
    </ArticleContainer>
  );
}

export default Article;

const ArticleContainer = styled.div`
  padding-bottom: 66px;
`;

const ArticleInfoBanner = styled.div`
  width: 100%;
  background-color: #333;
  padding: 32px 0px;
`;

const ArticleTitle = styled.p`
  font-size: 44px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.FONT_WHITE};
  margin-bottom: 32px;
`;

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
    border: 1px solid ${({ theme }) => theme.colors.COLOR_GRAY};
    border-radius: 50px;
    color: ${({ theme }) => theme.colors.FONT_GRAY};
    font-size: 12px;
    padding: 0px 8px;
  }
`;

const AritcleDivide = styled.hr`
  margin: 30px 0px;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.BORDER_GRAY};
`;

const AritcleAuthorWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CommentsWrapper = styled.div`
  margin: 40px 0px;
  p span {
    color: ${({ theme }) => theme.colors.COLOR_GREEN};
    cursor: pointer;
  }
`;
