import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import GeneralLayout from "./layout/GeneralLayout";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Article from "./pages/article";

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
  },
  {
    id: 1,
    path: "/sign-in",
    element: <SignIn />,
    withAuth: false
  },
  {
    id: 2,
    path: "/sign-up",
    element: <SignUp />,
    withAuth: false
  },
  {
    id: 3,
    path: "/article",
    element: <Article />,
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
