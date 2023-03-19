import React from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import Banner from "./components/Banner";
import FeedList from "./components/FeedList";
import TagBar from "./components/TagBar";

function Home() {
  return (
    <HomeContainer>
      {true && <Banner />}
      <Container>
        <FeedList />
        <TagBar />
      </Container>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  padding-bottom: 66px;
  div:nth-child(2) {
    display: flex;
  }
`;
