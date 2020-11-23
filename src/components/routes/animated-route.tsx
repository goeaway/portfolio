import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { motion } from "framer-motion";

const AnimatedRoute: React.FC<RouteProps> = ({component: Component, ...rest}) => {
    const variants = {
        initial: {
            opacity: 0
        },
        in: {
            opacity: 1,
            transition: { duration: .3 }
        },
        out: {
            opacity: 0,
            transition: { duration: .3 }
        }
    }

    return (
        <Route {...rest} render={props => (
            <motion.div 
                variants={variants} 
                initial="initial" 
                animate="in" 
                exit="out">
                <Component {...props} />
            </motion.div>
        )}></Route>
    );
}

export default AnimatedRoute;