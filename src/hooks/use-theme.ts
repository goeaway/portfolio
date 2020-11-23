import { Theme } from "@src/types";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

const useTheme = () => useContext<Theme>(ThemeContext);

export default useTheme;