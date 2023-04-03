import { useQuery } from "@tanstack/react-query";
import { getUserInfoApi } from "../../api/user";
import { UserResult } from "../../types/user";

const useUserQuery = () => {
  return useQuery(["user"], () => getUserInfoApi(), {
    select: (data: UserResult | null) => {
      return data?.user;
    }
  });
};

export default useUserQuery;
