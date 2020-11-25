If you've ever built a website you'd probably agree that one of the hardest parts of it is just designing the thing. How do you want it to look? How should things be structured? What colours should be used? These seem like simple questions but they're ones any dev can spend ages thinking about because there's not _really_ a right or wrong answer. You could make a hundred decisions on what the best colour scheme is... or you could do what I do and pick one random set and run with it, before realising you never actually liked it anyway.

For me, this process was kind of getting in the way of what I actually wanted to be doing; making cool web apps. I would often try and pick a colour scheme and a good style framework but once I'd "done" it would often be second guessing myself, thinking about how maybe it could be a bit better, to the point where I'd kind of block myself from adding actual features because I knew I'd have to think about those damn colours again.

My solution to this was to build palette honk, a simple web app where I can see a load of colours and shades of colours at once, next to each other. Basically the same thing you'd do when shopping for wall paint in B&Q. I wanted to be able to mix and match colours and drag them around to see if one set went well with another. 

This drag and drop aspect was really important, so after cobbling together a simple app that showed a load of random colour palettes next to each other, I set off to find a react library that could do it for me. What, you think I'm gunna do that myself?

At first, I settled on [React DnD](https://github.com/react-dnd/react-dnd#readme), a fairly popular solution that was the first result on google. Although getting a quick test working was quick, it was pretty obvious this would require a bit of work on my part, particular if I wanted nice animations of the palettes when dragging other palettes around. More work on this project was less on the ones I actually wanted to do, so back to google for an even better library.

Fortunately, the second result on google was [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) a really really nice library that's actually built on the last one (seems like others had the same thoughts as me). This one was perfect for what I wanted, a solution really meant for dragging items around in lists.

After a few minutes of getting it working (the API is slightly complicated, but the documentation for this library is some of the best I've ever seen) and a few hours of aimlessly dragging palettes around, just watching the other ones pop into place, I had the basic functionality I wanted.

Being able to edit the palettes was next, I wanted it to be a quick process of picking a randomised palette I like, or dropping in a colour I'd found elsewhere and changing the shades slightly. So I added the ability to edit the central palette colour and also allowed for scrolling up and down within a palette to raise or lower the luminence of all the colours in a palette at once. This means you can really quickly get a colour you think you like, and a load of other shades around it that can be used for other parts of a theme.

Locking and copying palettes were next. I wanted to be able to protect palettes I liked from being lost to an accidental randomise or miss-scroll, so adding the ability to lock a palette to the current colours was useful. I then also added the ability to copy a single palette or all palettes at the click of a button, this would be a bit useless if you couldn't get the colours out easily.

There are a hundred things you could add to this, like making the randomisation of colours a bit less random and a bit more smart but I wanted this to be a quick turn around so I could get on to something else, and actually use this as a tool. 

The last step was to publish it somehow. Netlify was a great choice for this! Free hosting, free SSL, custom domain support and a silky smooth build process from Github.

I have no idea why I chose "Palette Honk"...