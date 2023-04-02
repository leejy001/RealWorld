import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followAuthorApi } from "../../api/profile";

export const useArticleFollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(followAuthorApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    }
  });
};

export const useProfileFollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(followAuthorApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    }
  });
};
