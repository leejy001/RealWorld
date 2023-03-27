import styled from "styled-components";

function Banner() {
  return (
    <BannerContainer>
      <ConduitLogo>conduit</ConduitLogo>
      <ConduitDesc>A place to share your knowledge.</ConduitDesc>
    </BannerContainer>
  );
}

export default Banner;

const BannerContainer = styled.div`
  width: 100%;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.COLOR_GREEN};
  margin-bottom: 32px;
  padding: 32px;
`;

const ConduitLogo = styled.p`
  margin: 0;
  font-size: 56px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.FONT_WHITE};
  padding-bottom: 8px;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  font-weight: 700;
`;

const ConduitDesc = styled.p`
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.FONT_WHITE};
`;
