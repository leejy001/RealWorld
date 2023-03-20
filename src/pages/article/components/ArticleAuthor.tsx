import { Icon } from "@iconify/react";
import styled from "styled-components";

interface ArticleAuthorProps {
  titleColor: string;
}

function ArticleAuthor({ titleColor }: ArticleAuthorProps) {
  return (
    <ArticleAuthorContainer>
      <img
        src="https://api.realworld.io/images/smiley-cyrus.jpeg"
        alt="user img"
        width="32"
        height="32"
      />
      <ArticleUserInfo titleColor={titleColor}>
        <p>
          <a href="/@lee12345">lee12345</a>
        </p>
        <p>March 17, 2023</p>
      </ArticleUserInfo>
      <ButtonWrppaer>
        <FollowButton>
          <Icon icon="material-symbols:add" color="#ccc" />
          <p>&nbsp;Follow lee12345</p>
        </FollowButton>
        <FavoriteButton>
          <Icon icon="mdi:cards-heart" color="#5cb85c" />
          <p>&nbsp;Favorite Article (659)</p>
        </FavoriteButton>
      </ButtonWrppaer>
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
    a {
      font-size: 16px;
      color: ${({ titleColor }) => titleColor};
      &:hover {
        text-decoration: underline;
      }
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

const FollowButton = styled.button`
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: flex;
  align-items: center;
  color: #ccc;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 14px;
`;

const FavoriteButton = styled.button`
  background-color: transparent;
  border: 1px solid #5cb85c;
  border-radius: 3px;
  display: flex;
  align-items: center;
  color: #5cb85c;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 14px;
`;
