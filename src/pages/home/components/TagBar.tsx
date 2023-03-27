import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getTagApi } from "../../../api/tag";

interface TagProps {
  setTag: React.Dispatch<React.SetStateAction<string>>;
}

function TagBar({ setTag }: TagProps) {
  const [tags, setTags] = useState<string[]>([]);

  const getTagsInfo = useCallback(async () => {
    const result = await getTagApi();
    if (result?.tags) setTags(result?.tags);
  }, []);

  const tagClickHandler = (tag: string) => {
    setTag(tag);
  };

  useEffect(() => {
    getTagsInfo();
  }, [getTagsInfo]);

  return (
    <TagBarContainer>
      <TagBarWrapper>
        <p>Popular Tags</p>
        <TagListWrapper>
          {tags.length > 0 ? (
            <>
              {tags.map((item, index) => (
                <li key={index} onClick={() => tagClickHandler(item)}>
                  {item}
                </li>
              ))}
            </>
          ) : (
            <p>loading...</p>
          )}
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
    background-color: ${({ theme }) => theme.colors.COLOR_GRAY};
    color: white;
    cursor: pointer;
    font-size: 14px;
    padding: 0px 8px;
  }
`;
