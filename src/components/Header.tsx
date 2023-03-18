import React from "react";
import styled from "styled-components";

function Header() {
  return <HeaderContainer>Header</HeaderContainer>;
}

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  box-sizing: border-box;
  height: 56px;
  padding: 8px 16px;
  width: 100%;
  background-color: white;
`;
