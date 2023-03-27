import { Icon } from "@iconify/react";
import { useState } from "react";
import styled from "styled-components";
import { favoriteApi, unfavoriteApi } from "../api/favorite";
import { useRouter } from "../hooks/useRouter";
import { ArticleInfo } from "../types/article";
import { getAccessTokenFromSessionStorage } from "../utils/accessTokenHandler";

interface ArticleProps {
  article: ArticleInfo;
}

function ListItem({ article }: ArticleProps) {
  const { routeTo } = useRouter();
  const [isFavorited, setIsFavorited] = useState<boolean>(article.favorited);
  const [favoriteCount, setFavoriteCount] = useState<number>(
    article.favoritesCount
  );

  const favoritedClickHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!getAccessTokenFromSessionStorage()) {
      return routeTo("/sign-in");
    }
    if (article?.favorited) {
      const deleteRes = await unfavoriteApi(article.slug);
      if (deleteRes === "success") {
        setIsFavorited(false);
        setFavoriteCount(favoriteCount - 1);
      }
      return;
    }
    const postRes = await favoriteApi(article.slug);
    if (postRes === "success") {
      setIsFavorited(true);
      setFavoriteCount(favoriteCount + 1);
    }
    return;
  };

  return (
    <ListItemContainer>
      <ListItemHeader>
        <ListItemHeaderInfo>
          <img
            src={article.author.image}
            alt="user img"
            width="32"
            height="32"
          />
          <div>
            <p onClick={() => routeTo(`/profile/${article.author.username}`)}>
              {article.author.username}
            </p>
            <p>March 17, 2023</p>
          </div>
        </ListItemHeaderInfo>
        <FavoriteButton
          isFavorited={isFavorited}
          onClick={favoritedClickHandler}
        >
          <Icon
            icon="mdi:cards-heart"
            color={isFavorited ? "#fff" : "#5cb85c"}
          />
          <p>{favoriteCount}</p>
        </FavoriteButton>
      </ListItemHeader>
      <ListItemBody onClick={() => routeTo(`/article/${article.slug}`)}>
        <div>
          <ListItemTitle>{article.title}</ListItemTitle>
          <ListItemSubTitle>{article.description}</ListItemSubTitle>
        </div>
        <div>
          <ReadMore>Read more...</ReadMore>
          {article.tagList.length > 0 && (
            <ListItemTagList>
              {article.tagList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ListItemTagList>
          )}
        </div>
      </ListItemBody>
    </ListItemContainer>
  );
}

export default ListItem;

const ListItemContainer = styled.li`
  padding: 24px 0px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ListItemHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: space-between;
`;

const ListItemHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    line-height: 1;
    p:first-child {
      font-size: 16px;
      color: #5cb85c;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    p:last-child {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;

const FavoriteButton = styled.button<{ isFavorited: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border: 1px solid #5cb85c;
  border-radius: 3px;
  cursor: pointer;
  p {
    font-size: 14px;
    font-weight: 600;
    color: ${({ isFavorited }) => (isFavorited ? "#fff" : "#5cb85c")};
  }
  background-color: ${({ isFavorited }) => (isFavorited ? "#5cb85c" : "#fff")};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ListItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
  }
`;

const ListItemTitle = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 3px;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ListItemSubTitle = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #999;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReadMore = styled.p`
  font-size: 12px;
  color: #aaa;
`;

const ListItemTagList = styled.ul`
  display: flex;
  gap: 3px;
  li {
    height: 18px;
    line-height: 14px;
    border: 0.5px solid #aaa;
    border-radius: 50px;
    color: #aaa;
    cursor: pointer;
    font-size: 12px;
    padding: 0px 8px;
  }
`;
