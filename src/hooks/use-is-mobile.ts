import { useEffect, useState } from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;

        const mobileRegexPattern = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
        const matchesMobile = Boolean(userAgent.match(mobileRegexPattern));

        if(matchesMobile) {
            setIsMobile(true);
        }
    }, []);

    return isMobile;
};

export default useIsMobile;