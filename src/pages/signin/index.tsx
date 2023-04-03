import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Container from "../../components/Container";
import { useRouter } from "../../hooks/useRouter";
import useSignInMutation from "../../hooks/sign/useSignInMutation";
import ErrorForm from "../../components/ErrorForm";
import { SignInError } from "../../types/sign";

function SignIn() {
  const { routeTo } = useRouter();
  const { data, mutate } = useSignInMutation();
  const signInSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate({
      user: {
        email: formData.get("email") as string,
        password: formData.get("password") as string
      }
    });
  };

  return (
    <Container>
      <Helmet>
        <title>SignIn - Conduit</title>
      </Helmet>
      <SignInContianer>
        <p>Sign in</p>
        <SignUpButton onClick={() => routeTo("/sign-up")}>
          Need an account?
        </SignUpButton>
        <SignInForm onSubmit={signInSubmitHandler}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="false"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="false"
          />
          <button type="submit" value="Submit">
            Sign in
          </button>
        </SignInForm>
        {data?.status === "fail" && (
          <ErrorForm error={(data as SignInError)?.message} />
        )}
      </SignInContianer>
    </Container>
  );
}

export default SignIn;

const SignInContianer = styled.div`
  width: 540px;
  padding-top: 30px;
  margin: 0 auto;
  text-align: center;
  p:first-child {
    font-size: 40px;
    margin-bottom: 8px;
  }
`;

const SignUpButton = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.FONT_GREEN};
  margin-bottom: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    font-size: 20px;
    padding: 12px 24px;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.COLOR_GRAY};
    margin-bottom: 16px;
  }
  button {
    cursor: pointer;
    padding: 12px 24px;
    color: ${({ theme }) => theme.colors.FONT_WHITE};
    font-size: 20px;
    border: none;
    background-color: ${({ theme }) => theme.colors.COLOR_GREEN};
    border-radius: 5px;
  }
`;
