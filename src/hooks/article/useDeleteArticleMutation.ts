import { useMutation } from "@tanstack/react-query";
import { useRouter } from "../useRouter";
import { deleteArticleApi } from "../../api/article";

function useDeleteArticleMutation() {
  const { routeTo } = useRouter();
  return useMutation(deleteArticleApi, {
    onSuccess: () => {
      routeTo("-1");
    }
  });
}

export default useDeleteArticleMutation;
