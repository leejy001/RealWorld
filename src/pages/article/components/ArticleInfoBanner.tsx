import styled from "styled-components";
import Container from "../../../components/Container";
import ArticleAuthor from "./ArticleAuthor";

function AritcleInfoBanner() {
  return (
    <ArticleInfoBanner>
      <Container>
        <ArticleTitle>
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit...
        </ArticleTitle>
        <ArticleAuthor titleColor={"#fff"} />
      </Container>
    </ArticleInfoBanner>
  );
}

export default AritcleInfoBanner;

const ArticleInfoBanner = styled.div`
  width: 100%;
  background-color: #333;
  padding: 32px 0px;
`;

const ArticleTitle = styled.p`
  font-size: 44px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 32px;
`;
