import React, {useContext} from 'react';
import { NavLink } from "react-router-dom";
import { createUseStyles } from "react-jss";
import {MenuContext} from "../../context/MenuContext";

const useStyles = createUseStyles({
  navItem: {
    '& > a': {
      color: "#9f9d9d",
      textDecoration: "none",
      transition: 'all .3s',
      cursor: "pointer",
      '&:hover': {
        color: "red",
      },
      '@media (max-width: 425px)': {
        color: '#fff',
      },
    },
    '& > a.active': {
      color: '#000',
      '@media (max-width: 425px)': {
        color: '#c9c9c9',
      },
    },
  },
})

const MyLink = ({ endpoint, name }) => {
  const { navItem } = useStyles()
  const { setOpenMenu } = useContext(MenuContext)

  return (
    <li className={navItem}>
      <NavLink onClick={() => setOpenMenu(false)} to={endpoint} >{name}</NavLink>
    </li>
  );
};

export default MyLink;
