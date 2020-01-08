function init() {

  /* **GAME STAGES**


  STAGE ONE: SET-UP

  Have player choose the location of their ships by clicking grid cells
  Randomly generate the computer's ship placement but do not display it on the board
  Save these chosen grid cells in the ship location array
  -make sure clicks do not change ship placement one the set-up phase is complete
  -the ship cannot go off the board
  -the ship cannot intersect another ship

  *advanced*
  When player clicks "Begin Firing Missiles", a function checks if "allShipsPlaced" is true
  Only then can classes of hit and miss be added to the computer board 
  

  STAGE TWO: PLAYER MISSILE FIRE

  Player clicks a grid cell to fire a missile
  A missile can MISS, HIT, and SINK a ship
  Player's turn is displayed on computer grid


  STAGE THREE: COMPUTER MISSILE FIRE (can make the game 2 player for MVP)

  The computer choice is generated once per turn, after the player has had their turn 
  (how to know this? button? I would like it to happen automatically. Maybe it could be called every time the player clicks a computer cell)
  Randomised cell is chosen to fire missile
  A missile can MISS, HIT, and SINK a ship
  Computer's turn is displayed on player grid
  
  *advanced*
  On their next turn, computer should check nearby cells when it registered a hit on their last turn
  Or are the rules that you can keep firing if you got a hit? if that's the case I need to stop the computer firing when the player gets a hit

  STAGE FOUR: DECLARE A WINNER

  Determine when all of a player's ships have been sunk


  **GAME LOGIC**

  SET-UP.) Visibly place the ships on the player grid

  Tell the player they are setting a ship with the length of 2 (blue)
  After placement, save these grid cells in ship1 location array
  When 2 values are given, let the next ship be placed

  Tell the player they are setting a ship with the length of 3 (yellow)
  After placement, save these grid cells in ship2 location array
  When 3 values are given, let the next ship be placed

  Tell the player they are setting a ship with the length of 4 (green)
  After placement, save these grid cells in ship3 location array
  When 4 values are given, let the next ship be placed

  Tell the player they are setting a ship with the length of 5 (purple)
  After placement, save these grid cells in ship1 location array
  When 5 values are given, the player can no longer click cells

  Player can press the "clear board" button to restart placement


  SET-UP.) Place ships on the computer grid (hidden)

  Randomise a number 0-99 (This corresponds to an index in the array of grid cells)
  Use that random number (1, 22 etc) to add 1, 2, or more grid cells on to it to create horizonal or vertical length 
  (add grid cell 2 to 3 to create ship 1 horizontally) 
  (add grid cells 12 and 32 to 22 to create ship 2 vertically)
  Push these values into the computer ship location array
  

  SET-UP.) How will computer ships not intersect?

  I have to find a way for the function to recognise if previously placed ships occupy that grid cell already


  SET-UP.) How will computer ships not go off the board?
  If the random number is on the sides of the board, add or subract 1 to keep it from wrapping
  !!Can I use the pikachu width * width -1 thing for this?
  -1 for (ranNum === 9 || ranNum === 19 || ranNum === 29 || ranNum === 39 || ranNum === 49 || ranNum === 59 || ranNum === 69 || ranNum === 79 || ranNum === 89 || ranNum === 99)
  +1 for (ranNum === 0 || ranNum === 10 || ranNum === 20 || ranNum === 30 || ranNum === 40 || ranNum === 50 || ranNum === 60 || ranNum === 70 || ranNum === 80 || ranNum === 90)


  PLAYER MISSILE-FIRE.) Player chosen missile-fire
  
  Player clicks a grid cell
  A click event reads if this grid cell on player grid has a hit, miss, or sink on the computer grid


  PLAYER MISSILE-FIRE.) Display grid cell as MISS or HIT
  
  a function will check if the chosen cell index corresponds to any computer ship location array grid cells
  if it does, a class of "HIT" will be added to the grid cell and displayed on the computer grid
  if it doesn't, a class of "MISS" will be added to the grid cell and displayed on the computer grid


  PLAYER MISSILE-FIRE.) Display a computer ship's cells as SUNK after all grid cells have been HIT
   
  Player's missile-fire input (a click) is a grid cell index and a class of "HIT" has been added
  A function checks if a class of "hit" has been added to all grid cells in a computer ship location's array
  If all grid cells have been hit, change isSunk from false to true
  if isSunk = true, add a class of SUNK to the ship grid cells
  

  COMPUTER MISSILE-FIRE.) Computer generated missile fire
  Randomly generate a grid cell (0-99) to target on the player's board
  Read if the cell is contained in a player ship location array
  OR
  Randomly generate an item from the grid array and read the index of that item

  COMPUTER MISSILE-FIRE.) Display player grid cells as HIT, MISS, or SUNK

  COMPUTER MISSILE-FIRE.) Intelligent missile-firing
  If a turn is a HIT, the computer should fire at cells surrounding the HIT cell
  Should be able to use similar logic to how I auto-generated ships on the grid
  
  */


  // DOM VARIABLES
  const winner = document.querySelector('.winner')
  //I could only reveal the computer grid when "start game" is pressed. "Start game" button could appear when allShipsPlaced is true. Otherwise I may not need a start button
  const clearBoard = document.querySelector('.clearBoard')
  const playerGrid = document.querySelector('.playerGrid')
  const computerGrid = document.querySelector('.computerGrid')


  // GAME VARIABLES
  const playerGridCells = []
  const computerGridCells = []
  const width = 10
  const computerMissiles = []
  let allShipsPlaced = false
  //turn to true when allShipsPlaced is true. Turn to false if player wins (otherwise computer makes one more move after player wins)
  let allowComputerFire = false


  // SHIP OBJECTS

  //length: 2
  const playerShip1 = {
    location: [],
    //change to true when sunk. Check this to determine a winner. Could store the variable globally and make it let playerShip1Sunk = false
    isSunk: false
  }

  //length: 3
  const playerShip2 = {
    location: [],
    isSunk: false
  }
  //length: 4
  const playerShip3 = {
    location: [],
    isSunk: false
  }
  //length: 5
  const playerShip4 = {
    location: [],
    isSunk: false
  }

  //these ships will have a class color of white, so that they do not appear
  //length: 2
  const computerShip1 = {
    location: [],
    isSunk: false
  }
  //length: 3
  const computerShip2 = {
    location: [],
    isSunk: false
  }
  //length: 4
  const computerShip3 = {
    location: [],
    isSunk: false
  }
  //length: 5
  const computerShip4 = {
    location: [],
    isSunk: false
  }


  //PLAYER GRID
  function makePlayerGrid() {
    Array(width * width).join('.').split('.').forEach((num, i) => {
      const cell = document.createElement('div')
      cell.classList.add('grid-item')
      cell.addEventListener('click', () => placeShips(i))
      playerGridCells.push(cell)
      playerGrid.appendChild(cell)
    })
  }
  makePlayerGrid()

  //COMPUTER GRID
  function makeComputerGrid() {
    Array(width * width).join('.').split('.').forEach((num, i) => {
      const cell = document.createElement('div')
      cell.classList.add('grid-item')
      // cell.innerText = i
      cell.addEventListener('click', () => playerMissileFire(i))
      computerGridCells.push(cell)
      computerGrid.appendChild(cell)
    })
  }
  makeComputerGrid()

  //STAGE ONE: SET-UP FUNCTIONS
  //PLAYER FUNCTIONS

  //works immediately when page is loaded
  //logs each clicked cell into the corresponding ship array
  function placeShips(i) {
    if (allShipsPlaced) {
      // return
      console.log('ship1', playerShip1.location)
      console.log('ship2', playerShip2.location)
      console.log('ship3', playerShip3.location)
      console.log('ship4', playerShip4.location)
    } else if (playerShip4.location.length === 5) {
      allShipsPlaced = true
    } else if (playerShip3.location.length === 4) {
      playerGridCells[i].classList.add('ship4')
      if (playerGridCells[i].classList.contains('ship4')) {
        playerShip4.location.push(i)
      }
    } else if (playerShip2.location.length === 3) {
      playerGridCells[i].classList.add('ship3')
      if (playerGridCells[i].classList.contains('ship3')) {
        playerShip3.location.push(i)
      }
    } else if (playerShip1.location.length === 2) {
      playerGridCells[i].classList.add('ship2')
      if (playerGridCells[i].classList.contains('ship2')) {
        playerShip2.location.push(i)
      }
    } else if (!allShipsPlaced) {
      playerGridCells[i].classList.add('ship1')
      if (playerGridCells[i].classList.contains('ship1')) {
        playerShip1.location.push(i)
      }
    } else {
      console.log('complete')
    }
  }

  //COMPUTER FUNCTIONS

  //a function that randomly chooses a whole number between 0-99
  function createNumber() {
    return Math.floor(Math.random() * 100)
  }

  //does not check to see that no previously used cells are reused
  //prohibits ship from wrapping on the grid
  //ship can only sit horizonally on board
  //!!Might want to make a key of "is created = false" on the ships that turns to true before the next ship is allowed to be created
  function createShip1() {
    const ranNum = createNumber()
    computerGridCells[ranNum].classList.add('computerShip1')
    computerShip1.location.push(ranNum)
    if (computerGridCells[ranNum].classList.contains('computerShip1') && ranNum === 0 || ranNum === 10 || ranNum === 20 || ranNum === 30 || ranNum === 40 || ranNum === 50 || ranNum === 60 || ranNum === 70 || ranNum === 80 || ranNum === 90) {
      computerGridCells[ranNum + 1].classList.add('computerShip1')
      computerShip1.location.push(ranNum + 1)
    } else if (computerGridCells[ranNum].classList.contains('computerShip1') && ranNum === 9 || ranNum === 19 || ranNum === 29 || ranNum === 39 || ranNum === 49 || ranNum === 59 || ranNum === 69 || ranNum === 79 || ranNum === 89 || ranNum === 99) {
      computerGridCells[ranNum - 1].classList.add('computerShip1')
      computerShip1.location.push(ranNum - 1)
    } else {
      computerGridCells[ranNum - 1].classList.add('computerShip1')
      computerShip1.location.push(ranNum - 1)
    }
    console.log('comp ship 1 length of 2', computerShip1.location)
  }
  createShip1()

  //does not check to see that no previously used cells are reused
  //prohibits ship from wrapping on the grid
  //ship can only sit horizonally on board
  //!!Might want to make a key of "is created = false" on the ships that turns to true before the next ship is allowed to be created
  function createShip2() {
    const ranNum = createNumber()
    computerGridCells[ranNum].classList.add('computerShip2')
    computerShip2.location.push(ranNum)
    if (computerGridCells[ranNum].classList.contains('computerShip2') && ranNum === 0 || ranNum === 10 || ranNum === 20 || ranNum === 30 || ranNum === 40 || ranNum === 50 || ranNum === 60 || ranNum === 70 || ranNum === 80 || ranNum === 90) {
      computerGridCells[ranNum + 1].classList.add('computerShip2')
      computerShip2.location.push(ranNum + 1)
      computerGridCells[ranNum + 2].classList.add('computerShip2')
      computerShip2.location.push(ranNum + 2)
    } else if (computerGridCells[ranNum].classList.contains('computerShip2') && ranNum === 9 || ranNum === 19 || ranNum === 29 || ranNum === 39 || ranNum === 49 || ranNum === 59 || ranNum === 69 || ranNum === 79 || ranNum === 89 || ranNum === 99) {
      computerGridCells[ranNum - 1].classList.add('computerShip2')
      computerShip2.location.push(ranNum - 1)
      computerGridCells[ranNum - 2].classList.add('computerShip2')
      computerShip2.location.push(ranNum - 2)
    } else if (computerGridCells[ranNum].classList.contains('computerShip2')) {
      computerGridCells[ranNum - 1].classList.add('computerShip2')
      computerShip2.location.push(ranNum - 1)
      computerGridCells[ranNum + 1].classList.add('computerShip2')
      computerShip2.location.push(ranNum + 1)
    }
    console.log('comp ship 2 length of 3', computerShip2.location)
  }
  createShip2()

  //does not stop ships intersecting
  //does not check to see that no previously used cells are reused
  //prohibits ship from wrapping on the grid
  //ship can only sit horizonally on board
  //!!Might want to make a key of "is created = false" on the ships that turns to true before the next ship is allowed to be created
  function createShip3() {
    const ranNum = createNumber()
    computerGridCells[ranNum].classList.add('computerShip3')
    computerShip3.location.push(ranNum)
    if (computerGridCells[ranNum].classList.contains('computerShip3') && ranNum === 0 || ranNum === 10 || ranNum === 20 || ranNum === 30 || ranNum === 40 || ranNum === 50 || ranNum === 60 || ranNum === 70 || ranNum === 80 || ranNum === 90 || ranNum === 1 || ranNum === 11 || ranNum === 21 || ranNum === 31 || ranNum === 41 || ranNum === 51 || ranNum === 61 || ranNum === 71 || ranNum === 81 || ranNum === 91) {
      computerGridCells[ranNum + 1].classList.add('computerShip3')
      computerShip3.location.push(ranNum + 1)
      computerGridCells[ranNum + 2].classList.add('computerShip3')
      computerShip3.location.push(ranNum + 2)
      computerGridCells[ranNum + 3].classList.add('computerShip3')
      computerShip3.location.push(ranNum + 3)
    } else if (computerGridCells[ranNum].classList.contains('computerShip3') && ranNum === 9 || ranNum === 19 || ranNum === 29 || ranNum === 39 || ranNum === 49 || ranNum === 59 || ranNum === 69 || ranNum === 79 || ranNum === 89 || ranNum === 99 || ranNum === 8 || ranNum === 18 || ranNum === 28 || ranNum === 38 || ranNum === 48 || ranNum === 58 || ranNum === 68 || ranNum === 78 || ranNum === 88 || ranNum === 98) {
      computerGridCells[ranNum - 1].classList.add('computerShip3')
      computerShip3.location.push(ranNum - 1)
      computerGridCells[ranNum - 2].classList.add('computerShip3')
      computerShip3.location.push(ranNum - 2)
      computerGridCells[ranNum - 3].classList.add('computerShip3')
      computerShip3.location.push(ranNum - 3)
    } else if (computerGridCells[ranNum].classList.contains('computerShip3')) {
      computerGridCells[ranNum - 1].classList.add('computerShip3')
      computerShip3.location.push(ranNum - 1)
      computerGridCells[ranNum + 1].classList.add('computerShip3')
      computerShip3.location.push(ranNum + 1)
      computerGridCells[ranNum - 2].classList.add('computerShip3')
      computerShip3.location.push(ranNum - 2)
    }
    console.log('comp ship 3 length of 4', computerShip3.location)
  }
  createShip3()

  //does not stop ships intersecting
  //does not check to see that no previously used cells are reused
  //prohibits ship from wrapping on the grid
  //ship can only sit horizonally on board
  //!!Might want to make a key of "is created = false" on the ships that turns to true before the next ship is allowed to be created
  function createShip4() {
    const ranNum = createNumber()
    computerGridCells[ranNum].classList.add('computerShip4')
    computerShip4.location.push(ranNum)
    if (computerGridCells[ranNum].classList.contains('computerShip4') && ranNum === 0 || ranNum === 10 || ranNum === 20 || ranNum === 30 || ranNum === 40 || ranNum === 50 || ranNum === 60 || ranNum === 70 || ranNum === 80 || ranNum === 90 || ranNum === 1 || ranNum === 11 || ranNum === 21 || ranNum === 31 || ranNum === 41 || ranNum === 51 || ranNum === 61 || ranNum === 71 || ranNum === 81 || ranNum === 91 || ranNum === 2 || ranNum === 12 || ranNum === 22 || ranNum === 32 || ranNum === 42 || ranNum === 52 || ranNum === 62 || ranNum === 72 || ranNum === 82 || ranNum === 92) {
      computerGridCells[ranNum + 1].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 1)
      computerGridCells[ranNum + 2].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 2)
      computerGridCells[ranNum + 3].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 3)
      computerGridCells[ranNum + 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 4)
    } else if (computerGridCells[ranNum].classList.contains('computerShip4') && ranNum === 9 || ranNum === 19 || ranNum === 29 || ranNum === 39 || ranNum === 49 || ranNum === 59 || ranNum === 69 || ranNum === 79 || ranNum === 89 || ranNum === 99 || ranNum === 8 || ranNum === 18 || ranNum === 28 || ranNum === 38 || ranNum === 48 || ranNum === 58 || ranNum === 68 || ranNum === 78 || ranNum === 88 || ranNum === 98 || ranNum === 7  || ranNum === 17 || ranNum === 27  || ranNum === 37  || ranNum === 47 || ranNum === 57  || ranNum === 67 || ranNum === 77 || ranNum === 87 || ranNum === 97) {
      computerGridCells[ranNum - 1].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 1)
      computerGridCells[ranNum - 2].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 2)
      computerGridCells[ranNum - 3].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 3)
      computerGridCells[ranNum - 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 4)
    } else if (computerGridCells[ranNum].classList.contains('computerShip4')) {
      computerGridCells[ranNum - 1].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 1)
      computerGridCells[ranNum + 1].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 1)
      computerGridCells[ranNum - 2].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 2)
      computerGridCells[ranNum + 2].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 2)
    }
    console.log('comp ship 4 length of 5', computerShip4.location)
  }
  createShip4()

  // STAGE TWO: PLAYER MISSILE-FIRE

  // PLAYER MISSILE-FIRE FUNCTIONS

  //a function that takes player missile fire and checks for a hit or a miss on the computer's board
  //checks for "sunk" ships
  function playerMissileFire(i) {
    if (computerShip1.location.includes(i)) {
      computerGridCells[i].classList.add('hit')
      checkSunk()
      computerMissileFire()
    } else if (computerShip2.location.includes(i)) {
      computerGridCells[i].classList.add('hit')
      checkSunk()
      computerMissileFire()
    } else if (computerShip3.location.includes(i)) {
      computerGridCells[i].classList.add('hit')
      checkSunk()
      computerMissileFire()
    } else if (computerShip4.location.includes(i)) {
      computerGridCells[i].classList.add('hit')
      checkSunk()
      computerMissileFire()
    } else {
      computerGridCells[i].classList.add('miss')
      computerMissileFire()
    }
  }

  function checkSunk() {
    if (computerShip1.location.every(l => computerGridCells[l].classList.contains('hit'))) {
      computerShip1.location.forEach(l => {
        computerGridCells[l].classList.remove('hit')
        computerGridCells[l].classList.add('sunk')
        computerShip1.isSunk = true
        checkWinner()
      })
    }
    if (computerShip2.location.every(l => computerGridCells[l].classList.contains('hit'))) {
      computerShip2.location.forEach(l => {
        computerGridCells[l].classList.remove('hit')
        computerGridCells[l].classList.add('sunk')
        computerShip2.isSunk = true
        checkWinner()
      })
    }
    if (computerShip3.location.every(l => computerGridCells[l].classList.contains('hit'))) {
      computerShip3.location.forEach(l => {
        computerGridCells[l].classList.remove('hit')
        computerGridCells[l].classList.add('sunk')
        computerShip3.isSunk = true
        checkWinner()
      })
    }
    if (computerShip4.location.every(l => computerGridCells[l].classList.contains('hit'))) {
      computerShip4.location.forEach(l => {
        computerGridCells[l].classList.remove('hit')
        computerGridCells[l].classList.add('sunk')
        computerShip4.isSunk = true
        checkWinner()
      })
    }
    if (playerShip1.location.every(l => playerGridCells[l].classList.contains('hit'))) {
      playerShip1.location.forEach(l => {
        playerGridCells[l].classList.remove('hit')
        playerGridCells[l].classList.add('sunk')
        playerShip1.isSunk = true
        checkWinner()
      })
    }
    if (playerShip2.location.every(l => playerGridCells[l].classList.contains('hit'))) {
      playerShip2.location.forEach(l => {
        playerGridCells[l].classList.remove('hit')
        playerGridCells[l].classList.add('sunk')
        playerShip2.isSunk = true
        checkWinner()
      })
    }
    if (playerShip3.location.every(l => playerGridCells[l].classList.contains('hit'))) {
      playerShip3.location.forEach(l => {
        playerGridCells[l].classList.remove('hit')
        playerGridCells[l].classList.add('sunk')
        playerShip3.isSunk = true
        checkWinner()
      })
    }
    if (playerShip4.location.every(l => playerGridCells[l].classList.contains('hit'))) {
      playerShip4.location.forEach(l => {
        playerGridCells[l].classList.remove('hit')
        playerGridCells[l].classList.add('sunk')
        playerShip4.isSunk = true
        checkWinner()
      })
    }
  }

  // STAGE THREE: COMPUTER MISSILE-FIRE

  //target must never repeat
  function computerMissileFire() {
    const target = createNumber()
    console.log(target)
    if (computerMissiles.includes(target)) {
      console.log('repeated fire; fire again.')
      // console.log(computerMissiles)
      computerMissileFire()
    } else if (playerShip1.location.includes(target)) {
      console.log('hit')
      playerGridCells[target].classList.add('hit')
      computerMissiles.push(target)
      checkSunk()
    } else if (playerShip2.location.includes(target)) {
      console.log('hit')
      playerGridCells[target].classList.add('hit')
      computerMissiles.push(target)
      checkSunk()
    } else if (playerShip3.location.includes(target)) {
      console.log('hit')
      playerGridCells[target].classList.add('hit')
      computerMissiles.push(target)
      checkSunk()
    } else if (playerShip4.location.includes(target)) {
      console.log('hit')
      playerGridCells[target].classList.add('hit')
      computerMissiles.push(target)
      checkSunk()
    } else {
      console.log('miss')
      playerGridCells[target].classList.add('miss')
      computerMissiles.push(target)
    }
  }

  // FINAL STAGE: GAME OVER

  function checkWinner() {
    if (playerShip1.isSunk === true && playerShip2.isSunk === true && playerShip3.isSunk === true && playerShip4.isSunk === true) {
      console.log('computer won this time!')
      winner.innerHTML = 'Computer sunk all your ships!! Computer wins!'
    } else if (computerShip1.isSunk === true && computerShip2.isSunk === true && computerShip3.isSunk === true && computerShip4.isSunk === true) {
      console.log('player won this time!')
      winner.innerHTML = 'YOU WON!!!'
    } else {
      return
    }
  }

  // EVENTS

  //Refreshes page
  clearBoard.addEventListener('click', () => {
    window.location.reload()
  })

}
window.addEventListener('DOMContentLoaded', init)
