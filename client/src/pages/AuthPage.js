import React, {useState} from 'react';
import Login from "../components/layout/Login";
import Signup from "../components/layout/Signup";
import Main from "../components/layout/Main";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  authWrapper: {
    display: "flex",
    flexDirection: 'column',
    gap: 20,
    maxWidth: 400,

  },
})

const AuthPage = () => {
  const { authWrapper } = useStyles()
  const [action, setAction] = useState('login')
  const onLogin = () => {
    setAction('login')
  }
  const onSignup = () => {
    setAction('signup')
  }

  return (
    <Main title="Авторизация">
      <div className={authWrapper}>
        {action === 'login'
          ? <Login onSignup={onSignup}/>
          : <Signup onLogin={onLogin} />
        }
      </div>
    </Main>
  );
};

export default AuthPage;
