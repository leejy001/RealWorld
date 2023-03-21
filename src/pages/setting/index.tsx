import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getUserInfoApi, putUserInfoApi } from "../../api/user";
import Container from "../../components/Container";
import { useRouter } from "../../hooks/useRouter";
import { UserResult } from "../../types/user";
import { removeAccessTokenFromSessionStorage } from "../../utils/accessTokenHandler";

function Setting() {
  const { routeTo } = useRouter();
  const [userInfo, setUserInfo] = useState<UserResult | null>(null);

  const signOutClickHandler = () => {
    removeAccessTokenFromSessionStorage();
    routeTo("/");
  };

  const getUserInfo = useCallback(async () => {
    const userRes = await getUserInfoApi();
    setUserInfo(userRes);
  }, []);

  const userInfoSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userInfoResult = await putUserInfoApi({
      user: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        username: formData.get("username") as string,
        bio: formData.get("bio") as string,
        image: formData.get("image") as string
      }
    });

    if (userInfoResult === null) return;

    routeTo("/");
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <Container>
      <SettingWrapper>
        <SettingTitle>Your Settings</SettingTitle>
        <SettingsForm onSubmit={userInfoSubmitHandler}>
          <input
            type="text"
            name="image"
            placeholder="URL of profile picture"
            autoComplete="false"
            defaultValue={userInfo?.user.image}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="false"
            defaultValue={userInfo?.user.username}
          />
          <textarea
            name="bio"
            placeholder="Short bio about you"
            defaultValue={userInfo?.user.bio}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="false"
            defaultValue={userInfo?.user.email}
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            autoComplete="false"
          />
          <UpdateButtonWrapper>
            <button type="submit" value="Submit">
              Update Settings
            </button>
          </UpdateButtonWrapper>
        </SettingsForm>
        <hr />
        <SignOutButtonWrapper>
          <button onClick={signOutClickHandler}>
            Or click here to logout.
          </button>
        </SignOutButtonWrapper>
      </SettingWrapper>
    </Container>
  );
}

export default Setting;

const SettingWrapper = styled.div`
  margin: 0 auto;
  padding-top: 30px;
  text-align: center;
  width: 550px;
  hr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin: 16px 0px;
  }
`;

const SettingTitle = styled.p`
  font-size: 40px;
  margin-bottom: 8px;
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  input:first-child {
    font-size: 16px;
    padding: 8px 12px;
  }
  input {
    font-size: 20px;
    padding: 12px 24px;
    border-radius: 3px;
    border: 1px solid #aaa;
    margin-bottom: 16px;
  }
  textarea {
    font-size: 20px;
    padding: 12px 24px;
    border-radius: 3px;
    border: 1px solid #aaa;
    margin-bottom: 16px;
    height: 200px;
    resize: vertical;
  }
`;

const UpdateButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 200px;
    cursor: pointer;
    padding: 12px 24px;
    color: #fff;
    font-size: 20px;
    border: none;
    background-color: #5cb85c;
    border-radius: 5px;
  }
`;

const SignOutButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  button {
    width: 200px;
    cursor: pointer;
    padding: 8px 20px;
    color: #b85c5c;
    font-size: 16px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #b85c5c;
    &:hover {
      color: #fff;
      background-color: #b85c5c;
    }
  }
`;
