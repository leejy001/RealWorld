import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { routers } from "./router";
import GlobalStyle from "./theme/globalStyle";
import Theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <RouterProvider router={routers} />;
    </ThemeProvider>
  );
}

export default App;
