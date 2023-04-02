import { useQuery } from "@tanstack/react-query";
import { getArticleInfoApi } from "../../api/article";
import { ArticleResult } from "../../types/article";
import { useContext } from "react";
import {
  AuthContext,
  AuthContextInfo
} from "../../contexts/AuthContextProvider";

const useArticleQuery = (slug: string) => {
  const { user } = useContext(AuthContext) as AuthContextInfo;
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
