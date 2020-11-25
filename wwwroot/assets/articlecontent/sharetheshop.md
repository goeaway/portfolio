### what is it
- simple way to create shopping lists on web
- UPS is that you can do it in real time with another person

### why make it
- to use signalR
- to use AWS

### how did i do it, what techs
- created react website where lists can be made
- used styled-components and react-beautiful-dnd to make good looking UI + good UX
- created .net core web api with sql db and entity framework to store lists for users
- set up to use signalR so i can "join" a list and update it
- tried to put on AWS lambda but had trouble, i think with it's "serverless" nature signalR was losing connection
- messed around with it for a while but ended up using AWS beanstalk instead

### conclusion
- made a simple app with cool feature
- enjoyed working with react-beautiful-dnd and react in general
- SignalR was surprisingly easy to setup was impressed with it
- AWS lambda not working was disappointing but would like to use it in future