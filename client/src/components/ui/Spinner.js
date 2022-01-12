import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  '@keyframes ldsDualRing': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  ldsDualRing: {
    display: 'inline-block',
    width: 80,
    height: 80,
    '&:after': {
      content: '""',
      display: 'block',
      width: 40,
      height: 40,
      margin: 8,
      borderRadius: '50%',
      border: '4px solid #000',
      borderColor: '#000 transparent #000 transparent',
      animation: '$ldsDualRing 1.2s linear infinite'
    },
  },
})

const Spinner = () => {
  const { ldsDualRing, wrapper } = useStyles()

  return (
    <div className={wrapper}>
      <div className={ldsDualRing} />
    </div>
  );
};

export default Spinner;
