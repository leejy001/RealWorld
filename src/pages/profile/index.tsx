import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Container from "../../components/Container";
import ArticleBody from "./components/ArticleBody";
import ProfileBanner from "./components/ProfileBanner";
import { Suspense } from "react";
import Spinner from "../../components/Spinner";

function Profile() {
  return (
    <UserContainer>
      <Helmet>
        <title>Profile - Conduit</title>
      </Helmet>
      <ProfileBannerWrapper>
        <Suspense fallback={<Spinner size={100} />}>
          <ProfileBanner />
        </Suspense>
      </ProfileBannerWrapper>
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

const ProfileBannerWrapper = styled.div`
  width: 100%;
  min-height: 230px;
  background-color: #f3f3f3;
  padding: 32px 0px 16px;
`;
