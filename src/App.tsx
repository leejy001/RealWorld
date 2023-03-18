import { RouterProvider } from "react-router-dom";
import { routers } from "./router";
import GlobalStyle from "./theme/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={routers} />;
    </>
  );
}

export default App;
