import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState
} from "react";
import styled from "styled-components";
import { getUserInfoApi } from "../api/sign";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserResult } from "../types/sign";
import { getAccessTokenFromSessionStorage } from "../utils/accessTokenHandler";

function GeneralLayout({ children }: PropsWithChildren) {
  const [userInfo, setUserInfo] = useState<UserResult | null>(null);
  const token = getAccessTokenFromSessionStorage();

  const getUserInfo = useCallback(async () => {
    const userRes = await getUserInfoApi();
    setUserInfo(userRes);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo, token]);

  return (
    <GeneralLayoutContainer>
      <Header userInfo={userInfo} />
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
