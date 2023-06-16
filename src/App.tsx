import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { RequireAuth } from "./components/requireAuth";
import { Dashboard } from "./pages/dashboard";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Home } from "./pages/home";
import { Login } from "./pages/login";

import { AuthProvider } from "@/contexts/authContext";
import { SignUp } from "@/pages/signUp";

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
