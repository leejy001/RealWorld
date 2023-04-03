import { useQuery } from "@tanstack/react-query";
import { getCommentsInfoApi } from "../../api/comment";

const useCommentsQuery = (slug: string) => {
  return useQuery(["comments", slug], () => getCommentsInfoApi(slug));
};

export default useCommentsQuery;
