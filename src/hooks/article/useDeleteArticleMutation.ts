import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "../useRouter";
import { deleteArticleApi } from "../../api/article";

function useDeleteArticleMutation() {
  const { routeTo } = useRouter();
  const queryClient = useQueryClient();
  return useMutation(deleteArticleApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
      routeTo("-1");
    }
  });
}

export default useDeleteArticleMutation;
