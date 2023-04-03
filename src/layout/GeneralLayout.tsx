import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";

function GeneralLayout({ children }: React.PropsWithChildren) {
  return (
    <GeneralLayoutContainer>
      <Header />
      {children}
      <Footer />
    </GeneralLayoutContainer>
  );
}

export default GeneralLayout;

const GeneralLayoutContainer = styled.div`
  min-width: 340px;
  width: 100%;
  margin-top: 56px;
  height: calc(100vh - 122px);
`;
