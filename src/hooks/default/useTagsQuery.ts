import { useQuery } from "@tanstack/react-query";
import { getTagApi } from "../../api/tag";
import { TagResult } from "../../types/tag";

const useTagsQuery = () => {
  return useQuery(["tags"], getTagApi, {
    select: (data: TagResult | null) => {
      return data?.tags;
    }
  });
};

export default useTagsQuery;
