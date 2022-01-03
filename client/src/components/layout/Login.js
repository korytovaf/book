import React, {useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  wrapper: {
    display: "flex",
    flexDirection: 'column',
    gap: 20,
  },
  labelWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  }
})

const Login = ({ onSignup }) => {
  const { wrapper, labelWrapper } = useStyles()
  const { loading, request } = useHttp()
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const onLogin = async (event) => {
    event.preventDefault()
    try {
      const data = await request('/api/auth/login', 'POST', {...formData})
      login(data.token, data.userId)
      navigate('/', { replace: true })
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <>
      <form className={wrapper} action="">
        <label className={labelWrapper} htmlFor="email">
          <span>Email</span>
          <input
            name="email"
            value={formData.email}
            type="email"
            onChange={changeHandler}
          />
        </label>
        <label className={labelWrapper} htmlFor="password">
          <span>Пароль</span>
          <input
            name="password"
            value={formData.password}
            type="password"
            onChange={changeHandler}
          />
        </label>
        <button disabled={loading} onClick={onLogin} type="submit">Войти</button>
      </form>
      <div>
        <button type="button" onClick={onSignup}>Зарегистрироваться</button>
      </div>
    </>
  );
};

export default Login;
