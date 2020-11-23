import { AnimatePresence } from "framer-motion";
import React from "react";
import { Switch, useLocation } from "react-router-dom";

const AnimatedSwitch : React.FC = ({ children }) => {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
                {children}
            </Switch>
        </AnimatePresence>
    );
}

export default AnimatedSwitch;