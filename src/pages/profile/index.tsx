import styled from "styled-components";
import Container from "../../components/Container";
import ArticleBody from "./components/ArticleBody";
import ProfileBanner from "./components/ProfileBanner";

function Profile() {
  return (
    <UserContainer>
      <ProfileBanner />
      <Container>
        <ArticleBody />
      </Container>
    </UserContainer>
  );
}

export default Profile;

const UserContainer = styled.div`
  padding-bottom: 66px;
`;
