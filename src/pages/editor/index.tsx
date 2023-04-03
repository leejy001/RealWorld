import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Container from "../../components/Container";
import { useRouter } from "../../hooks/useRouter";
import useCreateArticleMutation from "../../hooks/article/useCreateArticleMutation";
import useEditArticleMutation from "../../hooks/article/useEditArticleMutation";
import useArticleQuery from "../../hooks/article/useArticleQuery";

function Editor() {
  const { currentPath } = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const { data } = useArticleQuery(currentPath.split("/")[2]);
  const { mutate: createMutation } = useCreateArticleMutation();
  const { mutate: editMutation } = useEditArticleMutation();

  const initStateHandler = useCallback(async () => {
    if (data?.article) {
      setTagList(data.article.tagList);
      setIsEdit(true);
    }
  }, [data?.article]);

  const articleSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isEdit) {
      editMutation({
        slug: currentPath.split("/")[2],
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        body: formData.get("body") as string,
        tagList: tagList
      });
    } else {
      createMutation({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        body: formData.get("body") as string,
        tagList: tagList
      });
    }
    return;
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
    initStateHandler();
  }, [initStateHandler]);

  return (
    <Container>
      <Helmet>
        <title>Editor - Conduit</title>
      </Helmet>
      <NewArticleForm onSubmit={articleSubmitHandler}>
        <input
          type="text"
          name="title"
          placeholder="Article Title"
          autoComplete="false"
          defaultValue={data?.article?.title}
        />
        <input
          type="text"
          name="description"
          placeholder="What's this article about?"
          autoComplete="false"
          defaultValue={data?.article?.description}
        />
        <textarea
          name="body"
          placeholder="Write your article (in markdown)"
          defaultValue={data?.article?.body}
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
          {tagList.map((item) => (
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
    border: 1px solid ${({ theme }) => theme.colors.COLOR_GRAY};
    margin-bottom: 16px;
  }
  textarea {
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.COLOR_GRAY};
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
    background-color: ${({ theme }) => theme.colors.COLOR_GRAY};
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
    color: ${({ theme }) => theme.colors.COLOR_WHITE};
    font-size: 20px;
    border: none;
    background-color: ${({ theme }) => theme.colors.COLOR_GREEN};
    border-radius: 5px;
  }
`;
