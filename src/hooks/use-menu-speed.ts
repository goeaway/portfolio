import { useContext } from "react";
import MenuSpeedContext from "../contexts/menu-speed-context";

const useMenuSpeed = () => useContext(MenuSpeedContext);

export default useMenuSpeed;