## Pathfinding Algorithms

Pathfinding algorithms are bits of code that assess the best (usually shortest) route from one point to another, usually within a graph of different points, or nodes. They can come in a few different variants and often vary in efficiency. Some are better than others but don't worry, that won't stop people arguing about which is better, I'm sure.

They have numerous real world applications too, aside from the obvious of being the core part of any satnav system, pathfinding is used everywhere, from video games to artificial intelligence, scientific discovery and industrial planning. These algorithms have shaped modern life.

Although they're used in so many places, a lot of the pathfinding algorithms used today were devised in the 50s and 60s. Even though they're pretty old by the tech industry's standards, they're a fascinating area to learn about. For this reason, I wanted to try and understand them better.

I decided the best way to do that was to create some kind of visualiser which would enable me to see the "decisions" these algorithms in order to get to the end goal. 

## Pathfinder Debugger

Here's a screenshot of the app. You can give it a try yourself by [clicking here](https://pathfinderdebugger.com). During development I realised a useful feature would be to allow a user to see and edit the code that is used for each of the algorithms I implemented + a way to create their own implementation if they wanted to.

![The Application](/assets/articleimages/pathfinderdebugger_2.jpg)

Users can pick from 3 common pathfinding algorithms, or choose to implement their own.

On the right side is the board, where paths, checked cells and interesting terrain are visualised. The user adds a start and end node anywhere on the board and can then add impassible walls (the mountains) that the algorithms aren't allowed to cross. 

Some algorithms also take into account the "weight" of moving from one node to another when deciding the shortest route, so users can also add these (trees) with a numeric value between 2 and 5 (non weighted cells have a weight of 1). This means the algorithms that care about weight will try to bypass heavily weighted nodes if they can.

Once the user has selected an algorithm to use, and set up the board with start, end and all the extra terrain they want, they can hit the Run button and see how the algorithm performs. If it's been correctly implemented, the algorithm should find the shortest route between the start and end (unless it's blocked by walls).

## Custom algorithms

The user can implement their own pathfinding algorithm. The application provides a code editor and starter code to use.

![Custom algorithm](/assets/articleimages/pathfinderdebugger_3.jpg)

The starter code here provides a class with a single function. The function provides the run settings, which includes a graph version of the board. This is an adjacency list (in object form) of all the passable cells on the board, each with a collection of passable neighbours. In hindsight this would have probably worked better as a matrix, seeing as each neighbour will appear in each other neighbour's collection. The complexity benefit of using a list here over a matrix is mostly lost when a lot of the nodes have neighbours too. A change here in future would be good!

Along with the graph, the settings include the start and end positions the algorithm should go between.

The function provides an updater callback, which is an asynchronous function to be used somewhere in the algorithm. This takes an array of positions that should be updated. During runtime, the application waits for a short period after each updater call to ensure the board updates at a slow enough rate for a human to see.

Finally, the function provides a canceller callback which should be used to make sure the algorithm can stop quickly if the user presses the stop run button. I spent a while trying to remove the need for this function. I'd hoped I could create some kind of cancellable promise or similar mechanism that just stopped the run automatically, but I had no such luck. I don't think it's really possible because of JS's single threaded nature, but would improve the API of the app a little bit.

From here, it's up to the implementer to get it working. As long as they provide an array of positions along the final route, or null if not possible, it should work perfectly!

## Extra Features

Additional features include randomising the board with different terrain, being able to set the value of weight tiles up to 5 and a nice little tooltip that can show extra information for all the cells on the board.

![Cell Tooltip](/assets/articleimages/pathfinderdebugger_4.jpg)

## Still to add

There are a few features I'd like to add to this project, some more pre-made algorithms would be nice and being able to provide more insight into the choices made by an algorithm would be cool. 

## Wrapping Up

This project has given me some good insight into how pathfinding algorithms work. They seem rather complex but in reality are quite simple. After doing this I'd like to take a look at how games implement them. The pathfinding algorithms in games can be quite complex when you introduce different rules and limits, such as only being able to go a certain amount of tiles in a turn, or having to go via separate locations.
