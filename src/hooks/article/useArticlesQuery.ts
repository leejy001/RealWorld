import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticlesInfoApi } from "../../api/article";

const useArticlesQuery = (query: string) => {
  return useInfiniteQuery(
    ["articles", query],
    ({ pageParam = 0 }) =>
      getArticlesInfoApi(`${query}limit=10&offset=${pageParam}`),
    {
      getNextPageParam: (lastPage, allArticles) => {
        return allArticles.length * 10 || 0;
      },
      retry: 1
    }
  );
};

export default useArticlesQuery;
