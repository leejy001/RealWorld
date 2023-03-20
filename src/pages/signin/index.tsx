import styled from "styled-components";
import { signinApi } from "../../api/sign";
import Container from "../../components/Container";
import { useRouter } from "../../hooks/useRouter";

function SignIn() {
  const { routeTo } = useRouter();

  const SignInSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const signInResult = await signinApi({
      user: {
        email: formData.get("email") as string,
        password: formData.get("password") as string
      }
    });

    if (signInResult.status === "fail") return;

    routeTo("/");
  };

  return (
    <Container>
      <SignInContianer>
        <p>Sign in</p>
        <p>
          <a href="/sign-up">Need an account?</a>
        </p>
        <SignInForm onSubmit={SignInSubmitHandler}>
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
  p:nth-child(1) {
    font-size: 40px;
    margin-bottom: 8px;
  }
  p:nth-child(2) {
    a {
      color: #5cb85c;
    }
    &:hover {
      a {
        text-decoration: underline;
      }
    }
    margin-bottom: 16px;
  }
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    font-size: 20px;
    padding: 12px 24px;
    border-radius: 3px;
    border: 1px solid #aaa;
    margin-bottom: 16px;
  }
  button {
    cursor: pointer;
    padding: 12px 24px;
    color: #fff;
    font-size: 20px;
    border: none;
    background-color: #5cb85c;
    border-radius: 5px;
  }
`;
