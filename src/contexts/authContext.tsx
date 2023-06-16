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
  ) => Promise<firebase.auth.UserCredential | void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
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
  updatePassword: async () => {
    throw new Error("updatePassword not implemented");
  },
  updateEmail: async () => {
    throw new Error("updateEmail not implemented");
  },
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  const signUp = async (email: string, password: string) => {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (userCredential.user) {
      await userCredential.user.sendEmailVerification();
    }
    return userCredential;
  };

  const login = async (email: string, password: string) => {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    if (userCredential.user && !userCredential.user.emailVerified) {
      throw new Error("メールアドレスの確認が取れていません。");
    }
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email: string) => {
    const actionCodeSettings = {
      url: `${import.meta.env.VITE_REACT_APP_MAIL}?email=${email}`,
    };
    return auth.sendPasswordResetEmail(email, actionCodeSettings);
  };

  const updatePassword = (password: string) => {
    if (!currentUser) {
      throw new Error("currentUser is null");
    }
    return currentUser.updatePassword(password);
  };

  const updateEmail = (email: string) => {
    if (!currentUser) {
      throw new Error("currentUser is null");
    }
    return currentUser.updateEmail(email);
  };

  const value: AuthContextType = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    updatePassword,
    updateEmail,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
