import { useContext } from "react";

import { AuthContext, AuthContextType } from "./authContext";

export const useAuth = (): AuthContextType | null => {
  return useContext(AuthContext);
};
