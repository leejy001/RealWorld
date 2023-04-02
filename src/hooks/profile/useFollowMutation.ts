import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followAuthorApi } from "../../api/profile";

const useFollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(followAuthorApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    }
  });
};

export default useFollowMutation;
