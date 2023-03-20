import styled from "styled-components";

function ListItem() {
  return (
    <ListItemContainer>
      <ListItemInfo>
        <img
          src="https://api.realworld.io/images/smiley-cyrus.jpeg"
          alt="user img"
          width="32"
          height="32"
        />
        <div>
          <p>lee12345</p>
          <p>March 17, 2023</p>
        </div>
      </ListItemInfo>
      <ListItemDesc>
        <div>
          <ListItemTitle>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit...
          </ListItemTitle>
          <ListItemSubTitle>
            There is no one who loves pain itself, who seeks after it and wants
            to have it, simply because it is pain...
          </ListItemSubTitle>
        </div>
        <div>
          <ReadMore>Read more...</ReadMore>
          <ListItemTagList>
            {[1, 2, 3].map((item) => (
              <li key={item}>tagtag</li>
            ))}
          </ListItemTagList>
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
