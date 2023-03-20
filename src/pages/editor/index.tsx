import styled from "styled-components";
import Container from "../../components/Container";

function Editor() {
  return (
    <Container>
      <NewArticleForm>
        <input type="text" placeholder="Article Title" autoComplete="false" />
        <input
          type="text"
          placeholder="What's this article about?"
          autoComplete="false"
        />
        <textarea placeholder="Write your article (in markdown)" />
        <input type="text" placeholder="Enter tags" autoComplete="false" />
        <ButtonWrapper>
          <button>Publish Article</button>
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
