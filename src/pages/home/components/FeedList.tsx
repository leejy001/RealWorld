import { Icon } from "@iconify/react";
import { useState } from "react";
import styled from "styled-components";
import ListItem from "../../../components/ListItem";

function FeedList() {
  const [feed, setFeed] = useState("feed");
  return (
    <FeedListContainer>
      <FeedListNav>
        {false && (
          <li
            className={feed === "my" ? "active" : ""}
            onClick={() => setFeed("my")}
          >
            Your Feed
          </li>
        )}
        <li
          className={feed === "global" ? "active" : ""}
          onClick={() => setFeed("global")}
        >
          Global Feed
        </li>
        {feed !== "my" && feed !== "global" && (
          <li className="active">
            <Icon icon="mdi:pound" color="#5cb85c" />
            &nbsp;{feed}
          </li>
        )}
      </FeedListNav>
      <FeedListWrapper>
        {[1, 2, 3, 4, 5].map((item) => (
          <ListItem key={item} />
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
