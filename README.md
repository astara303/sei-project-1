BATTLESHIP

How to play:
The game is two-player, with a human playing against a computer.
The grid is 10 x 10, allowing four ships to be placed by both the player and the computer.
The game is split into two phases: Set-Up and Missile-Fire

  Set-Up Stage:
  When the page is loaded, the computer's four ships auto-generate to random positions on the "radar" grid.
  The player can place their four ships by clicking on any chosen grid squares on the "your map" grid.
  The player cannot start firing at the radar screen until all four of their ships have been placed.

  Missile-Fire Stage:
  The player always takes the first turn by clicking on the "radar" grid.
  The computer will immediately return fire by targeting a square on the player's "map" grid.
  "Miss", "hit", and "sink" all display differently on the grid so that the player can keep track of where they should click next, and how many of their ships have been hit or sunk.
  When all of the player's ships have been sunk, the computer has won, or vice versa.

What I enjoyed:
Battleship has always been one of my favorite games.
I had so much fun creating it. Watching my "hits" and "miss" classes pop up on the ships for the first time was so satisfying.

What I struggled with:
Anything that is auto-generated took a lot of planning. 
Getting the ships to create themselves in either horizontal or vertical length, without overlapping, and without placing themselves off the grid was quite tricky.

Anything that doesnt work:
I haven't managed to make the computer's auto-generated ships place themselves at least one grid square apart, so something they sit side-by-side. The rules in my house were that is allowed, but I know some people consider it a rule of Battleship to not allow ships to sit next to each other.

The computer does make targeted fire against a player's ship when it registers a "hit", but if the hit is detected in the middle of a long ship, the AI will only filter through the squares in one direction, reverting to random fire again once it reaches the end of a ship. I am storing the last hit square in a variable, but I could use an array to sort this out.
*include a photo of that here*

If the player clicks a square they have already clicked, the computer still fires back. There is no rule in the game that you cannot target the same square twice, but it could be frustrating to the player if this is done by mistake. The computer never repeats fire because I store every previous hit in an array, so I'm sure I could do something similar for the player.