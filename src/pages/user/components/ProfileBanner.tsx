import { Icon } from "@iconify/react";
import styled from "styled-components";
import Container from "../../../components/Container";

function ProfileBanner() {
  return (
    <ProfileBannerContainer>
      <Container>
        <img
          src="https://api.realworld.io/images/smiley-cyrus.jpeg"
          alt="user img"
          width="100"
          height="100"
        />
        <ProfileName>lee12345</ProfileName>
        <ProfileBio>Hello!!</ProfileBio>
        <EditProfileButton href="/setting">
          <Icon icon="mdi:gear" color="gray" />
          <p>&nbsp;Edit Profile Settings</p>
        </EditProfileButton>
      </Container>
    </ProfileBannerContainer>
  );
}

export default ProfileBanner;

const ProfileBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f3f3f3;
  padding: 32px 0px;
  div:first-child {
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    img {
      margin-bottom: 8px;
      border-radius: 50%;
    }
  }
`;

const ProfileName = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

const ProfileBio = styled.p`
  font-size: 16px;
  color: #aaa;
  margin-bottom: 32px;
`;

const EditProfileButton = styled.a`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  border: 1px solid #999;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0);
  color: #999;
  cursor: pointer;
  padding: 4px 8px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
