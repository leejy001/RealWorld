import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowAuthorApi } from "../../api/profile";

const useUnfollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(unfollowAuthorApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    }
  });
};

export default useUnfollowMutation;
