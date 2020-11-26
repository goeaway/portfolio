A traumatic childhood memory for everybody is losing your mum in the supermarket, right. We all know the drill, tasked by her to get something from the other side of the shop. We always know what will happen. You'll find the thing easily, finding her again is the hard part! How many aisles do you normally walk past before you start thinking she's deliberately hiding from you eh? It's always the same, "go and get this", and then they just seem to run away in the other direction. This application isn't a mum tracker, but it could give you a good idea of where your mum (or anyone else you share your list with) might be at the moment. This simple little website allows you to collaborate on a shopping list (or any-old todo list) in real time with other people. 

To get the real time-ness, I used SignalR, a surprisingly simple-to-get-started library from Microsoft. I hooked it up between a react front end (as usual) and a .netcore web api (again as usual). 

I'd never used SignalR before, but the documentation and the straightfoward API made it really quite easy, not to mention the solid support for it in .net core.

I made good use of palettehonk.com in this project, not just for the colour picking, but I also used a number of node packages here that I used there. Styled-components and react-beautiful-dnd to name a few.

The actual development time for this project was nice and short, using techs I was familiar with, and others that had good APIs meant everything just fit into place. The difficuult part for me was getting it hosted. 

I used netlify to host the react app, no issues there, but spent a while shopping around for a good solution for the web api and DB. I started with azure, which I've used before but after starting a trial account and getting the build pipeline set up, I quickly realised it was going to be WAY too expensive for what this was. Azure, although providing a free trial account, shows you exactly how much you would be spending on a proper subscription (one which automatically starts 30 days after creating a free one). This feature was great, as it meant I could instantly see Azure was not the right choice!

I moved onto AWS, as it provided a whole year free on a number of software solutions. I set up an account and got to work trying to set up a lambda function. After a while getting lost in the docs and getting lost in the config settings for the API gateway, I'd managed to set it up. I now had the web api running and was able to save and get lists from the DB. The only problem now was that for some reason the SignalR part wasn't working. For some reason it just couldn't keep a connection open between front end and back end, which meant that I just had to use a normal http request fallback I'd added. This just wouldn't do, the whole point of the application not working!

After an even longer while, going back and forth between API gateway and lambda function, tweaking settings and praying for success. I decided that the serverless nature of Lambda was causing it, or was it that the API gateway didn't like web sockets? I'm still not sure to this day what was up with it.

The fact I couldn't use Lambda was quite disappointing, after all, Lambda seems to be pretty trendy at the moment and it was a shame I couldn't figure out a way to get it to work, even though I was so close!

I switched to using Elastic Beanstalk instead, which after a few config changes and a few updates to the build pipeline I'd created in Azure Dev Ops, I managed to get working quite well. 

You can try the app out yourself with the link at the top of the page and see what you think! All in all this was a great experience for me getting some exposure to SignalR and AWS and although I couldn't get AWS Lambda to work this time I definitely want to try again in the future!
