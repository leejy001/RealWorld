import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  getGlobalArticleInfoApi,
  getMyArticleInfoApi
} from "../../../api/article";
import ListItem from "../../../components/ListItem";
import { ArticleInfo } from "../../../types/article";
import { getAccessTokenFromSessionStorage } from "../../../utils/accessTokenHandler";

interface TagProps {
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
}

function FeedList({ tag, setTag }: TagProps) {
  const [articles, setArticles] = useState<ArticleInfo[]>([]);

  const getArticleInfo = useCallback(async () => {
    console.log(tag);
    if (tag === "my") {
      const result = await getMyArticleInfoApi({ limit: 10, offset: 0 });
      if (result?.articles) setArticles(result?.articles);
      else setArticles([]);
    } else {
      const result = await getGlobalArticleInfoApi({ limit: 10, offset: 0 });
      if (result?.articles) setArticles(result?.articles);
    }
  }, [tag]);

  useEffect(() => {
    getArticleInfo();
  }, [getArticleInfo]);

  return (
    <FeedListContainer>
      <FeedListNav>
        {getAccessTokenFromSessionStorage() && (
          <li
            className={tag === "my" ? "active" : ""}
            onClick={() => setTag("my")}
          >
            Your Feed
          </li>
        )}
        <li className={tag === "" ? "active" : ""} onClick={() => setTag("")}>
          Global Feed
        </li>
        {tag !== "my" && tag !== "" && (
          <li className="active">
            <Icon icon="mdi:pound" color="#5cb85c" />
            &nbsp;{tag}
          </li>
        )}
      </FeedListNav>
      <FeedListWrapper>
        {articles.map((item) => (
          <ListItem key={item.slug} article={item} />
        ))}
      </FeedListWrapper>
    </FeedListContainer>
  );
}

export default FeedList;

const FeedListContainer = styled.div`
  position: relative;
  flex: 0 0 75%;
  max-width: 75%;
  padding-right: 15px;
`;

const FeedListNav = styled.ul`
  display: flex;
  li {
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 8px 16px;
    color: #aaa;
    cursor: pointer;
    margin-bottom: -1px;
    &:hover {
      color: #373a3c;
    }
  }
  li.active {
    color: #5cb85c;
    border-bottom: 2px solid #5cb85c;
  }
  border-bottom: 1px solid #aaa;
`;

const FeedListWrapper = styled.ul``;
