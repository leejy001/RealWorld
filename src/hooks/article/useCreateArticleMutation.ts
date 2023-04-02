import { useMutation } from "@tanstack/react-query";
import { postArticleApi } from "../../api/article";
import { useRouter } from "../useRouter";

function useCreateArticleMutation() {
  const { routeTo } = useRouter(true);
  return useMutation(postArticleApi, {
    onSuccess: (res) => {
      routeTo(`/article/${res.article?.slug}`);
    }
  });
}

export default useCreateArticleMutation;
