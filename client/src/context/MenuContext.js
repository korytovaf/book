import { createContext } from "react";

const noop = () => {};

export const MenuContext = createContext({
  openMenu: false,
  setOpenMenu: noop,
})
