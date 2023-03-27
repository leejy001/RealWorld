import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect
} from "react";
import styled from "styled-components";
import { getUserInfoApi } from "../api/user";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthContext, AuthContextInfo } from "../contexts/AuthContextProvider";
import { getAccessTokenFromSessionStorage } from "../utils/accessTokenHandler";

function GeneralLayout({ children }: PropsWithChildren) {
  const { setUserInfo } = useContext(AuthContext) as AuthContextInfo;
  const token = getAccessTokenFromSessionStorage();

  const getUserInfoFunc = useCallback(async () => {
    const userRes = await getUserInfoApi();
    if (userRes)
      setUserInfo({
        email: userRes?.user.email,
        username: userRes?.user.username,
        bio: userRes?.user.bio,
        image: userRes?.user.image
      });
  }, [setUserInfo]);

  useEffect(() => {
    getUserInfoFunc();
  }, [getUserInfoFunc, token]);

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
