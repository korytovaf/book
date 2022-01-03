import React, { useContext, useState } from 'react';
import { useHttp } from "../../hooks/http.hook";
import { useNavigate } from "react-router-dom";
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

const Signup = ({ onLogin }) => {
  const { wrapper, labelWrapper } = useStyles()
  const { loading, request } = useHttp()
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    nameUser: '',
    email: '',
    password: ''
  });

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const onSignup = async (event) => {
    event.preventDefault()
    try {
      const data = await request('/api/auth/register', 'POST', {...formData})
      login(data.token, data.userId)
      navigate('/', { replace: true })
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <>
      <form className={wrapper} action="">
        <label className={labelWrapper}  htmlFor="name">
          <span>Имя</span>
          <input
            name="nameUser"
            value={formData.nameUser}
            type="text"
            onChange={changeHandler}
          />
        </label>
        <label className={labelWrapper}  htmlFor="email">
          <span>Email</span>
          <input
            name="email"
            value={formData.email}
            type="email"
            onChange={changeHandler}
          />
        </label>
        <label className={labelWrapper}  htmlFor="password">
          <span>Пароль</span>
          <input
            name="password"
            value={formData.password}
            type="password"
            onChange={changeHandler}
          />
        </label>
        <button
          disabled={loading}
          onClick={onSignup}
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <div>
        <button type="button" onClick={onLogin}>Войти</button>
      </div>
    </>
  );
};

export default Signup;
