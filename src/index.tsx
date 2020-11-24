import React from "react";
import ReactDOM from "react-dom";
import "styled-components";
import App from "./components/app";
import { Theme } from "./types";
import "styled-components";

const root = document.getElementById("app-root");

ReactDOM.render(<App />, root);

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}