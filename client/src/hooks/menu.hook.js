import {useState} from "react";

export const useMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return { openMenu, setOpenMenu }
}
