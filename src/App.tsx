import { SignUp } from "./authentication/SignUp";
import { AuthProvider } from "./contexts/authContext";

export const App = () => {
  return (
    <>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </>
  );
};
