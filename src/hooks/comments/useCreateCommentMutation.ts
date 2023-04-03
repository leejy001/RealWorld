import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCommentApi } from "../../api/comment";

const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(postCommentApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    }
  });
};

export default useCreateCommentMutation;
