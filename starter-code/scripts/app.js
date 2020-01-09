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
  This covers ships not interesting and not going off the board at the same time:
      
      A.) Call Ship Building Function
    Choose random number
    Decide if a ship will go horizontal or vertical (coin flip)
      -if true, go horizontal
      -if false, go vertical
    !? ISSUE: I DON’T WANT TO FAVOUR THE LEFT (coin flip?)
    if true, check right first
    if false, check left first
    B.) Horizontal: (make sure if doesn’t go off the board)
    can random number add length to left? (for example ranNum % width > 0)
      -if yes, go to B1
      -if no, try adding to right (next statement)
    can random number add length to right? (for example ranNum % width < width -1)
      -if yes, go to B2
      -if no, go to beginning
    B1.) if it can add to the left (make sure it doesn’t overlap an existing ship)
      Check that all cells of ran num + ship length to the left does not appear in generated ship 		cells array
      -if cells are free, add classes to them to make them appear on the board and push them to 	arrays
      -if cells are not free, go to beginning
    B2.) if it can add to the right (make sure it doesn’t overlap an existing ship)
      Check that all cells of ran num + ship length to the right does not appear in generated ship 	cells array
      -if cells are free, add classes to them to make them appear on the board and push them to 	arrays
      -if cells are not free, go to beginning
    C.) Vertical: (make sure if doesn’t go off the board)
    can random number add height to top? (for example ranNum + width < width * width)
      -if yes, go to C1
      -if no, try adding to bottom (next statement)
    can random number add height to bottom? (for example ranNum % width < width -1)
      -if yes, go to C2
      -if no, go to beginning
    C1.) if it can add to the top (make sure it doesn’t overlap an existing ship)
    Check that all cells of ran num + ship length to the top does not appear in generated ship 		cells array
      -if cells are free, add classes to them to make them appear on the board and push them to 	arrays
      -if cells are not free, go to beginning
    C2.) if it can add to the bottom (make sure it doesn’t overlap an existing ship)
    Check that all cells of ran num + ship length to the bottom does not appear in generated ship 		cells array
      -if cells are free, add classes to them to make them appear on the board and push them to 	arrays
      -if cells are not free, go to beginning
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
  Do not repeat firing of missiles
  COMPUTER MISSILE-FIRE.) Display player grid cells as HIT, MISS, or SUNK
  COMPUTER MISSILE-FIRE.) Intelligent missile-firing
  If a turn is a HIT, the computer should fire at cells surrounding the HIT cell
  Should be able to use similar logic to how I auto-generated ships on the grid
  
  */
  // DOM VARIABLES
  const winner = document.querySelector('.winner')
  //I could only reveal the computer grid when "start game" is pressed. "Start game" button could appear when allShipsPlaced is true
  const clearBoard = document.querySelector('.clearBoard')
  const playerGrid = document.querySelector('.playerGrid')
  const computerGrid = document.querySelector('.computerGrid')
  // GAME VARIABLES
  //grid variables
  const playerGridCells = []
  const computerGridCells = []
  const width = 10
  const computerMissiles = []
  const allComputerShips = []
  let allShipsPlaced = false
  let lastHit = ''
  console.log(lastHit)

  // SHIP OBJECTS
  //length: 2
  const playerShip1 = {
    location: [],
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
    isPlaced: false,
    isSunk: false
  }
  //length: 3
  const computerShip2 = {
    location: [],
    isPlaced: false,
    isSunk: false
  }
  //length: 4
  const computerShip3 = {
    location: [],
    isPlaced: false,
    isSunk: false
  }
  //length: 5
  const computerShip4 = {
    location: [],
    isPlaced: false,
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
  function placeShips(i) {
    if (playerShip4.location.length === 5) {
      console.log('changing allShipsPlaced to true')
      allShipsPlaced = true
    } else if (playerShip3.location.length === 4) {
      playerGridCells[i] ? playerGridCells[i].classList.add('ship4') : null
      if (playerGridCells[i] && playerGridCells[i].classList.contains('ship4')) {
        playerShip4.location.push(i)
        placeShips()
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
  //a function that gives a 50/50 split decision
  //will be true or false
  function coinFlip() {
    return Math.random() < 0.5
  }


  function checkForOverlap(arr1, arr2) {
    return arr1.some(item => arr2.includes(item))
  }

  // (checkForOverlap(computerShip1.location, allComputerShips)) 

  function makeShip4() {
    const choice = coinFlip()
    if (choice) {
      ship4Horizontal()
    } else {
      ship4Vertical()
    }
  }
  function makeShip3() {
    if (computerShip4.isPlaced) {
      const choice = coinFlip()
      if (choice) {
        ship3Horizontal()
      } else {
        ship3Vertical()
      }
    }
  }
  function makeShip2() {
    if (computerShip3.isPlaced) {
      const choice = coinFlip()
      if (choice) {
        ship2Horizontal()
      } else {
        ship2Vertical()
      }
    }
  }
  function makeShip1() {
    if (computerShip2.isPlaced) {
      const choice = coinFlip()
      if (choice) {
        ship1Horizontal()
      } else {
        ship1Vertical()
      }
    }
  }
  //this could happen when all player ships have been placed, or on a start button etc.
  makeShip4()
  makeShip3()
  makeShip2()
  makeShip1()

  function ship1Horizontal() {
    const ranNum = createNumber()
    computerShip1.location.push(ranNum)
    if (ranNum % width > 0) {
      computerShip1.location.push(ranNum - 1)
      computerShip1.isPlaced = true
      if (checkForOverlap(computerShip1.location, allComputerShips)) {
        computerShip1.location = []
        ship1Horizontal()
      } else {
        computerGridCells[ranNum].classList.add('computerShip1')
        computerGridCells[ranNum - 1].classList.add('computerShip1')
        //might not need to push ship1 to all computers but ill leave it for now
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum - 1)
        computerShip1.isPlaced = true
      }
    } else if (ranNum % width < width - 1) {
      computerGridCells[ranNum + 1].classList.add('computerShip1')
      computerShip1.location.push(ranNum + 1)
      if (checkForOverlap(computerShip1.location, allComputerShips)) {
        computerShip1.location = []
        ship1Horizontal()
      } else {
        computerGridCells[ranNum].classList.add('computerShip1')
        computerGridCells[ranNum + 1].classList.add('computerShip1')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum + 1)
        computerShip1.isPlaced = true
      }
    } else {
      ship1Horizontal()
    }
    console.log(computerShip1.location)
  }

  function ship1Vertical() {
    const ranNum = createNumber()
    computerShip1.location.push(ranNum)
    if (ranNum + width < width * width) {
      computerShip1.location.push(ranNum + width)
      if (checkForOverlap(computerShip1.location, allComputerShips)) {
        computerShip1.location = []
        ship1Vertical()
      } else {
        //don't push to all computer ships or add class until here
        computerGridCells[ranNum].classList.add('computerShip1')
        computerGridCells[ranNum + width].classList.add('computerShip1')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum + width)
        computerShip1.isPlaced = true
      }
    } else if (ranNum - width >= 0) {
      computerShip1.location.push(ranNum - width)
      if (checkForOverlap(computerShip1.location, allComputerShips)) {
        computerShip1.location = []
        ship1Vertical()
      } else {
        computerGridCells[ranNum].classList.add('computerShip1')
        computerGridCells[ranNum - width].classList.add('computerShip1')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum - width)
        computerShip1.isPlaced = true
      }
    } else {
      ship1Vertical()
    }
    console.log(computerShip1.location)
  }

  function ship2Horizontal() {
    const ranNum = createNumber()
    computerShip2.location.push(ranNum)
    if (ranNum % width > 1) {
      computerShip2.location.push(ranNum - 1)
      computerShip2.location.push(ranNum - 2)
      if (checkForOverlap(computerShip2.location, allComputerShips)) {
        computerShip2.location = []
        ship2Horizontal()
      } else {
        computerGridCells[ranNum].classList.add('computerShip2')
        computerGridCells[ranNum - 1].classList.add('computerShip2')
        computerGridCells[ranNum - 2].classList.add('computerShip2')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum - 1)
        allComputerShips.push(ranNum - 2)
        computerShip2.isPlaced = true
      }
    } else if (ranNum % width < width - 2) {
      computerShip2.location.push(ranNum + 1)
      computerShip2.location.push(ranNum + 2)
      if (checkForOverlap(computerShip2.location, allComputerShips)) {
        computerShip2.location = []
        ship2Horizontal()
      } else {
        computerGridCells[ranNum].classList.add('computerShip2')
        computerGridCells[ranNum + 1].classList.add('computerShip2')
        computerGridCells[ranNum + 2].classList.add('computerShip2')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum + 1)
        allComputerShips.push(ranNum + 2)
        computerShip2.isPlaced = true
      }
    } else {
      ship2Horizontal()
    }
    console.log(computerShip2.location)
  }

  function ship2Vertical() {
    const ranNum = createNumber()
    computerShip2.location.push(ranNum)
    if (ranNum + width < (width - 1) * (width - 1)) {
      computerShip2.location.push(ranNum + width)
      computerShip2.location.push(ranNum + (width * 2))
      if (checkForOverlap(computerShip2.location, allComputerShips)) {
        computerShip2.location = []
        ship2Vertical()
      } else {
        computerGridCells[ranNum].classList.add('computerShip2')
        computerGridCells[ranNum + width].classList.add('computerShip2')
        computerGridCells[ranNum + (width * 2)].classList.add('computerShip2')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum + width)
        allComputerShips.push(ranNum + (width * 2))
        computerShip2.isPlaced = true
      }
    } else if (ranNum - width >= 1) {
      computerShip2.location.push(ranNum - width)
      computerShip2.location.push(ranNum - (width * 2))
      if (checkForOverlap(computerShip2.location, allComputerShips)) {
        computerShip2.location = []
        ship2Vertical()
      } else {
        computerGridCells[ranNum].classList.add('computerShip2')
        computerGridCells[ranNum - width].classList.add('computerShip2')
        computerGridCells[ranNum - (width * 2)].classList.add('computerShip2')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum - width)
        allComputerShips.push(ranNum - (width * 2))
        computerShip2.isPlaced = true
      }
    } else {
      ship2Vertical()
    }
    console.log(computerShip2.location)
  }

  function ship3Horizontal() {
    const ranNum = createNumber()
    computerShip3.location.push(ranNum)
    if (ranNum % width > 2) {
      computerShip3.location.push(ranNum - 1)
      computerShip3.location.push(ranNum - 2)
      computerShip3.location.push(ranNum - 3)
      if (checkForOverlap(computerShip3.location, allComputerShips)) {
        computerShip3.location = []
        ship3Horizontal()
      } else {
        computerGridCells[ranNum].classList.add('computerShip3')
        computerGridCells[ranNum - 1].classList.add('computerShip3')
        computerGridCells[ranNum - 2].classList.add('computerShip3')
        computerGridCells[ranNum - 3].classList.add('computerShip3')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum - 1)
        allComputerShips.push(ranNum - 2)
        allComputerShips.push(ranNum - 3)
        computerShip3.isPlaced = true
      }
    } else if (ranNum % width < width - 3) {
      computerShip3.location.push(ranNum + 1)
      computerShip3.location.push(ranNum + 2)
      computerShip3.location.push(ranNum + 3)
      if (checkForOverlap(computerShip3.location, allComputerShips)) {
        computerShip3.location = []
        ship3Horizontal()
      } else {
        computerGridCells[ranNum].classList.add('computerShip3')
        computerGridCells[ranNum + 1].classList.add('computerShip3')
        computerGridCells[ranNum + 2].classList.add('computerShip3')
        computerGridCells[ranNum + 3].classList.add('computerShip3')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum + 1)
        allComputerShips.push(ranNum + 2)
        allComputerShips.push(ranNum + 3)
        computerShip3.isPlaced = true
      }
    } else {
      ship3Horizontal()
    }
    console.log(computerShip3.location)
  }

  function ship3Vertical() {
    const ranNum = createNumber()
    computerShip3.location.push(ranNum)
    if (ranNum + width < (width - 2) * (width - 2)) {
      computerShip3.location.push(ranNum + width)
      computerShip3.location.push(ranNum + (width * 2))
      computerShip3.location.push(ranNum + (width * 3))
      if (checkForOverlap(computerShip3.location, allComputerShips)) {
        computerShip3.location = []
        ship3Vertical()
      } else {
        computerGridCells[ranNum].classList.add('computerShip3')
        computerGridCells[ranNum + width].classList.add('computerShip3')
        computerGridCells[ranNum + (width * 2)].classList.add('computerShip3')
        computerGridCells[ranNum + (width * 3)].classList.add('computerShip3')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum + width)
        allComputerShips.push(ranNum + (width * 2))
        allComputerShips.push(ranNum + (width * 3))
        computerShip3.isPlaced = true
      }
    } else if (ranNum - width >= 2) {
      computerShip3.location.push(ranNum - width)
      computerShip3.location.push(ranNum - (width * 2))
      computerShip3.location.push(ranNum - (width * 3))
      if (checkForOverlap(computerShip3.location, allComputerShips)) {
        computerShip3.location = []
        ship3Vertical()
      } else {
        computerGridCells[ranNum].classList.add('computerShip3')
        computerGridCells[ranNum - width].classList.add('computerShip3')
        computerGridCells[ranNum - (width * 2)].classList.add('computerShip3')
        computerGridCells[ranNum - (width * 3)].classList.add('computerShip3')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum - width)
        allComputerShips.push(ranNum - (width * 2))
        allComputerShips.push(ranNum - (width * 3))
        computerShip3.isPlaced = true
      }
    } else {
      ship3Vertical()
    }
    console.log(computerShip3.location)
  }

  function ship4Horizontal() {
    const ranNum = createNumber()
    computerGridCells[ranNum].classList.add('computerShip4')
    computerShip4.location.push(ranNum)
    allComputerShips.push(ranNum)
    if (ranNum % width > 3) {
      computerGridCells[ranNum - 1].classList.add('computerShip4')
      computerGridCells[ranNum - 2].classList.add('computerShip4')
      computerGridCells[ranNum - 3].classList.add('computerShip4')
      computerGridCells[ranNum - 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 1)
      computerShip4.location.push(ranNum - 2)
      computerShip4.location.push(ranNum - 3)
      computerShip4.location.push(ranNum - 4)
      allComputerShips.push(ranNum - 1)
      allComputerShips.push(ranNum - 2)
      allComputerShips.push(ranNum - 3)
      allComputerShips.push(ranNum - 4)
      computerShip4.isPlaced = true
    } else if (ranNum % width < width - 4) {
      computerGridCells[ranNum + 1].classList.add('computerShip4')
      computerGridCells[ranNum + 2].classList.add('computerShip4')
      computerGridCells[ranNum + 3].classList.add('computerShip4')
      computerGridCells[ranNum + 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 1)
      computerShip4.location.push(ranNum + 2)
      computerShip4.location.push(ranNum + 3)
      computerShip4.location.push(ranNum + 4)
      allComputerShips.push(ranNum + 1)
      allComputerShips.push(ranNum + 2)
      allComputerShips.push(ranNum + 3)
      allComputerShips.push(ranNum + 4)
      computerShip4.isPlaced = true
    } else {
      ship4Horizontal()
    }
    console.log(computerShip4.location)
  }

  function ship4Vertical() {
    const ranNum = createNumber()
    computerGridCells[ranNum].classList.add('computerShip4')
    computerShip4.location.push(ranNum)
    allComputerShips.push(ranNum)
    if (ranNum + width < (width - 3) * (width - 3)) {
      computerGridCells[ranNum + width].classList.add('computerShip4')
      computerGridCells[ranNum + (width * 2)].classList.add('computerShip4')
      computerGridCells[ranNum + (width * 3)].classList.add('computerShip4')
      computerGridCells[ranNum + (width * 4)].classList.add('computerShip4')
      computerShip4.location.push(ranNum + width)
      computerShip4.location.push(ranNum + (width * 2))
      computerShip4.location.push(ranNum + (width * 3))
      computerShip4.location.push(ranNum + (width * 4))
      allComputerShips.push(ranNum + width)
      allComputerShips.push(ranNum + (width * 2))
      allComputerShips.push(ranNum + (width * 3))
      allComputerShips.push(ranNum + (width * 4))
      computerShip4.isPlaced = true
    } else if (ranNum - width >= 3) {
      computerGridCells[ranNum - width].classList.add('computerShip4')
      computerGridCells[ranNum - (width * 2)].classList.add('computerShip4')
      computerGridCells[ranNum - (width * 3)].classList.add('computerShip4')
      computerGridCells[ranNum - (width * 4)].classList.add('computerShip4')
      computerShip4.location.push(ranNum - width)
      computerShip4.location.push(ranNum - (width * 2))
      computerShip4.location.push(ranNum - (width * 3))
      computerShip4.location.push(ranNum - (width * 4))
      allComputerShips.push(ranNum - width)
      allComputerShips.push(ranNum - (width * 2))
      allComputerShips.push(ranNum - (width * 3))
      allComputerShips.push(ranNum - (width * 4))
      computerShip4.isPlaced = true
    } else {
      ship4Vertical()
    }
    console.log(computerShip4.location)
  }

  // STAGE TWO: PLAYER MISSILE-FIRE

  // PLAYER MISSILE-FIRE FUNCTIONS
  function playerMissileFire(i) {
    if (allShipsPlaced) {
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
  }

  // STAGE THREE: COMPUTER MISSILE-FIRE

  //could look at where I update lastHit because on longer ships, 
  //the AI forgets to check one side if it has reached the end of the other and has nowhere else to check
  function targetedFire() {
    if (lastHit === '') {
      return
    } else if (!computerMissiles.includes(lastHit - 1) && (lastHit - 1) % width > 0) {
      console.log('trying to generate intelligent fire', lastHit - 1)
      if (playerShip1.location.includes(lastHit - 1)) {
        console.log('targeted hit')
        playerGridCells[lastHit - 1].classList.add('hit')
        computerMissiles.push(lastHit - 1)
        checkSunk()
        if (playerShip1.isSunk) {
          console.log('ship sunk. resetting lastHit')
          lastHit = ''
        } else {
          //instead of renaming lastHit, I could add lastHit and lastHit-1 to an array
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit - 1)
        }
      } else if (playerShip2.location.includes(lastHit - 1)) {
        console.log('targeted hit')
        playerGridCells[lastHit - 1].classList.add('hit')
        computerMissiles.push(lastHit - 1)
        checkSunk()
        if (playerShip2.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit - 1)
        }
      } else if (playerShip3.location.includes(lastHit - 1)) {
        console.log('targeted hit')
        playerGridCells[lastHit - 1].classList.add('hit')
        computerMissiles.push(lastHit - 1)
        checkSunk()
        if (playerShip3.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit - 1)
        }
      } else if (playerShip4.location.includes(lastHit - 1)) {
        console.log('targeted hit')
        playerGridCells[lastHit - 1].classList.add('hit')
        computerMissiles.push(lastHit - 1)
        checkSunk()
        if (playerShip4.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit - 1)
        }
      } else {
        console.log('targeted miss')
        playerGridCells[lastHit - 1].classList.add('miss')
        computerMissiles.push(lastHit - 1)
      }
    } else if (!computerMissiles.includes(lastHit + 1) && (lastHit + 1) % width < width - 1) {
      console.log('trying to generate intelligent fire', lastHit + 1)
      if (playerShip1.location.includes(lastHit + 1)) {
        console.log('targeted hit')
        playerGridCells[lastHit + 1].classList.add('hit')
        computerMissiles.push(lastHit + 1)
        checkSunk()
        if (playerShip1.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit + 1)
        }
      } else if (playerShip2.location.includes(lastHit + 1)) {
        console.log('targeted hit')
        playerGridCells[lastHit + 1].classList.add('hit')
        computerMissiles.push(lastHit + 1)
        checkSunk()
        if (playerShip2.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit + 1)
        }
      } else if (playerShip3.location.includes(lastHit + 1)) {
        console.log('targeted hit')
        playerGridCells[lastHit + 1].classList.add('hit')
        computerMissiles.push(lastHit + 1)
        checkSunk()
        if (playerShip3.isSunk) {
          lastHit = ''
          console.log('ship was sunk')
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit + 1)
        }
      } else if (playerShip4.location.includes(lastHit + 1)) {
        console.log('targeted hit')
        playerGridCells[lastHit + 1].classList.add('hit')
        computerMissiles.push(lastHit + 1)
        checkSunk()
        if (playerShip4.isSunk) {
          lastHit = ''
          console.log('ship was sunk')
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit + 1)
        }
      } else {
        console.log('targeted miss')
        playerGridCells[lastHit + 1].classList.add('miss')
        computerMissiles.push(lastHit + 1)
      }
    } else if (!computerMissiles.includes(lastHit + width) && (lastHit + width) + width < width * width) {
      console.log('trying to generate intelligent fire', (lastHit + width))
      if (playerShip1.location.includes(lastHit + width)) {
        console.log('targeted hit')
        playerGridCells[lastHit + width].classList.add('hit')
        computerMissiles.push(lastHit + width)
        checkSunk()
        if (playerShip1.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit + width)
        }
      } else if (playerShip2.location.includes(lastHit + width)) {
        console.log('targeted hit')
        playerGridCells[lastHit + width].classList.add('hit')
        computerMissiles.push(lastHit + width)
        checkSunk()
        if (playerShip2.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit + width)
        }
      } else if (playerShip3.location.includes(lastHit + width)) {
        console.log('targeted hit')
        playerGridCells[lastHit + width].classList.add('hit')
        computerMissiles.push(lastHit + width)
        checkSunk()
        if (playerShip3.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit + width)
        }
      } else if (playerShip4.location.includes(lastHit + width)) {
        console.log('targeted hit')
        playerGridCells[lastHit + width].classList.add('hit')
        computerMissiles.push(lastHit + width)
        checkSunk()
        if (playerShip4.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit + width)
        }
      } else {
        console.log('targeted miss')
        playerGridCells[lastHit + width].classList.add('miss')
        computerMissiles.push(lastHit + width)
      }
    } else if (!computerMissiles.includes(lastHit - width) && (lastHit - width) - width >= 0) {
      console.log('trying to generate intelligent fire', lastHit - width)
      if (playerShip1.location.includes(lastHit - width)) {
        console.log('targeted hit')
        playerGridCells[lastHit - width].classList.add('hit')
        computerMissiles.push(lastHit - width)
        checkSunk()
        if (playerShip1.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit - width)
        }
      } else if (playerShip2.location.includes(lastHit - width)) {
        console.log('targeted hit')
        playerGridCells[lastHit - width].classList.add('hit')
        computerMissiles.push(lastHit - width)
        checkSunk()
        if (playerShip2.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit - width)
        }
      } else if (playerShip3.location.includes(lastHit - width)) {
        console.log('targeted hit')
        playerGridCells[lastHit - width].classList.add('hit')
        computerMissiles.push(lastHit - width)
        checkSunk()
        if (playerShip3.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit - width)
        }
      } else if (playerShip4.location.includes(lastHit - width)) {
        console.log('targeted hit')
        playerGridCells[lastHit - width].classList.add('hit')
        computerMissiles.push(lastHit - width)
        checkSunk()
        if (playerShip4.isSunk) {
          console.log('ship was sunk')
          lastHit = ''
        } else {
          console.log('ship hit but not sunk. updating last hit')
          lastHit = (lastHit - width)
        }
      } else {
        console.log('targeted miss')
        playerGridCells[lastHit - width].classList.add('miss')
        computerMissiles.push(lastHit - width)
      }
    } else {
      //if all of these values have been target already, remove last hit and generate random fire
      //this needs to be called if every other cell around lastHit has been targeted
      console.log('cannot fire anymore around lastHit. Resetting lastHit and calling random computerMissileFire')
      lastHit = ''
      computerMissileFire()
    }
  }

  function computerMissileFire() {
    if (computerShip1.isSunk && computerShip2.isSunk && computerShip3.isSunk && computerShip4.isSunk) {
      return
    } else if (lastHit !== '') {
      console.log('calling targetedFire')
      targetedFire()
    } else {
      const target = createNumber()
      console.log(target)
      if (computerMissiles.includes(target)) {
        console.log('repeated fire; fire again.')
        computerMissileFire()
      } else if (playerShip1.location.includes(target)) {
        console.log('random hit')
        playerGridCells[target].classList.add('hit')
        computerMissiles.push(target)
        checkSunk()
        if (!playerShip1.isSunk) {
          lastHit = target
          console.log('ranNum was a hit, logged in lastHit as', lastHit)
        }
      } else if (playerShip2.location.includes(target)) {
        console.log('random hit')
        playerGridCells[target].classList.add('hit')
        computerMissiles.push(target)
        checkSunk()
        if (!playerShip2.isSunk) {
          lastHit = target
          console.log('ranNum was a hit, logged in lastHit as', lastHit)
        }
      } else if (playerShip3.location.includes(target)) {
        console.log('random hit')
        playerGridCells[target].classList.add('hit')
        computerMissiles.push(target)
        checkSunk()
        if (!playerShip3.isSunk) {
          lastHit = target
          console.log('ranNum was a hit, logged in lastHit as', lastHit)
        }
      } else if (playerShip4.location.includes(target)) {
        console.log('random hit')
        playerGridCells[target].classList.add('hit')
        computerMissiles.push(target)
        checkSunk()
        if (!playerShip4.isSunk) {
          lastHit = target
          console.log('ranNum was a hit, logged in lastHit as', lastHit)
        }
      } else {
        console.log('random miss')
        playerGridCells[target].classList.add('miss')
        computerMissiles.push(target)
      }
    }
  }

  // FINAL STAGE: GAME OVER

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