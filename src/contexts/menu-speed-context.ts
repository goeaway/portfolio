import { createContext } from "react";

export interface MenuSpeed {
    speed: number;
    setSpeed: (speed: number) => void;
}

const MenuSpeedContext = createContext<MenuSpeed>({
    speed: 300,
    setSpeed: (speed: number) => {}
});

export default MenuSpeedContext;