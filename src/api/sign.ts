import {
  SignRequest,
  SignInResult,
  SignUpRequest,
  SignUpResult,
  SignUpError,
  SignInError
} from "../types/sign";
import { saveAccessTokenToSessionStorage } from "../utils/accessTokenHandler";
import { fetchClient } from "./fetchClient";

export const signinApi = async (
  args: SignRequest
): Promise<SignInResult | SignInError> => {
  const signInRes = await fetchClient("/users/login", {
    method: "POST",
    body: JSON.stringify(args)
  });

  const signinResponseData = await signInRes.json();

  if (!signInRes.ok) {
    return {
      status: "fail",
      message: `${Object.keys(signinResponseData.errors)} does not exist.`
    };
  }

  saveAccessTokenToSessionStorage(signinResponseData.user.token);
  return { status: "success", ...signinResponseData };
};

export const signupApi = async (
  args: SignUpRequest
): Promise<SignUpResult | SignUpError> => {
  const signUpRes = await fetchClient("/users", {
    method: "POST",
    body: JSON.stringify(args)
  });

  const signupResponseData = await signUpRes.json();

  if (!signUpRes.ok) {
    return {
      status: "fail",
      message: `${Object.keys(signupResponseData.errors)} already been taken.`
    };
  }

  saveAccessTokenToSessionStorage(signupResponseData.user.token);
  return { status: "success", ...signupResponseData };
};
