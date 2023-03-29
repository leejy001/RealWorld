import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { routers } from "./router";
import GlobalStyle from "./theme/globalStyle";
import Theme from "./theme/theme";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <RouterProvider router={routers} />;
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
