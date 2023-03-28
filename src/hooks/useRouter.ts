import { useNavigate } from "react-router-dom";

export const useRouter = () => {
  const router = useNavigate();

  return {
    currentPath: window.location.pathname,
    routeTo: (path: string) => {
      if (isNaN(Number(path))) router(path);
      else router(Number(path));
    }
  };
};
