import firebase from "firebase/compat/app";
import React, { useState, useEffect, createContext, ReactNode } from "react";

import { auth } from "../firebase";

export type AuthContextType = {
  currentUser: firebase.User | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signUp: async () => {
    throw new Error("signUp not implemented");
  },
  login: async () => {
    throw new Error("login not implemented");
  },
  logout: async () => {
    throw new Error("logout not implemented");
  },
  resetPassword: async () => {
    throw new Error("resetPassword not implemented");
  },
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email: string) => {
    const actionCodeSettings = {
      url: "http://localhost:3000/?email=" + email,
    };
    return auth.sendPasswordResetEmail(email, actionCodeSettings);
  };

  const value: AuthContextType = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
