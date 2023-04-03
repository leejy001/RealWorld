import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentApi } from "../../api/comment";

const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCommentApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    }
  });
};

export default useDeleteCommentMutation;
