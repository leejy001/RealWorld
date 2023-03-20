import styled from "styled-components";
import Container from "../../components/Container";
import ArticleList from "./components/ArticleList";
import ProfileBanner from "./components/ProfileBanner";

function User() {
  return (
    <UserContainer>
      <ProfileBanner />
      <Container>
        <ArticleList />
      </Container>
    </UserContainer>
  );
}

export default User;

const UserContainer = styled.div`
  padding-bottom: 66px;
`;
