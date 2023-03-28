import { Navigate } from "react-router-dom";
import { getAccessTokenFromSessionStorage } from "./accessTokenHandler";

export type PrivateRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({
  authenticationPath,
  outlet
}: PrivateRouteProps) {
  if (getAccessTokenFromSessionStorage() !== null) {
    return outlet;
  }
  return <Navigate to={{ pathname: authenticationPath }} />;
}
