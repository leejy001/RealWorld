import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "../useRouter";
import { signinApi } from "../../api/sign";

const useSignInMutation = () => {
  const { routeTo } = useRouter();
  const queryClient = useQueryClient();

  return useMutation(signinApi, {
    onSuccess: (res) => {
      if (res.status === "success") {
        queryClient.invalidateQueries(["user"]);
        routeTo("/");
      }
    }
  });
};

export default useSignInMutation;
