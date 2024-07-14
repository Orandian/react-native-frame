import services from "@/services";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { USER_TOKEN } from "@/constants/App";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const onRegister = async (email: string, password: string) => {
    try {
      const response = await services.auth.register(email, password);
      return response;
    } catch (error) {
      return { error: true, msg: error };
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await services.auth.login(email, password);
      if ("data" in response) {
        // Type guard to check if response contains 'data'
        setAuthState({
          token: response.data.token,
          authenticated: true,
        });

        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;

        await SecureStore.setItemAsync(USER_TOKEN, response.data.token);
      }
      return response;
    } catch (error) {
      return { error: true, msg: error };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(USER_TOKEN);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(USER_TOKEN);

      if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true
        })
      }
    }
    loadToken();
  }, []);

  const value = {
    authState,
    onRegister,
    onLogin,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
