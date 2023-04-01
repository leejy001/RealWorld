import { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../../../components/Spinner";
import useTagsQuery from "../../../hooks/default/useTagsQuery";

interface TagProps {
  setTag: React.Dispatch<React.SetStateAction<string>>;
}

function TagBar({ setTag }: TagProps) {
  const [scrollHeight, setScrollHeight] = useState(0);
  const { isLoading, data } = useTagsQuery();
  console.log(isLoading, data);

  const onScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollHeight(window.scrollY);
    });
  }, [scrollHeight]);

  return (
    <TagBarContainer>
      <TagBarWrapper>
        <p>Popular Tags</p>
        <TagListWrapper>
          {isLoading ? (
            <Spinner size={30} />
          ) : (
            <>
              {data?.map((item: string) => (
                <li key={item} onClick={() => setTag(item)}>
                  {item}
                </li>
              ))}
            </>
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
