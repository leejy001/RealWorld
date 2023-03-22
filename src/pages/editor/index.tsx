import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getArticleInfoApi, postArticleApi } from "../../api/article";
import Container from "../../components/Container";
import { useRouter } from "../../hooks/useRouter";
import { PutArticleRequest } from "../../types/article";

const initArticle = {
  title: "",
  description: "",
  body: ""
};

function Editor() {
  const { pathname } = useLocation();
  const { routeTo } = useRouter();
  const [article, setArticle] = useState<PutArticleRequest>(initArticle);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const getArticleInfo = useCallback(async () => {
    const result = await getArticleInfoApi(pathname.split("/")[2]);
    if (result?.article)
      setArticle({
        title: result?.article.title,
        description: result?.article.description,
        body: result?.article.body
      });
    setTagList(result?.article.tagList || []);
  }, [pathname]);

  const articleSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const articleResult = await postArticleApi({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      body: formData.get("body") as string,
      tagList
    });

    if (articleResult === "fail") return;

    routeTo("/");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setTag(val);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!tagList.includes(tag)) {
        setTagList([...tagList, tag]);
        setTag("");
      }
    }
  };

  const removeTagClickHandler = (target: string) => {
    setTagList(tagList.filter((tag) => tag !== target));
  };

  useEffect(() => {
    setArticle(initArticle);
    if (pathname.split("/")[2]) {
      getArticleInfo();
    }
  }, [getArticleInfo, pathname]);

  return (
    <Container>
      <NewArticleForm onSubmit={articleSubmitHandler}>
        <input
          type="text"
          name="title"
          placeholder="Article Title"
          autoComplete="false"
          defaultValue={article.title}
        />
        <input
          type="text"
          name="description"
          placeholder="What's this article about?"
          autoComplete="false"
          defaultValue={article.description}
        />
        <textarea
          name="body"
          placeholder="Write your article (in markdown)"
          defaultValue={article.body}
        />
        <input
          type="text"
          placeholder="Enter tags"
          autoComplete="false"
          value={tag}
          onChange={handleChange}
          onKeyDown={onEnter}
        />
        <TagListWrapper>
          {tagList?.map((item) => (
            <li key={item}>
              <span onClick={() => removeTagClickHandler(item)}>X</span>
              &nbsp;{item}
            </li>
          ))}
        </TagListWrapper>
        <ButtonWrapper>
          <button type="submit" value="Submit">
            Publish Article
          </button>
        </ButtonWrapper>
      </NewArticleForm>
    </Container>
  );
}

export default Editor;

const NewArticleForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 90px;
  input:first-child {
    font-size: 20px;
    padding: 12px 24px;
  }
  input {
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 3px;
    border: 1px solid #aaa;
    margin-bottom: 16px;
  }
  textarea {
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid #aaa;
    padding: 8px 12px;
    margin-bottom: 16px;
    height: 200px;
    resize: vertical;
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
    font-size: 14px;
    padding: 0px 8px;
    span {
      cursor: pointer;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 200px;
    cursor: pointer;
    padding: 12px 24px;
    color: #fff;
    font-size: 20px;
    border: none;
    background-color: #5cb85c;
    border-radius: 5px;
  }
`;
