import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getTagApi } from "../../../api/tag";
import Spinner from "../../../components/Spinner";

interface TagProps {
  setTag: React.Dispatch<React.SetStateAction<string>>;
}

function TagBar({ setTag }: TagProps) {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [tags, setTags] = useState<string[]>([]);

  const onScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getTagsInfo = useCallback(async () => {
    const result = await getTagApi();
    if (result?.tags) setTags(result?.tags);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollHeight(window.scrollY);
    });
  }, [scrollHeight]);

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
                <li key={index} onClick={() => setTag(item)}>
                  {item}
                </li>
              ))}
            </>
          ) : (
            <Spinner size={30} />
          )}
        </TagListWrapper>
        <TopButton
          type="button"
          onClick={onScrollTop}
          scroll={scrollHeight > 500}
        >
          TOP
        </TopButton>
      </TagBarWrapper>
    </TagBarContainer>
  );
}

export default TagBar;

const TagBarContainer = styled.div`
  position: relative;
  min-height: 1px;
  flex: 0 0 25%;
  max-width: 25%;
`;

const TagBarWrapper = styled.div`
  position: fixed;
  width: 255px;
  flex: 0 0 25%;
  max-width: 25%;
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

const TopButton = styled.button<{ scroll: boolean }>`
display ${({ scroll }) => (scroll ? "block" : "none")};
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: ${({ theme }) => theme.colors.COLOR_GRAY};
  color: ${({ theme }) => theme.colors.FONT_WHITE};
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  margin-top: 10px;
`;
