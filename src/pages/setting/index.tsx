import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Container from "../../components/Container";
import { useRouter } from "../../hooks/useRouter";
import { removeAccessTokenFromSessionStorage } from "../../utils/accessTokenHandler";
import useUserQuery from "../../hooks/user/useUserQuery";
import useEditUserMutation from "../../hooks/user/useEditUserMutation";
import { useQueryClient } from "@tanstack/react-query";

function Setting() {
  const queryClient = useQueryClient();
  const { routeTo } = useRouter();
  const { data } = useUserQuery();
  const { mutate } = useEditUserMutation();

  const signOutClickHandler = () => {
    removeAccessTokenFromSessionStorage();
    queryClient.invalidateQueries(["user"]);
    routeTo("/");
  };

  const userInfoSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    mutate({
      user: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        username: formData.get("username") as string,
        bio: formData.get("bio") as string,
        image: formData.get("image") as string
      }
    });
  };

  return (
    <Container>
      <Helmet>
        <title>Setting - Conduit</title>
      </Helmet>
      <SettingWrapper>
        <SettingTitle>Your Settings</SettingTitle>
        <SettingsForm onSubmit={userInfoSubmitHandler}>
          <input
            type="text"
            name="image"
            placeholder="URL of profile picture"
            autoComplete="false"
            defaultValue={data?.image}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="false"
            defaultValue={data?.username}
          />
          <textarea
            name="bio"
            placeholder="Short bio about you"
            defaultValue={data?.bio}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="false"
            defaultValue={data?.email}
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
