import { useMutation } from "@tanstack/react-query";
import { useRouter } from "../useRouter";
import { signinApi } from "../../api/sign";

const useSignInMutation = () => {
  const { routeTo } = useRouter();

  return useMutation(signinApi, {
    onSuccess: (res) => {
      if (res.status === "success") routeTo("/");
    }
  });
};

export default useSignInMutation;
