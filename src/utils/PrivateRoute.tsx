import { Navigate } from "react-router-dom";

export type PrivateRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({
  authenticationPath,
  outlet
}: PrivateRouteProps) {
  if (sessionStorage.getItem("accessToken")) {
    return outlet;
  }
  return <Navigate to={{ pathname: authenticationPath }} />;
}
