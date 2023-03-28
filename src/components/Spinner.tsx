import { ClipLoader } from "react-spinners";
import styled from "styled-components";

interface SpinnerProps {
  size: number;
}

function Spinner({ size }: SpinnerProps) {
  return (
    <SpinnerContainer>
      <ClipLoader color={"#5cb85c"} size={size} />
    </SpinnerContainer>
  );
}

export default Spinner;

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px auto;
`;
