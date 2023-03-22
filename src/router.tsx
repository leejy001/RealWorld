import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import GeneralLayout from "./layout/GeneralLayout";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Article from "./pages/article";
import Editor from "./pages/editor";
import Setting from "./pages/setting";
import User from "./pages/user";
import ProtectedRoute, { PrivateRouteProps } from "./utils/PrivateRoute";

interface RouterElement {
  id: number;
  path: string;
  element: React.ReactNode;
  withAuth: boolean;
}

const defaultProtectedRouteProps: Omit<PrivateRouteProps, "outlet"> = {
  authenticationPath: "/sign-in"
};

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
    path: "/article/:slug",
    element: <Article />,
    withAuth: false
  },
  {
    id: 4,
    path: "/editor",
    element: (
      <ProtectedRoute {...defaultProtectedRouteProps} outlet={<Editor />} />
    ),
    withAuth: true
  },
  {
    id: 5,
    path: "/setting",
    element: (
      <ProtectedRoute {...defaultProtectedRouteProps} outlet={<Setting />} />
    ),
    withAuth: true
  },
  {
    id: 6,
    path: "/profile/:username/*",
    element: <User />,
    withAuth: true
  }
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      element: <GeneralLayout>{router.element}</GeneralLayout>
    };
  })
);
