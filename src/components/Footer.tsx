import React from "react";
import styled from "styled-components";

function Footer() {
  return <FooterContainer>Footer</FooterContainer>;
}

export default Footer;

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  padding: 15px;
  height: 66px;
  width: 100%;
  color: white;
  background: linear-gradient(#485563, #29323c);
  box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.4);
`;
