import styled from "styled-components";
import Container from "../../components/Container";
import Banner from "./components/Banner";
import FeedList from "./components/FeedList";
import TagBar from "./components/TagBar";
import { getAccessTokenFromSessionStorage } from "../../utils/accessTokenHandler";
import { Suspense, useState } from "react";
import Spinner from "../../components/Spinner";

function Home() {
  const [tag, setTag] = useState<string>(
    !getAccessTokenFromSessionStorage() ? "" : "my"
  );

  return (
    <HomeContainer>
      {!getAccessTokenFromSessionStorage() && <Banner />}
      <Container>
        <FeedList tag={tag} setTag={setTag} />
        <Suspense fallback={<Spinner size={30} />}>
          <TagBar setTag={setTag} />
        </Suspense>
      </Container>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  padding-bottom: 100px;
  div:last-child {
    display: flex;
  }
`;
