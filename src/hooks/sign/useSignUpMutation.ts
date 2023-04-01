import { useMutation } from "@tanstack/react-query";
import { useRouter } from "../useRouter";
import { signupApi } from "../../api/sign";

const useSignUpMutation = () => {
  const { routeTo } = useRouter();

  return useMutation(signupApi, {
    onSuccess: (res) => {
      if (res.status === "success") routeTo("/");
    }
  });
};

export default useSignUpMutation;
