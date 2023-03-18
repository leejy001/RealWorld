import { Icon } from "@iconify/react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <a href="https://github.com/gothinkster/angularjs-realworld-example-app">
        <Icon icon="ion:logo-github" color="white" />
        &nbsp;&nbsp;Fork on GitHub
      </a>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  padding: 15px;
  height: 66px;
  width: 100%;
  color: white;
  background: linear-gradient(#485563, #29323c);
  box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.4);
  a {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    font-size: 24px;
    &:hover {
      text-decoration: underline;
    }
  }
`;
