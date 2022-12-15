import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  email: "",
  userName: "",
  isAuthenticated: false,
  authenticate: (token, email, userName) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [authEmail, setAuthEmail] = useState();
  const [authUserName, setAuthUserName] = useState();

  function authenticate(token, email, userName) {
    setAuthToken(token);
    setAuthEmail(email);
    setAuthUserName(userName);
    console.log("context working");
  }

  function logout() {
    setAuthToken(null);
    setAuthEmail(null);
    setAuthUserName(null);
    console.log("context working");
  }

  const value = {
    token: authToken,
    email: authEmail,
    userName: authUserName,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
