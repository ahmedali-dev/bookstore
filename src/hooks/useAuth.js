const { useState, createContext, useContext } = require("react");

const AuthContext = createContext({
  token: null,
  isLogin: false,
  login: (token) => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  // Renamed for clarity and directly destructured `children`
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const isLogin = Boolean(token); // Simplified truthy check
  const login = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      document.location.href = "/";
    }
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    document.location.href = "/signin";
  };

  return (
    <AuthContext.Provider value={{ token, isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
