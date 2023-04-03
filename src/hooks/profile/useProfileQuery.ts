import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../../api/profile";
import { ProfileResult } from "../../types/profile";
import useUserQuery from "../user/useUserQuery";

const useProfileQuery = (username: string) => {
  const { data: user } = useUserQuery();
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
