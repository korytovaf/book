import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createUseStyles } from "react-jss";
import Navigation from "./layout/Navigation";
import {MenuContext} from "../context/MenuContext";
import MyButton from "./ui/MyButton";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    zIndex: 1,
    transition: 'all .4s cubic-bezier(0.42, 0, 0, 1.22)',
    '@media (max-width: 425px)': {
      position: "fixed",
      bottom: 40,
      right: 30,
      height: 50,
      width: 50,
      boxShadow: '0px 0px 8px 0px #363636',
      backgroundColor: '#ff6c6c',
      borderRadius: '50%',
    },
  },
  burger: {
    borderRadius: '50%',
    border: "none",
    color: '#fff',
    backgroundColor: "#ff6c6c",
    position: "fixed",
    bottom: 40,
    right: 30,
    height: 50,
    width: 50,
    zIndex: 1,
    boxShadow: '0px 0px 8px 0px #363636',
    '@media (min-width: 426px)': {
      display: "none",
    },
  },
  btnClose: {
    position: "absolute",
    top: 20,
    right: 20,
    '@media (min-width: 426px)': {
      display: "none",
    },
  },
  navOpen: {
    overflow: 'visible',
    opacity: 1,
    bottom: '-50vh',
    right: 'calc(-100vh + 50%)',
    width: '200vh',
    height: '200vh',
    borderRadius: '50%',
    gap: 20,
  },
  wrapperMenu: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    width: '100%',
    gap: 30,
    transition: 'all .4s',
    '@media (max-width: 425px)': {
      opacity: 0,
      position: "fixed",
      width: '100%',
      height: '100%',
      top: '100%',
      right: 0,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
  },
  openWrapperMenu: {
    top: 0,
    left: 0,
    zIndex: 1,
    opacity: 1
  },
})

const Header = () => {
  const { header, burger, btnClose, navOpen, wrapperMenu, openWrapperMenu } = useStyles()
  const { isAuth, logout } = useContext(AuthContext)
  const { openMenu, setOpenMenu } = useContext(MenuContext)
  const navigate = useNavigate();

  const onLogout = () => {
    logout()
    navigate("/auth", { replace: true });
  }

  const onLogin = () => {
    navigate("/auth", { replace: true });
  }

  return (
    <>
      <header className={`${header} ${openMenu && navOpen}`}>
        <div className={`${wrapperMenu} ${openMenu && openWrapperMenu}`}>
          <Navigation/>
          {isAuth
            ? <MyButton onClick={onLogout}>Выйти</MyButton>
            : <MyButton onClick={onLogin}>Войти</MyButton>
          }
          <button className={btnClose} onClick={() => setOpenMenu(false)} type="button">Х</button>
        </div>
      </header>
      {!openMenu && <button className={burger} onClick={() => setOpenMenu(true)} type="button">Меню</button>}
    </>
  );
};

export default Header;
