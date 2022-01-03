import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    gap: 40,
  },
  header: {

  }
})

const Main = ({ children, title }) => {
  const { main, header } = useStyles()

  return (
    <main className={main}>
      <h1 className={header}>{title}</h1>
      {children}
    </main>
  );
};

export default Main;
