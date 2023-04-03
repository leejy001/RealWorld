import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteApi } from "../../api/favorite";

const useFavoriteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(favoriteApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    }
  });
};

export default useFavoriteMutation;
