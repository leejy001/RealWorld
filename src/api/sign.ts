import {
  SignRequest,
  SignInResult,
  SignInError,
  UserResult
} from "../types/sign";
import {
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage
} from "../utils/accessTokenHandler";

export const signinApi = async (
  args: SignRequest
): Promise<SignInResult | SignInError> => {
  const signInRes = await fetch(
    `${process.env.REACT_APP_BASIC_URL}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(args)
    }
  );

  const loginResponseData = await signInRes.json();

  if (signInRes.ok) {
    saveAccessTokenToLocalStorage(loginResponseData.user.token);
    return { status: "success", ...loginResponseData };
  }
  return { status: "fail", ...loginResponseData };
};

export const getUserInfoApi = async (): Promise<UserResult | null> => {
  const token = getAccessTokenFromLocalStorage();
  const userInfoRes = await fetch(`${process.env.REACT_APP_BASIC_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if (userInfoRes.ok) {
    return userInfoRes.json() as Promise<UserResult>;
  }

  return null;
};
