import { Icon } from "@iconify/react";
import styled from "styled-components";
import Container from "../../../components/Container";
import { useRouter } from "../../../hooks/useRouter";
import { useProfileFollowMutation } from "../../../hooks/profile/useFollowMutation";
import { useProfileUnfollowMutation } from "../../../hooks/profile/useUnfollowMutation";
import useProfileQuery from "../../../hooks/profile/useProfileQuery";
import useUserQuery from "../../../hooks/user/useUserQuery";

function ProfileBanner() {
  const { currentPath, routeTo } = useRouter();
  const { data: user } = useUserQuery();
  const { data } = useProfileQuery(currentPath.split("/")[2]);
  const { mutate: followMutate } = useProfileFollowMutation();
  const { mutate: unfollowMutate } = useProfileUnfollowMutation();

  const followClickHandler = () => {
    if (!user) return routeTo("/sign-in");
    if (data?.profile && data.profile.following) {
      unfollowMutate(data?.profile.username);
    } else if (data?.profile && !data.profile.following) {
      followMutate(data?.profile.username);
    }
  };

  return (
    <ProfileBannerContainer>
      {data?.profile && (
        <Container>
          <img
            src={data.profile.image}
            alt="user img"
            width="100"
            height="100"
          />
          <ProfileName>{data.profile.username}</ProfileName>
          <ProfileBio>{data.profile.bio}</ProfileBio>
          {data.isUser ? (
            <EditProfileButton onClick={() => routeTo("/setting")}>
              <Icon icon="mdi:gear" color="gray" />
              <p>&nbsp;Edit Profile Settings</p>
            </EditProfileButton>
          ) : (
            <FollowButton
              isFollowed={data.profile.following}
              onClick={followClickHandler}
            >
              <Icon
                icon="material-symbols:add"
                color={data.profile.following ? "#000" : "gray"}
              />
              <p>
                &nbsp;{data.profile.following ? "Unfollow" : "Follow"}{" "}
                {data.profile.username}
              </p>
            </FollowButton>
          )}
        </Container>
      )}
    </ProfileBannerContainer>
  );
}

export default ProfileBanner;

const ProfileBannerContainer = styled.div`
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
  color: ${({ theme }) => theme.colors.FONT_GRAY};
  margin-bottom: 32px;
`;

const EditProfileButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.COLOR_GRAY};
  border-radius: 3px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.FONT_GRAY};
  cursor: pointer;
  padding: 4px 8px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.HOVER_GRAY};
  }
`;

const FollowButton = styled.button<{ isFollowed: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.COLOR_GRAY};
  border-radius: 3px;
  background-color: ${({ isFollowed, theme }) =>
    isFollowed ? theme.colors.FONT_WHITE : "transparent"};
  cursor: pointer;
  padding: 4px 8px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.HOVER_GRAY};
  }
  p {
    color: ${({ isFollowed, theme }) =>
      isFollowed ? theme.colors.FONT_BLACK : theme.colors.FONT_GRAY};
    font-size: 14px;
  }
`;
