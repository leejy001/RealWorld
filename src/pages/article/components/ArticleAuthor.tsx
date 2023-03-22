import { Icon } from "@iconify/react";
import styled from "styled-components";
import { useRouter } from "../../../hooks/useRouter";
import { ArticleInfo } from "../../../types/article";

interface ArticleAuthorProps {
  isUser: boolean;
  titleColor: string;
  article: ArticleInfo;
}

function ArticleAuthor({ isUser, titleColor, article }: ArticleAuthorProps) {
  const { routeTo } = useRouter();

  return (
    <ArticleAuthorContainer>
      <img src={article.author.image} alt="user img" width="32" height="32" />
      <ArticleUserInfo titleColor={titleColor}>
        <p onClick={() => routeTo(`/profile/${article.author.username}`)}>
          {article.author.username}
        </p>
        <p>{article.createdAt}</p>
      </ArticleUserInfo>
      {isUser ? (
        <ButtonWrppaer>
          <EditButton onClick={() => routeTo(`/editor/${article.slug}`)}>
            <Icon icon="material-symbols:edit" color="#ccc" />
            <p>&nbsp;Edit Article</p>
          </EditButton>
          <DeleteButton>
            <Icon icon="mdi:trash" color="#b85c5c" />
            <p>&nbsp;Delete Article</p>
          </DeleteButton>
        </ButtonWrppaer>
      ) : (
        <ButtonWrppaer>
          <FollowButton isFollowed={article.author.following}>
            <Icon icon="material-symbols:add" color="#ccc" />
            <p>&nbsp;Follow {article.author.username}</p>
          </FollowButton>
          <FavoriteButton isFavorited={article.favorited}>
            <Icon icon="mdi:cards-heart" color="#5cb85c" />
            <p>&nbsp;Favorite Article ({article.favoritesCount})</p>
          </FavoriteButton>
        </ButtonWrppaer>
      )}
    </ArticleAuthorContainer>
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
    color: #bbb;
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
  border: 1px solid #ccc;
  color: #ccc;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  background-color: transparent;
  border: 1px solid #b85c5c;
  color: #b85c5c;
`;

const FollowButton = styled.button<{ isFollowed: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  background-color: ${({ isFollowed }) =>
    isFollowed ? "#ccc" : "transparent"};
  border: 1px solid #ccc;
  border-radius: 3px;
  p {
    color: ${({ isFollowed }) => (isFollowed ? "#000" : "#ccc")};
    font-size: 14px;
  }
`;

const FavoriteButton = styled.button<{ isFavorited: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  background-color: ${({ isFavorited }) =>
    isFavorited ? "#5cb85c" : "transparent"};
  border: 1px solid #5cb85c;
  border-radius: 3px;
  p {
    color: ${({ isFavorited }) => (isFavorited ? "#fff" : "#5cb85c")};
    font-size: 14px;
  }
`;
