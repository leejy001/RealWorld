import styled from "styled-components";

interface ErrorProp {
  error: string;
}

function ErrorForm({ error }: ErrorProp) {
  return <ErrorMessage>{error}</ErrorMessage>;
}

export default ErrorForm;

const ErrorMessage = styled.p`
  margin-top: 10px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.FONT_RED};
`;
