import React, { createContext, useCallback, useEffect, useState } from "react";
import { getAccessTokenFromSessionStorage } from "../utils/accessTokenHandler";

interface UserInfo {
  email: string;
  username: string;
  bio: string;
  image: string;
}

export interface AuthContextInfo {
  user: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const AuthContext = createContext<AuthContextInfo | null>(null);

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const setUserInfo = useCallback((userRes: UserInfo) => {
    setUser({
      email: userRes.email,
      username: userRes.username,
      bio: userRes.bio,
      image: userRes.image
    });
  }, []);

  useEffect(() => {
    if (!getAccessTokenFromSessionStorage()) {
      setUser(null);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
