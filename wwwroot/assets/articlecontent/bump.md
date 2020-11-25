### what is it
- simple desktop application to allow for you to chat with yourself across multiple devices

### why
- often using multiple computers i might want to continue watching a video or reading a link on another computer
- no easy way of doing that unless emailing or sending IM to someone else

### how 
- created UWP application and .net core WEB API
- UWP is a chat application where user can create room and send messages, user just creates room and then leave message, remember room id and then open on another computer
- no real security just that original room maker can remove anyone from it
- UWP app connects to web api with signalR
- Host web api on AWS (preferrably lambda)
- app downloadable from here?

### conclusion
- dunno yet