import React, {useContext} from 'react';
import MyLink from "../ui/MyLink";
import {AuthContext} from "../../context/AuthContext";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  navList: {
    display: "flex",
    flexWrap: "nowrap",
    gap: 20,
    '@media (max-width: 425px)': {
      flexDirection: 'column',
      alignItems: "center",
    },
  },
})

const Navigation = () => {
  const { navList } = useStyles()
  const { isAuth } = useContext(AuthContext)

  return (
    <nav>
      <ul className={navList}>
        <MyLink endpoint="/" name="Главная"/>
        {isAuth && <MyLink endpoint="/create" name="Редактировать"/>}
      </ul>
    </nav>
  );
};

export default Navigation;
