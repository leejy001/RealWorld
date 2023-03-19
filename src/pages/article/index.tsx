import { Icon } from "@iconify/react";
import styled from "styled-components";
import Container from "../../components/Container";
import ArticleAuthor from "./components/ArticleAuthor";
import ArticleInfoBanner from "./components/ArticleInfoBanner";

function Article() {
  return (
    <>
      <ArticleInfoBanner />
      <Container>
        <ArticleDetail>
          Quia quo iste et aperiam voluptas consectetur a omnis et.\nDolores et
          earum consequuntur sunt et.\nEa nulla ab voluptatem dicta vel.
          Temporibus aut adipisci magnam aliquam eveniet nihil laudantium
          reprehenderit sit.\nAspernatur cumque labore voluptates mollitia
          deleniti et. Quos pariatur tenetur.\nQuasi omnis eveniet eos maiores
          esse magni possimus blanditiis.\nQui incidunt sit quos consequatur aut
          qui et aperiam delectus.\nPraesentium quas culpa.\nEaque occaecati
          cumque incidunt et. Provident saepe omnis non molestiae natus
          et.\nAccusamus laudantium hic unde voluptate et sunt
          voluptatem.\nMollitia velit id eius mollitia occaecati repudiandae.
          Voluptatum tempora voluptas est odio iure odio dolorem.\nVoluptatum
          est deleniti explicabo explicabo harum provident quis molestiae. Sed
          dolores nostrum quis. Aut ipsa et qui vel similique sed hic
          a.\nVoluptates dolorem culpa nihil aut ipsam voluptatem. Cupiditate
          officia voluptatum.\nTenetur facere eum distinctio animi qui
          laboriosam.\nQuod sed voluptatem et cumque est eos.\nSint id provident
          suscipit harum odio et. Facere beatae delectus ut.\nPossimus voluptas
          perspiciatis voluptatem nihil sint praesentium.\nSint est nihil
          voluptates nesciunt voluptatibus temporibus blanditiis.\nOfficiis
          voluptatem earum sed. Deserunt ab porro similique est accusamus id
          enim aut suscipit.\nSoluta reprehenderit error nesciunt odit veniam
          sed.\nDolore optio qui aut ab.\nAut minima provident eius repudiandae
          a quibusdam in nisi quam.
        </ArticleDetail>
        <ArticleTagList>
          {[1, 2, 3, 4].map((item) => (
            <li key={item}>tagtag</li>
          ))}
        </ArticleTagList>
        <AritcleDivide />
        <AritcleAuthorWrapper>
          <ArticleAuthor titleColor={"#5cb85c"} />
        </AritcleAuthorWrapper>
        <CommentWrapper>
          <p>
            <span>Sign in</span> or <span>sign up</span> to add comments on this
            article.
          </p>
        </CommentWrapper>
      </Container>
    </>
  );
}

export default Article;

const ArticleDetail = styled.p`
  font-size: 20px;
  margin: 32px 0px;
  line-height: 1.4;
`;

const ArticleTagList = styled.ul`
  display: flex;
  gap: 3px;
  li {
    height: 18px;
    line-height: 14px;
    border: 1px solid #aaa;
    border-radius: 50px;
    color: #aaa;
    font-size: 12px;
    padding: 0px 8px;
  }
`;

const AritcleDivide = styled.hr`
  margin: 30px 0px;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const AritcleAuthorWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CommentWrapper = styled.div`
  margin: 40px 0px;
  p span {
    color: #5cb85c;
  }
`;
