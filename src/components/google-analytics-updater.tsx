import React, { useEffect } from "react";
import { useHistory } from "react-router";

const GoogleAnalyticsUpdater = () => {
    // listens for history changes and updates the ga API 
    const history = useHistory();

    useEffect(() => {
        const removeHistoryListener = history.listen(location => {
            window.ga('set', 'page', location.pathname);
            window.ga('send', 'pageview');
        });

        return () => {
            removeHistoryListener();
        }
    }, []);

    return null;
}

export default GoogleAnalyticsUpdater;