import Home from "./pages/Home";
import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import GeneralLayout from "./layout/GeneralLayout";

interface RouterElement {
  id: number;
  path: string;
  element: React.ReactNode;
  withAuth: boolean;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/",
    element: <Home />,
    withAuth: false
  }
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    const isSignIn = router.withAuth || false;
    return {
      path: router.path,
      element: (
        <GeneralLayout isSignIn={isSignIn}>{router.element}</GeneralLayout>
      )
    };
  })
);
