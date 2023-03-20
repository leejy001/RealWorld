export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const getAccessTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("accessToken") || null;
};
