import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import Container from "../../../components/Container";
import { getProfileApi } from "../../../api/profile";
import { getUserInfoApi } from "../../../api/user";
import { ProfileResult } from "../../../types/profile";
import { useRouter } from "../../../hooks/useRouter";

interface ProfileProps {
  isSignIn: boolean;
}

function ProfileBanner({ isSignIn }: ProfileProps) {
  const { currentPath, routeTo } = useRouter();
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileResult | null>(null);

  const getUserProfileInfo = useCallback(async () => {
    const profileUser = await getProfileApi(
      currentPath.split("/")[2].replace("@", "")
    );
    setProfile(profileUser);
    if (isSignIn) {
      const curUser = await getUserInfoApi();
      setIsCurrent(curUser?.user.username === profileUser?.profile.username);
    }
  }, [isSignIn, currentPath]);

  useEffect(() => {
    getUserProfileInfo();
  }, [getUserProfileInfo]);

  return (
    <ProfileBannerContainer>
      {profile && (
        <Container>
          <img
            src={profile.profile.image}
            alt="user img"
            width="100"
            height="100"
          />
          <ProfileName>{profile.profile.username}</ProfileName>
          <ProfileBio>{profile.profile.bio}</ProfileBio>
          {isCurrent ? (
            <EditProfileButton onClick={() => routeTo("/setting")}>
              <Icon icon="mdi:gear" color="gray" />
              <p>&nbsp;Edit Profile Settings</p>
            </EditProfileButton>
          ) : (
            <FollowButton isFollowed={profile.profile.following}>
              <Icon icon="material-symbols:add" color="#ccc" />
              <p>&nbsp;Follow {profile.profile.username}</p>
            </FollowButton>
          )}
        </Container>
      )}
    </ProfileBannerContainer>
  );
}

export default ProfileBanner;

const ProfileBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 230px;
  background-color: #f3f3f3;
  padding: 32px 0px 16px;
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

const EditProfileButton = styled.button`
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

const FollowButton = styled.button<{ isFollowed: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: ${({ isFollowed }) => (isFollowed ? "#ccc" : "#fff")};
  cursor: pointer;
  padding: 4px 8px;
  p {
    color: ${({ isFollowed }) => (isFollowed ? "#fff" : "#ccc")};
    font-size: 14px;
  }
`;
