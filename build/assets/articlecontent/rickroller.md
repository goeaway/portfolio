If you grew up in the early 2010s like me you'll've spent endless nights after school watching videos on YouTube. Ray William Johnson, Guitar Hero 100%, MW2 Quick Scope No Scope 360 Montages, were a staple in any teenagers online trepidations. Unfortunately, the warm, fuzzy nostalgia of 2010 is haunted by the distant tunes of 80s synths. You can hear it now, the way it starts. The innocent, hopeful pop track that signals the ultimate betrayal in the online community...

# The Rick Roll

If you don't know what I'm on about, Rick Rolling is a simple internet prank that involves posting a link online and pretending it is for something innocuous, when in reality, it's a link to the popular 80s song "Never Gunna Give You Up" by Rick Astley. The first time you hear about it you probably think it's extremely stupid, which is exactly what it is, and falling for it can often leaving you feeling very hurt and betrayed. [Someone else explains it really well here](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

...If that one got you I've got a really good browser extension for you to try, because you may need it like me.

# The Extension

I came up with this idea when browsing Reddit and managed to get Rick Rolled 3 times within about 20 minutes. Although I do love the song (secretly everyone does), after the third time I'd decided it was enough. I had to do something about this.

Clearly, conditioning myself to take a bit more care when clicking links on the internet wasn't working. So I turned to my technical skills to help out. I'm going to use my human brain to protect my monkey brain...

The flow for the extension is pretty simple and is shown below:

![Rick Roll Blocker Flow](https://joetm.space/assets/articleimages/rick_2.jpg)

The extension consists of 3 parts:

* The browser popup - This allows the user to set exactly what links are in the blacklist and whether or not blocking is enabled. The extension is altering behaviour of the browser, so I thought it was important to allow the user to enable/disable the functionality as easily as possible. I used React to build the UI here, which was probably overkill but I felt it would make the interaction between the browser API and the extension a bit easier to manage. I'm also so used to setting up applications using React that it was extremely quick to get going with.

![Rick Roll Blocker Popup](https://joetm.space/assets/articleimages/rick_3.jpg)

* The safety page - This is where the user is taken to when a bad URL is navigated to. Users can also unblock the url that they were just protected from, or allow the link through for one time. It also uses React.

![Rick Roll Blocker Popup](https://joetm.space/assets/articleimages/rick_4.jpg)

* The background script - This is where it's decided whether a URL is okay or not. It's a pretty simple script that makes good use of the browser's API to get browser storage items for the blacklist, enabledness and also listen for tab changes. No React here because there's no UI.

```
import { browser } from "webextension-polyfill-ts";
import messageListener from "./message-listener";
import tabUpdatedListener from "./tab-updated-listener";

// start by getting the blacklist
browser.storage.local.get("blacklist").then(data => {
    const blacklist = data[Object.keys(data)[0]];
    
    // use the built in filter on the listener to only run the event when the url matches a blacklisted url
    browser.tabs.onUpdated.addListener(tabUpdatedListener, { urls: blacklist && !!blacklist.length ? blacklist : ["https://dummydummydummy"] });
    browser.runtime.onMessage.addListener(messageListener);
});

// add a listener for storage update, in case blacklist is updated
browser.storage.onChanged.addListener(changes => {
    const blacklistChange = changes["blacklist"];

    if(blacklistChange) {
        const newBlacklist = blacklistChange.newValue;
        // remove existing listener 
        browser.tabs.onUpdated.removeListener(tabUpdatedListener);
        // add listener with new blacklist
        browser.tabs.onUpdated.addListener(tabUpdatedListener, { urls: newBlacklist });
    }
});
```

This was a really quick and easy application process. The Browser API that makes this all work was really easy to use and has some great documentation. The hardest part was just waiting for authorisation to publish the extension on the Firefox Add Ons marketplace.

In future I'd like to track the amount of times you've been protected, perhaps with a nice list of all the times you were almost bested on the safety page.

[Click here](https://addons.mozilla.org/en-GB/firefox/addon/rick-roll-blocker/) if you'd like to try it out for yourself!