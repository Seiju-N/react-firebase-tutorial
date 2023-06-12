import { useAuth } from "@/contexts/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  if (!auth) {
    throw new Error(
      "The auth object was null. Make sure you use the SignUp component inside the AuthProvider component."
    );
  }
  const { currentUser } = auth;
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
