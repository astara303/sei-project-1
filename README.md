# Battleship
> Play against the computer to try to sink its ships before it sinks yours!

![](https://i.ibb.co/JcF8rft/slideshow4.png)

I created this version of Battleship using vanilla JavaScript, HTML 5 and CSS 3. Battleship has always been one of my favorite games. My friends and I would draw grids on paper and play over skype. This game is my first ever solo coding project and was built three weeks into my _[General Assembly][https://generalassemb.ly/]_ Software Engineering Immersive course. You can play the game _[here][https://astara303.github.io/sei-project-1/]_.

## Usage

The game is split into two phases: Set-Up and Missile-Fire.

  __Set-Up Stage:__
  1. When the page is loaded, the computer's four ships auto-generate to random positions on the "radar" grid.
  2. The player can place their four ships by clicking on any chosen grid squares on the "your map" grid.
  3. The player cannot start firing at the radar screen until all four of their ships have been placed.

  __Missile-Fire Stage:__
  1. The player always takes the first turn by clicking on the "radar" grid.
  2. The computer will immediately return fire by targeting a square on the player's "map" grid.
  3. "Miss", "hit", and "sink" all display differently on the grid so that the player can keep track of where they should click next, and how many of their ships have been hit or sunk.
  4. When all of the player's ships have been sunk, the computer has won, or vice versa, and the game is over.

_For more information on the game Battleship, please refer to the [Wiki][https://en.wikipedia.org/wiki/Battleship_(game)]._

## Functionality

In this section I discuss the functionality that I'm proud of, that makes the game work (and importantly, fun to play, and possible to lose).

- The computer's ships are automatically placed on the radar grid when the page is loaded. They will never generate off the grid nor intersect. They may be generated horizontally or vertically. This is decided by a simple Math.random() function that creates a 50/50 chance.

- The player chooses where to place their ships by clicking on the grid and the corresponding ship color appears.

- The player cannot start firing at the radar screen until all of their ships have been placed.

- Every time the user FIREs, the computer FIREs back.

- The computer randomly targets squares on the player's grid and will never HIT the same square twice. This is because their hits are stored in an array that is referenced during the random firing function.

- If the computer detects a HIT, I've written a targeted fire function that will target nearby grid sqaures, and update the "last hit" square to continue to HIT surrounding squares as it works its way down the ship.

- When a player or computer has HIT all the squares of a ship, that ship displays as SUNK.

- The CSS classes determind whether a grid is empty, a MISS (filled with a wave), a HIT (filled with an explosion), or SUNK (filled with a skull and crossbones).

- When the player or computer has won, text will display above the grids to congratulate the winner. This is generated by a checkWinner() function that is called whenever a ship is sunk.

Targeted fire:
![](https://i.ibb.co/1ZS1Txf/Screenshot-2020-03-28-at-10-04-46.png)

## Struggles

In this section I will describe what code needs work in order for the game to be even better.

- When the user is placing their ships square by square on the map grid, it is possible not to place the squares next to each other. To fix this, I could have the player place multiple squares at one when the corresponsing sized ship is chosen, or next to be placed.

- If the player clicks a square they have already clicked, the computer still fires back. There is no rule in the game that you cannot target the same square twice, but it could be frustrating to the player if this is done by mistake. The computer never repeats fire because I store every previous hit in an array, so I could do something similar for the player.

- I haven't managed to make the computer's auto-generated ships place themselves at least one grid square apart, so sometimes they sit side-by-side. The rules in my house were that is allowed, but I know some people consider it a rule of Battleship to not allow ships to sit next to each other. I could make part of the placement function to detect nearby grids for ships.

-The computer does make targeted fire against a player's ship when it registers a "hit", but if the hit is detected in the middle of a ship, the computer will only filter through the squares in one direction, reverting to random fire again once it reaches the end of a ship. I am storing the last hit square in a variable, and would need to insert the first detected "last hit" variable if the computer reaches the end of a ship but the ship in question has not been SUNK.

Targeted fire "forgetting" to check the other side of the ship:
![](https://i.ibb.co/XSxZcdx/Screenshot-2020-03-28-at-10-25-56.png)

- I wrote a 'clear grid' function to completely erase the grids by targeting and removing all classes from the grids. This did not execute properly as a "clear", so I used a "refresh page" shortcut instead. I would definitely update this to properly function.

-The code is VERY hard-coded. It works well and I'm proud of it but now that I have more experience with functional programming and map, filter, and reduce, I would take advantage of that and refactor the code.

## About me

I'm an avid enjoyer of JavaScript. I would be so happy to discuss this project, or any of your JavaScript projects with you.
I am a big gaming nerd so feel free to share your games with me!
If you'd like to see more of my work or get to know a bit more about me, please check out my portfolio:

_[My Portfolio][https://astara303.github.io/portfolio/]_

Thank you for reading!