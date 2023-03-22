import styled from "styled-components";
import Container from "../../components/Container";
import { getAccessTokenFromSessionStorage } from "../../utils/accessTokenHandler";
import ArticleList from "./components/ArticleList";
import ProfileBanner from "./components/ProfileBanner";

function User() {
  return (
    <UserContainer>
      <ProfileBanner isSignIn={getAccessTokenFromSessionStorage() !== null} />
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
