import { Icon } from "@iconify/react";
import { useState } from "react";
import styled from "styled-components";
import { favoriteApi, unfavoriteApi } from "../api/favorite";
import { useRouter } from "../hooks/useRouter";
import { ArticleInfo } from "../types/article";
import { getAccessTokenFromSessionStorage } from "../utils/accessTokenHandler";
import { changeDateFormat } from "../utils/changeDateFormatHandler";

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
            <ListItemAuthor
              onClick={() => routeTo(`/profile/${article.author.username}`)}
            >
              {article.author.username}
            </ListItemAuthor>
            <ListItemCreateAt>{`${changeDateFormat(
              article.createdAt
            )}`}</ListItemCreateAt>
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.BORDER_GRAY};
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
  }
`;

const ListItemAuthor = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.FONT_GREEN};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ListItemCreateAt = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.FONT_GRAY};
`;

const FavoriteButton = styled.button<{ isFavorited: boolean }>`
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.COLOR_GREEN};
  border-radius: 3px;
  cursor: pointer;
  p {
    font-size: 14px;
    font-weight: 600;
    color: ${({ isFavorited, theme }) =>
      isFavorited ? theme.colors.FONT_WHITE : theme.colors.FONT_GREEN};
  }
  background-color: ${({ isFavorited, theme }) =>
    isFavorited ? theme.colors.FONT_GREEN : theme.colors.FONT_WHITE};
  &:hover {
    background-color: ${(props) => props.theme.colors.HOVER_GRAY};
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
  color: ${({ theme }) => theme.colors.FONT_BLACK};
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
  color: ${({ theme }) => theme.colors.FONT_GRAY};
  font-size: 16px;
  font-weight: 300;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReadMore = styled.p`
  color: ${({ theme }) => theme.colors.FONT_GRAY};
  font-size: 12px;
`;

const ListItemTagList = styled.ul`
  display: flex;
  gap: 3px;
  li {
    height: 18px;
    line-height: 14px;
    border: 0.5px solid ${({ theme }) => theme.colors.COLOR_GRAY};
    border-radius: 50px;
    color: ${({ theme }) => theme.colors.FONT_GRAY};
    cursor: pointer;
    font-size: 12px;
    padding: 0px 8px;
  }
`;
