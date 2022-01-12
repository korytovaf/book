import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  button: {
    height: 30,
    minWidth: 120,
    border: '1px solid #000',
    borderRadius: 3,
    backgroundColor: '#fff',
    padding: '0 10px',
  }
});

const MyButton = ({ children, type = 'button', ...props }) => {
  const { button } = useStyles();
  return (
    <button className={button} type={type} {...props}>
      {children}
    </button>
  );
};

export default MyButton;
