import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../types/UserData";

interface AuthContextData {
  user: UserData | null;
  login: (user: UserData) => void;
  logout: () => void;
  handleLikeClick: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("tixup_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: UserData) => {
    setUser(user);
    localStorage.setItem("tixup_user", JSON.stringify(user));
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tixup_user");
    localStorage.removeItem("tixup_token");
    navigate("/login");
  };

  const handleLikeClick = (callback: () => void) => {
    if (!user) {
      navigate("/login");
      return;
    }
    callback();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, handleLikeClick }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
