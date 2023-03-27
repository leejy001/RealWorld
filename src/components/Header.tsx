import styled from "styled-components";
import { Icon } from "@iconify/react";
import Container from "./Container";
import { useRouter } from "../hooks/useRouter";
import { useContext } from "react";
import { AuthContext, AuthContextInfo } from "../contexts/AuthContextProvider";

function Header() {
  const { user } = useContext(AuthContext) as AuthContextInfo;
  const { routeTo } = useRouter();

  return (
    <HeaderContainer>
      <Container>
        <HeaderLogo onClick={() => routeTo("/")}>conduit</HeaderLogo>
        <HeaderNavWrapper>
          <li onClick={() => routeTo("/")}>Home</li>
          {user === null ? (
            <>
              <li onClick={() => routeTo("/sign-in")}>Sign in</li>
              <li onClick={() => routeTo("/sign-up")}>Sign up</li>
            </>
          ) : (
            <>
              <li onClick={() => routeTo("/editor")}>
                <Icon icon="ion:compose" color="gray" />
                New Article
              </li>
              <li onClick={() => routeTo("/setting")}>
                <Icon icon="mdi:gear" color="gray" />
                Setting
              </li>
            </>
          )}
          {user && (
            <HeaderUserProfile>
              <img src={user.image} alt="user img" width="26" height="26" />
              <p onClick={() => routeTo(`/profile/${user.username}`)}>
                &nbsp;{user.username}
              </p>
            </HeaderUserProfile>
          )}
        </HeaderNavWrapper>
      </Container>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  height: 56px;
  padding: 8px 16px;
  width: 100%;
  background-color: white;
  div {
    display: flex;
    justify-content: space-between;
  }
`;

const HeaderLogo = styled.p`
  cursor: pointer;
  color: #5cb85c;
  font-size: 24px;
  font-weight: 700;
`;

const HeaderNavWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
  li {
    cursor: pointer;
    color: gray;
    display: flex;
    align-items: center;
    font-size: 16px;
    &:hover {
      color: black;
    }
  }
`;

const HeaderUserProfile = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  color: gray;
  cursor: pointer;
  &:hover {
    color: black;
  }
  img {
    border-radius: 50%;
  }
`;
