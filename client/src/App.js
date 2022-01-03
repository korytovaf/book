import React from 'react';
import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";
import Header from "./components/Header";
import "./App.css";
import {MenuContext} from "./context/MenuContext";
import {useMenu} from "./hooks/menu.hook";

function App() {
  const { token, login, userId, logout } = useAuth()
  const { openMenu, setOpenMenu} = useMenu()
  const isAuth = !!token
  const route = useRoutes(isAuth);

  return (
    <AuthContext.Provider value={{ token, login, userId, logout, isAuth }}>
      <MenuContext.Provider value={{ openMenu, setOpenMenu }} >
        <BrowserRouter>
          <div className="container">
            <Header />
            { route }
          </div>
        </BrowserRouter>
      </MenuContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
