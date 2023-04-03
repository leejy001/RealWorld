import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "../useRouter";
import { signupApi } from "../../api/sign";

const useSignUpMutation = () => {
  const { routeTo } = useRouter();
  const queryClient = useQueryClient();

  return useMutation(signupApi, {
    onSuccess: (res) => {
      if (res.status === "success") {
        queryClient.invalidateQueries(["user"]);
        routeTo("/");
      }
    }
  });
};

export default useSignUpMutation;
