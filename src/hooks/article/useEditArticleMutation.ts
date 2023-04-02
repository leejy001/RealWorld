import { useMutation } from "@tanstack/react-query";
import { useRouter } from "../useRouter";
import { putArticleApi } from "../../api/article";

function useEditArticleMutation() {
  const { routeTo } = useRouter();
  return useMutation(putArticleApi, {
    onSuccess: (res) => {
      routeTo(`/article/${res.article?.slug}`);
    }
  });
}

export default useEditArticleMutation;
