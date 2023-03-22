import styled from "styled-components";
import Container from "../../components/Container";
import { getAccessTokenFromSessionStorage } from "../../utils/accessTokenHandler";
import ArticleBody from "./components/ArticleBody";
import ProfileBanner from "./components/ProfileBanner";

function User() {
  return (
    <UserContainer>
      <ProfileBanner isSignIn={getAccessTokenFromSessionStorage() !== null} />
      <Container>
        <ArticleBody />
      </Container>
    </UserContainer>
  );
}

export default User;

const UserContainer = styled.div`
  padding-bottom: 66px;
`;
