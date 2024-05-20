import { useContext } from "react";
import type { AuthContextType as JwtAuthContextType } from "src/contexts/auth/jwt-context";
import { AuthContext } from "src/contexts/auth/jwt-context";

type AuthContextType = JwtAuthContextType;

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as T;
