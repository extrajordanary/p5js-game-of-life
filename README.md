## What is the Game of Life?
From the Wikipedia entry for [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules):

>The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, or "populated" or "unpopulated". Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

>- Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
>- Any live cell with two or three live neighbours lives on to the next generation.
>- Any live cell with more than three live neighbours dies, as if by overpopulation.
>- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


>The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.

You can also try out this Interactive Game of Life (https://bitstorm.org/gameoflife/) to get a better idea of what you're about to build.

We're going to build one that starts out with just the basic functionality on a simple web site, and will look like this:

![gif of the game of life](https://media.giphy.com/media/QfsvYoBSSpfbtFJIVo/giphy.gif)

### Project Requirements

What will our Game of Life (GOL) program need to be able to do?

We'll implement the following requirements in steps so that the program always runs and we can see the improvements over time:

- draw a two-dimensional grid of square cells
- keep track of each cell in the grid
- a cell can be in one of 2 states: dead or alive
- create an initial population to seed the grid with dead and alive cells
- get the 8 neighbors for any cell and count how many neighbors are alive
- change a cell to being alive or dead based on the rules
- transition all cells from one generation to the next at the same time


## Creating the Game of Life

For this tutorial, we'll be making edits to the index.js file.


### Step 1

Inside of `index.js`, there is already have a `Grid` class with a `draw` function. Now, we want to give the `Grid` class a constructor parameter `cellSize` so that it can automatically calculate how many columns and rows it should have based on the canvas `width` and `height`.

#### Check

When you are done, uncomment/re-enable the other lines of code in `setup` and `draw` (remove the `//` in front of the code) and confirm that you now see a grid of 20x20 cells in your canvas.

![screenshot screenshot of initial grid](images/grid-all-dead-pretty.png)


### Step 2

Now we need to add a way to keep track of the contents of each cell in the grid. At the bottom of the constructor, we need to create and assign a 2D array to `cells`.First assign `cells` to a new array with length equal to `numberOfColumns`. Then, for each position in the array, assign it to another new array with length equal to `numberOfRows`.

Here's one way to create a 2D array:

```javascript
var x = 2; // how big the first array should be
var y = 2; // how big each array inside of the first array should be
var twoDArray = new Array(x);

for (var i = 0; i < twoDArray.length; i ++) {
  twoDArray[i] = new Array(y);
}

print(twoDArray); // prints [[null, null],[null, null]] in the console
```

#### Check

Add `print(this.cells)` at the end of the constructor. Check that the console prints out `Array(20)` (you should also be able to expand it and see that each position also holds an empty array).

![screenshot of viewing the empty arrays in the console](images/console-empty-arrays-pretty.png)


### Step 3

Right now our grid has an array of arrays to keep track of cells, but we need some cells to put in it. Let's start by creating a basic `Cell` class. Each cell should have a `column`, `row`, and `size` - ensure the constructor takes these as parameters.

Additionally, each cell can be either alive or dead, so let's add a boolean property to keep track of it called `isAlive`.

Inside the constructor, have every cell start off dead (`isAlive` should be `false`).

Once you have the basic `Cell` class added, paste the following code just above `print(this.cells)` from the last step:

```javascript
for (var column = 0; column < this.numberOfColumns; column ++) {
  for (var row = 0; row < this.numberOfRows; row++) {
    this.cells[column][row] = new Cell(column, row, cellSize);
  }
}
```
This code will go create a new `Cell` for each position in the 2D array.

#### Check

Run the program and check that the console now shows a `Cell` and it's values instead of empty arrays.

![screenshot of array of arrays of cells in console](images/console-arrays-of-cells-pretty.png)


### Step 4

Now that our grid can keep track of all of it's cells, let's start adding more functionality to the cell. To start, let's give `Cell` it's own `draw` function, so that it will be responsible for it's own appearance based on whether it is dead or alive.

Inside of `Grid.draw`, remove everything inside of the nested for loop and paste it inside of the new `Cell.draw` function. Be sure to update the variables from the copied code to use `this` and to match the property names within the cell class (`column` -> `this.column`, etc).

Back in the `Grid.draw` for loop, instead, get the cell from `this.cells` and call `draw` on it. When you re-run your program everything should look exactly the same but now each cell is drawing itself.

_If you get errors, use them to help guide you to where you still need to make changes, as they will often give you a line number and indicate which variable it couldn't find._

Finally, replace `fill(240);` with an `if else` statement to change the `fill` color depending on if the cell is alive or dead. You may choose any colors you like, but this tutorial will use `color(240)` for dead cells, and `color(200,0,200)` for alive cells.

#### Check

Temporarily change `this.isAlive = false;` to `this.isAlive = true;` inside of the cell constructor and confirm that your `if` statement is correctly assigning colors depending on the cell's value.

All cells dead:

![screenshot of all dead](images/grid-all-dead-pretty.png)

All cells alive:

![screenshot of all alive](images/grid-all-alive-pretty.png)


### Step 5

Starting all the cells as all dead or all alive isn't very exciting. First let's add a function to `Cell` that we can call to set the value of `isAlive` directly. Add a new function to `Cell` called `setIsAlive`, that takes a paramenter `value`. If `value` is true, assign `isAlive` to true, otherwise set it to `false`.

Now we want to add a new function `randomize` to `Grid`. It should loop over all of it's cells just like the `draw` function. But instead of calling `draw` on the cell, we want to call `setIsAlive` and pass it a value that will evaluate to `true` or `false`.

We can use `random` to help us. Since `0` is treated as `false` and `1` is treated as `true`, we can do `floor(random(2))` and pass the result to `setIsAlive`. `random(2)` will create random decimals between 0 and 2, and `floor` turns it into an integer by dropping everything after the decimal.

You can try `print(random(2));` and `print(floor(random(2)));` to see the results in the console.

![screenshot of different random float values in console](images/console-random-floats-pretty.png)

Finally, add `grid.randomize();` to the bottom of the `setup` function.

#### Check
Each time you run the program, you should now be seeing a different mix of dead and alive cells.

![screenshot of random alive and dead cell population](images/grid-random-population-pretty.png)


### Step 6
Let's add the `mousePressed()` function (remember that it's a global function, don't put it inside one of the classes by accident!) - this will help us check our code in the future steps. Put `grid.randomize()` in it and check that each time you click the grid re-randomizes the cells.

Now we are ready to start adding the advanced logic for how the population will change over time. Let's review the logic we need to implement:

- Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

So, what pieces of information will we need? Notice that each line expresses some conditional logic based on two properties: whether the cell is currently dead or alive, and how many of the neighboring cells are alive. We already have the ability to check if a cell is dead or alive, but now we need to add some code that will tell us the number of living neighbors the cell has.

Add a new property to `Cell` to store `liveNeighborCount` and initialize it as `0` on creation.

Great, now we have the two pieces of information, so we can add a function to the Cell class that uses them to implement the 4 conditions above.

Make `liveOrDie` as a function in the `Cell` class. Here is where you now need to add some conditional logic for the cell to look at it's values for `isAlive` and `neighborCount` and determine what to change `isAlive` to.

Now we need a place to call `liveOrDie` on each cell.

Add an `updatePopulation` function to `Grid`. Inside the method, loop over each cell and call `liveOrDie` on it.

#### Check
Inside of `mousePressed` replace `grid.randomize` with `grid.updatePopulation`.

When you start the program you should see the grid with a random population of cells just like before. And when you click... they should all die!

This is because right now all of the cells think they have 0 neighbors because that's how we initialized them. We'll add logic to update their information correctly in the next steps.

### Step 7
Now we need to write some code that will be able to correctly update the value of `liveNeighborCount` on each of our cells.

To do this, we need to be able to get all of the neighboring grid locations around each cell and then count how many of them are living cells.

Let's break the logic into two parts, first let's focus on just getting all of the neighbors for a cell.

Create a new function on the `Grid` class called `getNeighbors` that takes an argument called `currentCell`. We want this function to `return` all of the neighbor cells in an array:

```javascript
getNeighbors(currentCell) {
  var neighbors = [];

  // add logic to get neighbors and add them to the array

  return neighbors;
}
```

One of the hardest parts of this function will be answering the question: how do we get a cell's neighbors?

Let's look at an example with a much smaller grid. If a cell is at position `1,1` in the grid, it's neighbor cells will be the 8 surrounding cells in the grid.

![image of 3x3 grid, center cell is selected with 8 neighbors](images/neighbor-cells-pretty.png)

You can see that the x-values for neighbor cells are either 1 less, the same, or 1 more than the current cell's x position. The same is true for the y-values.

So, given `currentCell`, the way to get the `neighborColumn` and `neighborRow` for all 9 positions around _and including_ the cell, the code would look like this:

```javascript
for (var xOffset = -1; xOffset <= 1; xOffset++) {
  for (var yOffset = -1; yOffset <= 1; yOffset++) {
    var neighborColumn = currentCell.column + xOffset;
    var neighborRow = currentCell.row + yOffset;

    // do something with neighborColumn and neighborRow
  }
}
```

#### Check
Replace the contents of `mousePressed` with the following:

```javascript
var randomColumn = floor(random(grid.numberOfColumns));
var randomRow = floor(random(grid.numberOfRows));

var randomCell = grid.cells[randomColumn][randomRow];
var neighborCount = grid.getNeighbors(randomCell).length;

print("cell at " + randomCell.column + ", " + randomCell.row + " has " + neighborCount + " neighbors");
```

Each time you click it will get a random cell from the grid and use the `getNeighbors` function and print the size of the array that it gets.

You should see that almost every cell has 9 neighbors, and every now and then you will see an error like:
`Uncaught TypeError: Cannot read property '0' of undefined`

### Step 8
Our function in the last step _mostly_ works, but now it's time to correctly handle the edge cases for `getNeighbors`.

We have that error about `Cannot read property '0' of undefined`. Generate a few of the errors and see if you can spot the pattern of when it happens.

Take a look at this example from our 3x3 grid again. What happens when you call `getNeighbors` on a cell that is along an edge? Does it have 8 neighbors?

![image of 3x3 grid, edge cell is selected with less than 8 valid neighbors](images/neighbor-cells-edgecase-pretty.png)

To ensure that your code doesn't try to access any non-existant neighbors outside the bounds of the grid, let's add a helper function we can use.

In the `Grid` class, add:

```javascript
isValidPosition (column, row) {
  // add logic that checks if the column and row exist in the grid
  // return true if they are valid and false if they are not
}
```

#### Check
You can check your `isValidPosition` function by adding some calls at the end of `setup` or `mousePressed` functions to try some column and rows that you know should be `true` and trying some that you know should be `false`.

```javascript
print(grid.isValidPosition(0, 0)); // should be true
print(grid.isValidPosition(-1, -1)); // should be false
// Add an example for all of the possible ways that it should return false
```


### Step 9
Now that you can use the helper to check which grid locations are valid, update the `getNeighbors` function to use `isValidPosition` so that it will stop throwing errors when it tries to access bad locations.

There's still another issue to fix. We saw it said each cell had 9 neighbors - but that's one more than it should have! That means it was counting the `currentCell` as a neighbor.

Add some logic inside `getNeighbors` to prevent the cell that is the current cell from being added to the array.

#### Check
After making your fixes, your print statements in the console should now stop throwing errors.

You should also see that now most cells have 8 neighbors but some have 3 (corners) or 5 (edges).

### Step 10
Now that we are able to correctly get an array of any cell's neighbor cells, let's add a new function called `updateNeighborCounts` to the `Grid` class.

We want this function to loop over all of the cells, count how many of it's neighbors are alive and then update `liveNeighborCount` for each one. Here's an outline of what the function needs to do:

```javascript
updateNeighborCounts () {
  // for each cell in the grid
    // reset it's neighbor count to 0
    // get the cell's neighbors
    // increase liveNeighborCount by 1 for each neighbor that is alive
}
```


#### Check
Call `updateNeighborCounts` and then `print(grid.cells)` inside of `mousePressed`. (You can remove or comment out the previous contents to keep the console more clean.)

Compare the values on the cells with what you see in the canvas. For example if the first cell at 0, 0 has 2 living neighbors that you can see, confirm that it's properties in the console also say that it has 2 neighbors.

Inspect several cell locations, especially ones in the corners or edges, until you are convinced that neighbor count values are all working as expected.

### Step 11
We're finally ready to put it all together!

You should still have `grid.updateNeighborCounts();` inside of `mousePressed`, so now that cells know their correct neighbor counts, you can re-add `grid.updatePopulation();` above that.

When you click the mouse you should now see the population update correctly on the canvas. Before each click, pick a cell on the canvas to focus on, and manually count it's neighbors and think about the logic for whether it should live or die. Make a prediction for if that cell should be living or dead when you click next. Were you right?

If you find your predictions are often wrong, go back and double check the logic inside of the `liveOrDie` function.

Once you feel like things are working correctly, it's time to make the final change. We want the population to update itself automatically without having to click each time. Move the 2 methods from the `mousePressed` function up into the `draw` function, right before `grid.draw`.

#### Check
Your game should be fully functional now! Try decreasing the cell size when you create the grid to see a larger population of cells on the screen at once to confirm that the population changes as expected.

![gif of functional game of life with more cells](https://media.giphy.com/media/5eFtLod86VeUZZearv/giphy.gif)

At a certain point you will probably notice that most cells have died but you see some static patterns that aren't moving and some dynamic ones that move in a predictable pattern.

Look at the list of patterns on the wikipedia page and compare them to your program as a final check to confirm your logic is working correctly.
https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns

If your cells form static patterns that aren't listed on the wikipedia page, review your logic, there's probably a small error somewhere.


### Next Steps...
First, congrats! Building the game of life is no easy task. I mean, you just CREATED LIFE right? :D

Keep your code here limited to the GOL basics, no added functionality. In assignment 2.0 you'll copy over your GOL and add some new features!
Try extending the functionality of the game.
