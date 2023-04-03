import styled from "styled-components";
import { Icon } from "@iconify/react";
import Container from "./Container";
import { useRouter } from "../hooks/useRouter";
import useUserQuery from "../hooks/user/useUserQuery";

function Header() {
  const { data } = useUserQuery();
  const { routeTo } = useRouter();

  return (
    <HeaderContainer>
      <Container>
        <HeaderLogo onClick={() => routeTo("/")}>conduit</HeaderLogo>
        <HeaderNavWrapper>
          <li onClick={() => routeTo("/")}>Home</li>
          {!data ? (
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
          {data && (
            <HeaderUserProfile>
              <img src={data.image} alt="user img" width="26" height="26" />
              <p onClick={() => routeTo(`/profile/${data.username}`)}>
                &nbsp;{data.username}
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
  background-color: ${({ theme }) => theme.colors.COLOR_WHITE};
  div {
    display: flex;
    justify-content: space-between;
  }
`;

const HeaderLogo = styled.p`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.FONT_GREEN};
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
  color: ${({ theme }) => theme.colors.FONT_GRAY};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.FONT_BLACK};
  }
  img {
    border-radius: 50%;
  }
`;
