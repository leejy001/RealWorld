import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ArticleList from "../../../components/ArticleList";
import { getAccessTokenFromSessionStorage } from "../../../utils/accessTokenHandler";

interface TagProps {
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
}

function FeedList({ tag, setTag }: TagProps) {
  const [query, setQuery] = useState<string>("?");

  useEffect(() => {
    if (tag === "my") {
      setQuery("/feed?");
    } else if (tag !== "") {
      setQuery(`?tag=${tag}&`);
    } else {
      setQuery("?");
    }
  }, [tag]);

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
      <ArticleList query={query} />
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
