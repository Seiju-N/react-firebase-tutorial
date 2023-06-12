import { AuthProvider } from "@/contexts/authContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp } from "@/pages/signUp";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { RequireAuth } from "./components/requireAuth";

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
        </Routes>
      </AuthProvider>
    </Router>
  );
};
