import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../../api/profile";
import { ProfileResult } from "../../types/profile";
import { useContext } from "react";
import {
  AuthContext,
  AuthContextInfo
} from "../../contexts/AuthContextProvider";

const useProfileQuery = (username: string) => {
  const { user } = useContext(AuthContext) as AuthContextInfo;
  return useQuery(["profile", username], () => getProfileApi(username), {
    select: (data: ProfileResult | null) => {
      return {
        isUser: user?.username === data?.profile.username,
        ...data
      };
    }
  });
};

export default useProfileQuery;
