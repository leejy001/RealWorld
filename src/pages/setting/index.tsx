import { useContext } from "react";
import styled from "styled-components";
import { putUserInfoApi } from "../../api/user";
import Container from "../../components/Container";
import {
  AuthContext,
  AuthContextInfo
} from "../../contexts/AuthContextProvider";
import { useRouter } from "../../hooks/useRouter";
import {
  removeAccessTokenFromSessionStorage,
  saveAccessTokenToSessionStorage
} from "../../utils/accessTokenHandler";

function Setting() {
  const { routeTo } = useRouter();
  const { user, setUserInfo } = useContext(AuthContext) as AuthContextInfo;

  const signOutClickHandler = () => {
    removeAccessTokenFromSessionStorage();
    setUserInfo({
      email: "",
      username: "",
      bio: "",
      image: ""
    });
    routeTo("/");
  };

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

    saveAccessTokenToSessionStorage(userInfoResult.user.token);
    setUserInfo({
      email: userInfoResult.user.username,
      username: userInfoResult.user.username,
      bio: userInfoResult.user.bio,
      image: userInfoResult.user.image
    });

    routeTo("/");
  };

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
            defaultValue={user?.image}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="false"
            defaultValue={user?.username}
          />
          <textarea
            name="bio"
            placeholder="Short bio about you"
            defaultValue={user?.bio}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="false"
            defaultValue={user?.email}
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
    border-bottom: 1px solid ${({ theme }) => theme.colors.BORDER_GRAY};
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
    border: 1px solid ${({ theme }) => theme.colors.FONT_GRAY};
    margin-bottom: 16px;
  }
  textarea {
    font-size: 20px;
    padding: 12px 24px;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.FONT_GRAY};
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
    color: ${({ theme }) => theme.colors.FONT_WHITE};
    font-size: 20px;
    border: none;
    background-color: ${({ theme }) => theme.colors.FONT_GREEN};
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
    color: ${({ theme }) => theme.colors.FONT_RED};
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.COLOR_WHITE};
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.COLOR_RED};
    &:hover {
      color: #fff;
      background-color: ${({ theme }) => theme.colors.FONT_RED};
    }
  }
`;
