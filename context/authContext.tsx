import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type AuthContextType = {
  isUserAuthenticated?: boolean;
  authToken: string | false | null;
  setUserToken: (token: string) => void;
};

type ContextProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext)
    throw new Error("useAuthContext must be used inside AuthProvider");

  return authContext;
};

export const AuthProvider = ({ children }: ContextProps) => {
  const ISSERVER = typeof window === "undefined";
  const router = useRouter();

  const authToken = !ISSERVER && localStorage.getItem("mazanski-token");
  const isUserAuthenticated = !!authToken;

  useEffect(() => {
    if (isUserAuthenticated) router.push("/dashboard");
    if (!isUserAuthenticated) router.push("/");
  }, [isUserAuthenticated]);

  const setUserToken = (token: string) => {
    if (token) {
      localStorage.setItem("mazanski-token", token);
    }
  };

  const value = {
    isUserAuthenticated,
    setUserToken,
    authToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
