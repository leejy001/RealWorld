import { useQuery } from "@tanstack/react-query";
import { getArticleInfoApi } from "../../api/article";
import { ArticleResult } from "../../types/article";
import useUserQuery from "../user/useUserQuery";

const useArticleQuery = (slug: string) => {
  const { data: user } = useUserQuery();
  return useQuery(["article", slug], () => getArticleInfoApi(slug), {
    select: (data: ArticleResult | null) => {
      return {
        isUser: user?.username === data?.article.author.username,
        ...data
      };
    },
    enabled: !!slug
  });
};

export default useArticleQuery;
