import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowAuthorApi } from "../../api/profile";

export const useArticleUnfollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(unfollowAuthorApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    }
  });
};

export const useProfileUnfollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(unfollowAuthorApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    }
  });
};
