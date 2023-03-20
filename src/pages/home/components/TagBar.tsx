import styled from "styled-components";

const tagList = ["banana", "apple", "orange", "pineapple", "peach"];

function TagBar() {
  return (
    <TagBarContainer>
      <TagBarWrapper>
        <p>Popular Tags</p>
        <TagListWrapper>
          {tagList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </TagListWrapper>
      </TagBarWrapper>
    </TagBarContainer>
  );
}

export default TagBar;

const TagBarContainer = styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 25%;
  max-width: 25%;
`;

const TagBarWrapper = styled.div`
  width: 255px;
  height: 155px;
  padding: 5px 10px 10px;
  background-color: #f3f3f3;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  p {
    font-size: 16px;
    margin: 6px 0px;
  }
`;

const TagListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 3px;
  li {
    height: 22px;
    line-height: 20px;
    border-radius: 50px;
    background-color: #818a91;
    color: white;
    cursor: pointer;
    font-size: 14px;
    padding: 0px 8px;
  }
`;
