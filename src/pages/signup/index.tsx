import styled from "styled-components";
import { signupApi } from "../../api/sign";
import Container from "../../components/Container";
import { useRouter } from "../../hooks/useRouter";

function SignUp() {
  const { routeTo } = useRouter();

  const signUpSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const signUpResult = await signupApi({
      user: {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string
      }
    });

    if (signUpResult.status === "fail") return;

    routeTo("-1");
  };

  return (
    <Container>
      <SignUpContianer>
        <p>Sign up</p>
        <SignInButton onClick={() => routeTo("/sign-in")}>
          Have an account?
        </SignInButton>
        <SignUpForm onSubmit={signUpSubmitHandler}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="false"
          />
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
            Sign up
          </button>
        </SignUpForm>
      </SignUpContianer>
    </Container>
  );
}

export default SignUp;

const SignUpContianer = styled.div`
  width: 540px;
  padding-top: 30px;
  margin: 0 auto;
  text-align: center;
  p:first-child {
    font-size: 40px;
    margin-bottom: 8px;
  }
`;

const SignInButton = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.FONT_GREEN};
  margin-bottom: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    font-size: 20px;
    padding: 12px 24px;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.COLOR_GRAY};
    background-color: ${({ theme }) => theme.colors.COLOR_WHITE};
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
