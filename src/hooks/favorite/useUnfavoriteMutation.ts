import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfavoriteApi } from "../../api/favorite";

const useUnfavoriteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(unfavoriteApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    }
  });
};

export default useUnfavoriteMutation;
