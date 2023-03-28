import {
  SignRequest,
  SignInResult,
  SignInError,
  SignUpRequest,
  SignUpError,
  SignUpResult
} from "../types/sign";
import { saveAccessTokenToSessionStorage } from "../utils/accessTokenHandler";

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

  const signinResponseData = await signInRes.json();

  if (signInRes.ok) {
    saveAccessTokenToSessionStorage(signinResponseData.user.token);
    return { status: "success", ...signinResponseData };
  }
  return { status: "fail", ...signinResponseData };
};

export const signupApi = async (
  args: SignUpRequest
): Promise<SignUpResult | SignUpError> => {
  const signUpRes = await fetch(`${process.env.REACT_APP_BASIC_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(args)
  });

  const signupResponseData = await signUpRes.json();

  if (signUpRes.ok) {
    saveAccessTokenToSessionStorage(signupResponseData.user.token);
    return { status: "success", ...signupResponseData };
  }
  return { status: "fail", ...signupResponseData };
};
