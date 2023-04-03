import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putUserInfoApi } from "../../api/user";
import { saveAccessTokenToSessionStorage } from "../../utils/accessTokenHandler";
import { useRouter } from "../useRouter";

const useEditUserMutation = () => {
  const { routeTo } = useRouter();
  const queryClient = useQueryClient();
  return useMutation(putUserInfoApi, {
    onSuccess: (res) => {
      if (res) saveAccessTokenToSessionStorage(res?.user.token);
      queryClient.invalidateQueries(["user"]);
      routeTo("/");
    }
  });
};

export default useEditUserMutation;
