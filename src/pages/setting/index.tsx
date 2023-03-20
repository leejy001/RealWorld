import styled from "styled-components";
import Container from "../../components/Container";

function Setting() {
  return (
    <Container>
      <SettingWrapper>
        <SettingTitle>Your Settings</SettingTitle>
        <SettingsForm>
          <input
            type="text"
            placeholder="URL of profile picture"
            autoComplete="false"
          />
          <input type="text" placeholder="Username" autoComplete="false" />
          <textarea placeholder="Short bio about you" />
          <input type="email" placeholder="Email" autoComplete="false" />
          <input
            type="password"
            placeholder="New Password"
            autoComplete="false"
          />
          <UpdateButtonWrapper>
            <button>Update Settings</button>
          </UpdateButtonWrapper>
        </SettingsForm>
        <hr />
        <SignOutButtonWrapper>
          <button>Or click here to logout.</button>
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
