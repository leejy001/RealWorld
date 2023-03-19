import React from "react";
import styled from "styled-components";
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
      {children}
      <Footer />
    </GeneralLayoutContainer>
  );
}

export default GeneralLayout;

const GeneralLayoutContainer = styled.div`
  min-width: 340px;
  width: 100%;
  margin-top: 56px;
  height: calc(100vh - 122px);
`;
