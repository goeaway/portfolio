import { useState, useEffect, MutableRefObject } from "react";

const useElementInViewport = (ref: MutableRefObject<HTMLElement>, triggerOnce?: boolean) => {
    const [triggered, setTriggered] = useState(false);
    const [inViewport, setInViewport] = useState(false);

    useEffect(() => {
        const handler = () => {
            if(ref.current && (!triggerOnce || !triggered)) {
                const rect = ref.current.getBoundingClientRect();
                const result = rect.y <= window.innerHeight; 

                if(!result || !triggerOnce || !triggered) {
                    setInViewport(result);
                }

                if(result) {
                    setTriggered(true);
                }
            }
        };

        handler();

        window.addEventListener("scroll", handler);

        return () => window.removeEventListener("scroll", handler);
    }, [triggered]);

    return inViewport;
}

export default useElementInViewport;