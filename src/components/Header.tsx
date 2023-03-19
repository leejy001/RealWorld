import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import Container from "./Container";

const NavItem = [
  {
    id: 1,
    path: "/",
    label: "Home",
    image: null,
    isAuth: false
  },
  {
    id: 2,
    path: "/sign-in",
    label: "Sign in",
    image: null,
    isAuth: false
  },
  {
    id: 3,
    path: "/sign-up",
    label: "Sign up",
    image: null,
    isAuth: false
  },
  {
    id: 4,
    path: "/",
    label: "Home",
    image: null,
    isAuth: true
  },
  {
    id: 5,
    path: "/editor",
    label: "New Article",
    image: <Icon icon="ion:compose" color="gray" />,
    isAuth: true
  },
  {
    id: 6,
    path: "/setting",
    label: "Setting",
    image: <Icon icon="mdi:gear" color="gray" />,
    isAuth: true
  }
];

function Header() {
  return (
    <HeaderContainer>
      <Container>
        <HeaderLogo href="/">conduit</HeaderLogo>
        <HeaderNavWrapper>
          {NavItem.map(
            (item) =>
              item.isAuth && (
                <li key={item.id}>
                  <a href={item.path}>
                    {item.image}
                    &nbsp;{item.label}
                  </a>
                </li>
              )
          )}
          {true && (
            <HeaderUserProfile href={`/lee12345`}>
              <img
                src="https://api.realworld.io/images/smiley-cyrus.jpeg"
                alt="user img"
                width="26"
                height="26"
              />
              <p>&nbsp;lee12345</p>
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

const HeaderLogo = styled.a`
  text-decoration: none;
  color: #5cb85c;
  font-size: 24px;
  font-weight: 700;
`;

const HeaderNavWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
  li {
    a {
      color: gray;
      display: flex;
      align-items: center;
      font-size: 16px;
      &:hover {
        color: black;
      }
    }
  }
`;

const HeaderUserProfile = styled.a`
  margin-left: 10px;
  display: flex;
  align-items: center;
  color: gray;
  &:hover {
    color: black;
  }
  img {
    border-radius: 50%;
  }
`;
