export const saveAccessTokenToSessionStorage = (accessToken: string) => {
  sessionStorage.setItem("accessToken", accessToken);
};

export const getAccessTokenFromSessionStorage = (): string | null => {
  return sessionStorage.getItem("accessToken") || null;
};

export const removeAccessTokenFromSessionStorage = () => {
  sessionStorage.removeItem("accessToken");
};
