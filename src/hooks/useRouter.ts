import { useNavigate } from "react-router-dom";

export const useRouter = (replace = false) => {
  const router = useNavigate();

  return {
    currentPath: window.location.pathname,
    routeTo: (path: string) => {
      if (isNaN(Number(path))) router(path, { replace: replace });
      else router(Number(path));
    }
  };
};
