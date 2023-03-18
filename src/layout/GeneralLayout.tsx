import React from "react";
import styled from "styled-components";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface GeneralLayoutProps {
  children: React.ReactNode;
  isSignIn: boolean;
}

function GeneralLayout({ children, isSignIn }: GeneralLayoutProps) {
  if (isSignIn) return <div>SignIn first!!!</div>;
  return (
    <GeneralLayoutContainer>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </GeneralLayoutContainer>
  );
}

export default GeneralLayout;

const GeneralLayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 56px;
  height: calc(100vh - 122px);
  background-color: gray;
`;
