import { Icon } from "@iconify/react";
import styled from "styled-components";
import { deleteArticleApi } from "../../../api/article";
import { useRouter } from "../../../hooks/useRouter";
import { ArticleInfo } from "../../../types/article";
import { changeDateFormat } from "../../../utils/changeDateFormatHandler";

interface ArticleAuthorProps {
  isUser?: boolean;
  titleColor: string;
  article?: ArticleInfo;
  favoritedClickHandler: () => void;
  followClickHandler: () => void;
}

function ArticleAuthor({
  isUser,
  titleColor,
  article,
  favoritedClickHandler,
  followClickHandler
}: ArticleAuthorProps) {
  const { currentPath, routeTo } = useRouter();

  const deleteArticleClickHandler = async () => {
    const articleDeleteResult = await deleteArticleApi(
      currentPath.split("/")[2]
    );

    if (articleDeleteResult === "fail") return;

    routeTo("-1");
  };

  return (
    <>
      {article && (
        <ArticleAuthorContainer>
          <img
            src={article.author.image}
            alt="user img"
            width="32"
            height="32"
          />
          <ArticleUserInfo titleColor={titleColor}>
            <p onClick={() => routeTo(`/profile/${article.author.username}`)}>
              {article.author.username}
            </p>
            <p>{`${changeDateFormat(article.createdAt)}`}</p>
          </ArticleUserInfo>
          {isUser ? (
            <ButtonWrppaer>
              <EditButton onClick={() => routeTo(`/editor/${article.slug}`)}>
                <Icon icon="material-symbols:edit" color="#ccc" />
                <p>&nbsp;Edit Article</p>
              </EditButton>
              <DeleteButton onClick={deleteArticleClickHandler}>
                <Icon icon="mdi:trash" color="#b85c5c" />
                <p>&nbsp;Delete Article</p>
              </DeleteButton>
            </ButtonWrppaer>
          ) : (
            <ButtonWrppaer>
              <FollowButton
                isFollowed={article.author.following}
                onClick={followClickHandler}
              >
                <Icon
                  icon="material-symbols:add"
                  color={article.author.following ? "#000" : "#fff"}
                />
                <p>
                  &nbsp;{article.author.following ? "Unfollow" : "Follow"}{" "}
                  {article.author.username}
                </p>
              </FollowButton>
              <FavoriteButton
                isFavorited={article.favorited}
                onClick={favoritedClickHandler}
              >
                <Icon
                  icon="mdi:cards-heart"
                  color={article.favorited ? "#fff" : "#5cb85c"}
                />
                <p>
                  &nbsp;{article.favorited ? "Unfavorite" : "Favorite"} Article
                  ({article.favoritesCount})
                </p>
              </FavoriteButton>
            </ButtonWrppaer>
          )}
        </ArticleAuthorContainer>
      )}
    </>
  );
}

export default ArticleAuthor;

const ArticleAuthorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  img {
    border-radius: 50%;
  }
`;

const ArticleUserInfo = styled.div<{ titleColor: string }>`
  p:nth-child(1) {
    font-size: 16px;
    cursor: pointer;
    color: ${({ titleColor }) => titleColor};
    &:hover {
      text-decoration: underline;
    }
  }
  p:nth-child(2) {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.FONT_GRAY};
  }
`;

const ButtonWrppaer = styled.div`
  display: flex;
  gap: 5px;
  padding-left: 10px;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.COLOR_GRAY};
  color: ${({ theme }) => theme.colors.FONT_GRAY};
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.COLOR_RED};
  color: ${({ theme }) => theme.colors.FONT_RED};
`;

const FollowButton = styled.button<{ isFollowed: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  background-color: ${({ isFollowed, theme }) =>
    isFollowed ? theme.colors.COLOR_GRAY : "transparent"};
  border: 1px solid ${({ theme }) => theme.colors.COLOR_GRAY};
  border-radius: 3px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.HOVER_GRAY};
  }
  p {
    color: ${({ isFollowed, theme }) =>
      isFollowed ? theme.colors.FONT_BLACK : theme.colors.FONT_GRAY};
    font-size: 14px;
  }
`;

const FavoriteButton = styled.button<{ isFavorited: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  background-color: ${({ isFavorited, theme }) =>
    isFavorited ? theme.colors.FONT_GREEN : "transparent"};
  border: 1px solid ${({ theme }) => theme.colors.COLOR_GREEN};
  border-radius: 3px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.HOVER_GRAY};
  }
  p {
    color: ${({ isFavorited, theme }) =>
      isFavorited ? theme.colors.FONT_WHITE : theme.colors.FONT_GREEN};
    font-size: 14px;
  }
`;
