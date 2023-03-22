import styled from "styled-components";
import { useRouter } from "../hooks/useRouter";
import { ArticleInfo } from "../types/article";

interface ArticleProps {
  article: ArticleInfo;
}

function ListItem({ article }: ArticleProps) {
  const { routeTo } = useRouter();

  return (
    <ListItemContainer onClick={() => routeTo(`/article/${article.slug}`)}>
      <ListItemInfo>
        <img src={article.author.image} alt="user img" width="32" height="32" />
        <div>
          <p>{article.author.username}</p>
          <p>March 17, 2023</p>
        </div>
      </ListItemInfo>
      <ListItemDesc>
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
      </ListItemDesc>
    </ListItemContainer>
  );
}

export default ListItem;

const ListItemContainer = styled.li`
  padding: 24px 0px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ListItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
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
    }
    p:last-child {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;

const ListItemDesc = styled.div`
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
