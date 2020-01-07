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
  
  Create a class that adds a color to the grid to display on a missed or hit grid cell. Have a key on the page that shows that yellow = miss, red = hit etc.
  or 
  Save an asset that is an image that says "MISS" or "HIT" and it fit into each grid cell when required


  PLAYER MISSILE-FIRE.) Display a computer ship's cells as SUNK after all grid cells have been HIT
   
  Player's missile-fire input is converted into a grid cell index and a class of "HIT" has been added
  A function checks if a class of "hit" has been added to all grid cells in a computer ship location's array
  If all grid cells have been hit, change isSunk from false to true
  if isSunk = true, add a class of SUNK to the ship grid cells
  
  Create a class that adds a color to the grid to display on all sunk grid cells. Have a key on the page that shows that black = sunk
  or 
  Save an asset that is an image that says "SUNK" and it fit into each grid cell when required


  COMPUTER MISSILE-FIRE.) Computer generated missile fire
  Randomly generate a grid cell (0-99) to target on the player's board
  Read if the cell is contained in a player ship location array

  COMPUTER MISSILE-FIRE.) Intelligent missile-firing
  If a turn is a HIT, the computer should fire at cells surrounding the HIT cell
  Should be able to use similar logic to how I auto-generated ships on the grid

  COMPUTER MISSILE-FIRE.) Display player grid cells as HIT, MISS, or SUNK
  
  */


  // DOM VARIABLES

  const instructions = document.querySelector('.instructions')
  //I could only reveal the computer grid when "start game" is pressed. Otherwise I may not need it to trigger anything
  const clearBoard = document.querySelector('.clearBoard')
  const playerGrid = document.querySelector('.playerGrid')
  const computerGrid = document.querySelector('.computerGrid')


  // GAME VARIABLES
  const playerGridCells = []
  const computerGridCells = []
  const width = 10
  //changes to true when all ships have been placed
  let allShipsPlaced = false
  //a changeable variable to check the last chosen grid cell so as not to choose it again, or to choose nearby cells
  //let lastCell


  // SHIP OBJECTS

  //length: 2
  const playerShip1 = {
    location: [],
    //change to false if every item in the array has a class of HIT in order to change them all to SUNK
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

  //these ships will not have a class added to the cells, so that they do not appear
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
  //ships will not be shown, but MISS, and HIT, and SUNK will.
  function makeComputerGrid() {
    Array(width * width).join('.').split('.').forEach((num, i) => {
      const cell = document.createElement('div')
      cell.classList.add('grid-item')
      cell.innerText = i
      cell.addEventListener('click', () => fireMissile(i))
      computerGridCells.push(cell)
      computerGrid.appendChild(cell)
    })
  }
  makeComputerGrid()

  //STAGE ONE: SET-UP FUNCTIONS
  //PLAYER FUNCTIONS

  /* A function that is called when "set-up" is clicked.
  The first function generates ship1
  Once two grid cells have been chosen, the function checks the length of the ship location array and then calls the function for the next ship (ship2) */

  //works immediately when page is loaded
  //can place your first ship
  //must log each clicked cell into the corresponding ship array
  function placeShips(i) {
    if (allShipsPlaced) {
      return
    }
    if (playerShip4.location.length >= 4) {
      allShipsPlaced = true
      // console.log(allShipsPlaced === true)
    }
    if (playerShip3.location.length >= 4) {
      // innerHTML not working
      // instructions.innerHTML = 'Place your fourth ship. It has a length of 5. When placed, click "Begin Firing Missiles"!'
      playerGridCells[i].classList.add('ship4')
      if (playerGridCells[i].classList.contains('ship4')) {
        playerShip4.location.push(i)
      }
    }
    if (playerShip2.location.length >= 3) {
      // innerHTML not working
      // instructions.innerHTML = 'Place your third ship. It has a length of 4. Do not click "Begin Firing Missiles" until all 4 ships have been placed.'
      playerGridCells[i].classList.add('ship3')
      if (playerGridCells[i].classList.contains('ship3')) {
        playerShip3.location.push(i)
      }
    }
    if (playerShip1.location.length >= 2) {
      // instructions.innerHTML = 'Place your second ship. It has a length of 3. Do not click "Begin Firing Missiles" until all 4 ships have been placed.'
      playerGridCells[i].classList.add('ship2')
      if (playerGridCells[i].classList.contains('ship2')) {
        playerShip2.location.push(i)
      }
    }
    playerGridCells[i].classList.add('ship1')
    if (playerGridCells[i].classList.contains('ship1')) {
      playerShip1.location.push(i)
    }
    // console.log('ship1', playerShip1.location)
    // console.log('ship2', playerShip2.location)
    // console.log('ship3', playerShip3.location)
    // console.log('ship3', playerShip3.location)
  }

  //COMPUTER FUNCTIONS

  //a function that randomly chooses a whole number between 0-99
  function createNumber() {
    return Math.floor(Math.random() * 100)
  }

  /*a function that calls createNumber to generate ships on computer grid
  this number is turned into the index of the computer grid
  cells nearby this cell is also given a class of computerShip1, then 2, etc.
  advanced: it can determine that grid cell 13 is surrounded by 12 and 14 (current chosen cell number +1 (++) or -1 (--)) and 3 and 23 (current chosen cell number +10 or -10) 
  could create a function for generating what is a nerby cell?
  
  if randomNumber is an edge number:

  Horizontal:
  MUST add 1 in length: 0, 10, 20, 30, 40, 50, 60, 70, 80, 90
  MUST subtract 1 in length: 9, 19, 29, 39, 49, 59, 69, 79, 89, 99

  Vertical:
  MUST add 10 to top: 90, 91, 92, 93, 94, 95, 96, 97, 98, 99
  MUST subtract 10 from bottom: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  
  Should check to see that no previously used cells are reused
  */

  //does not stop ships intersecting but does stop them from wrapping on the grid
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

  //prohibits ships from wrapping on the grid
  //does not stop ships intersecting
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

  //stops ships wrapping on grid
  //does not stop ships intersecting
  function createShip3() {
    const ranNum = createNumber()
    computerGridCells[ranNum].classList.add('computerShip3')
    computerShip3.location.push(ranNum)
    if (computerGridCells[ranNum].classList.contains('computerShip3') && ranNum === 0 || ranNum === 10 || ranNum === 20 || ranNum === 30 || ranNum === 40 || ranNum === 50 || ranNum === 60 || ranNum === 70 || ranNum === 80 || ranNum === 90) {
      computerGridCells[ranNum + 1].classList.add('computerShip3')
      computerShip3.location.push(ranNum + 1)
      computerGridCells[ranNum + 2].classList.add('computerShip3')
      computerShip3.location.push(ranNum + 2)
      computerGridCells[ranNum + 3].classList.add('computerShip3')
      computerShip3.location.push(ranNum + 3)
    } else if (computerGridCells[ranNum].classList.contains('computerShip3') && ranNum === 9 || ranNum === 19 || ranNum === 29 || ranNum === 39 || ranNum === 49 || ranNum === 59 || ranNum === 69 || ranNum === 79 || ranNum === 89 || ranNum === 99) {
      computerGridCells[ranNum - 1].classList.add('computerShip3')
      computerShip3.location.push(ranNum - 1)
      computerGridCells[ranNum - 2].classList.add('computerShip3')
      computerShip3.location.push(ranNum - 2)
      computerGridCells[ranNum - 3].classList.add('computerShip3')
      computerShip3.location.push(ranNum - 3)
    } else if (computerGridCells[ranNum].classList.contains('computerShip3') && ranNum === 1 || ranNum === 11 || ranNum === 21 || ranNum === 31 || ranNum === 41 || ranNum === 51 || ranNum === 61 || ranNum === 71 || ranNum === 81 || ranNum === 91) {
      computerGridCells[ranNum + 1].classList.add('computerShip3')
      computerShip3.location.push(ranNum + 1)
      computerGridCells[ranNum + 2].classList.add('computerShip3')
      computerShip3.location.push(ranNum + 2)
      computerGridCells[ranNum + 3].classList.add('computerShip3')
      computerShip3.location.push(ranNum + 3)
    } else if (computerGridCells[ranNum].classList.contains('computerShip3') && ranNum === 8 || ranNum === 18 || ranNum === 28 || ranNum === 38 || ranNum === 48 || ranNum === 58 || ranNum === 68 || ranNum === 78 || ranNum === 88 || ranNum === 98) {
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

  //stops ships wrapping on grid
  //does not stop ships intersecting
  function createShip4() {
    const ranNum = createNumber()
    computerGridCells[ranNum].classList.add('computerShip4')
    computerShip4.location.push(ranNum)
    if (computerGridCells[ranNum].classList.contains('computerShip4') && ranNum === 0 || ranNum === 10 || ranNum === 20 || ranNum === 30 || ranNum === 40 || ranNum === 50 || ranNum === 60 || ranNum === 70 || ranNum === 80 || ranNum === 90) {
      computerGridCells[ranNum + 1].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 1)
      computerGridCells[ranNum + 2].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 2)
      computerGridCells[ranNum + 3].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 3)
      computerGridCells[ranNum + 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 4)
    } else if (computerGridCells[ranNum].classList.contains('computerShip4') && ranNum === 9 || ranNum === 19 || ranNum === 29 || ranNum === 39 || ranNum === 49 || ranNum === 59 || ranNum === 69 || ranNum === 79 || ranNum === 89 || ranNum === 99) {
      computerGridCells[ranNum - 1].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 1)
      computerGridCells[ranNum - 2].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 2)
      computerGridCells[ranNum - 3].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 3)
      computerGridCells[ranNum - 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 4)
    } else if (computerGridCells[ranNum].classList.contains('computerShip4') && ranNum === 1 || ranNum === 11 || ranNum === 21 || ranNum === 31 || ranNum === 41 || ranNum === 51 || ranNum === 61 || ranNum === 71 || ranNum === 81 || ranNum === 91) {
      computerGridCells[ranNum + 1].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 1)
      computerGridCells[ranNum + 2].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 2)
      computerGridCells[ranNum + 3].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 3)
      computerGridCells[ranNum + 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 4)
    } else if (computerGridCells[ranNum].classList.contains('computerShip4') && ranNum === 8 || ranNum === 18 || ranNum === 28 || ranNum === 38 || ranNum === 48 || ranNum === 58 || ranNum === 68 || ranNum === 78 || ranNum === 88 || ranNum === 98) {
      computerGridCells[ranNum - 1].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 1)
      computerGridCells[ranNum - 2].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 2)
      computerGridCells[ranNum - 3].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 3)
      computerGridCells[ranNum - 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 4)
    } else if (computerGridCells[ranNum].classList.contains('computerShip4') && ranNum === 2 || ranNum === 12 || ranNum === 22 || ranNum === 32 || ranNum === 42 || ranNum === 52 || ranNum === 62 || ranNum === 72 || ranNum === 82 || ranNum === 92) {
      computerGridCells[ranNum + 1].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 1)
      computerGridCells[ranNum + 2].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 2)
      computerGridCells[ranNum + 3].classList.add('computerShip4')
      computerShip4.location.push(ranNum + 3)
      computerGridCells[ranNum + 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum - 4)
    } else if (computerGridCells[ranNum].classList.contains('computerShip4') && ranNum === 7 || ranNum === 17 || ranNum === 27 || ranNum === 37 || ranNum === 47 || ranNum === 57 || ranNum === 67 || ranNum === 77 || ranNum === 87 || ranNum === 97) {
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

  // function createShips() {
  //   //when game is complete, add if allShipsPlaced is true, then execute this:
  //   const ranNum1 = createNumber()
  //   const ranNum2 = createNumber()
  //   const ranNum3 = createNumber()
  //   const ranNum4 = createNumber()
  //   computerGridCells[ranNum1].classList.add('computerShip1')
  //   computerGridCells[ranNum2].classList.add('computerShip2')
  //   computerGridCells[ranNum3].classList.add('computerShip3')
  //   computerGridCells[ranNum4].classList.add('computerShip4')
  //   computerShip1.location.push(ranNum1)
  //   computerShip2.location.push(ranNum2)
  //   computerShip3.location.push(ranNum3)
  //   computerShip4.location.push(ranNum4)
  //   if (computerGridCells[ranNum1].classList.contains('computerShip1') && ranNum1 !== 0 || ranNum1 !== 10 || ranNum1 !== 20 || ranNum1 !== 30 || ranNum1 !== 40 || ranNum1 !== 50 || ranNum1 !== 60 || ranNum1 !== 70 || ranNum1 !== 80 || ranNum1 !== 90) {
  //     computerGridCells[ranNum1 - 1].classList.add('computerShip1')
  //     computerShip1.location.push(ranNum1 - 1)
  //   }
  //   else if (computerGridCells[ranNum1].classList.contains('computerShip1') && ranNum1 !== 9 || ranNum1 !== 19 || ranNum1 !== 29 || ranNum1 !== 39 || ranNum1 !== 49 || ranNum1 !== 59 || ranNum1 !== 69 || ranNum1 !== 79 || ranNum1 !== 89 || ranNum1 !== 99) {
  //     computerGridCells[ranNum1 + 1].classList.add('computerShip1')
  //     computerShip1.location.push(ranNum1 + 1)
  //   }
  //   if (computerGridCells[ranNum2].classList.contains('computerShip2')) {
  //     computerGridCells[ranNum2 + 10].classList.add('computerShip2')
  //     computerShip2.location.push(ranNum2 + 10)
  //     computerGridCells[ranNum2 - 10].classList.add('computerShip2')
  //     computerShip2.location.push(ranNum2 - 10)
  //   }
  //   if (computerGridCells[ranNum3].classList.contains('computerShip3')) {
  //     computerGridCells[ranNum3 - 1].classList.add('computerShip3')
  //     computerShip3.location.push(ranNum3 - 1)
  //     computerGridCells[ranNum3 - 2].classList.add('computerShip3')
  //     computerShip3.location.push(ranNum3 - 2)
  //     computerGridCells[ranNum3 + 1 ].classList.add('computerShip3')
  //     computerShip3.location.push(ranNum3 + 1)
  //   }
  //   if (computerGridCells[ranNum4].classList.contains('computerShip4')) {
  //     computerGridCells[ranNum4 + 10].classList.add('computerShip4')
  //     computerShip4.location.push(ranNum4 + 10)
  //     computerGridCells[ranNum4 + 20].classList.add('computerShip4')
  //     computerShip4.location.push(ranNum4 + 20)
  //     computerGridCells[ranNum4 - 10].classList.add('computerShip4')
  //     computerShip4.location.push(ranNum4 - 10)
  //     computerGridCells[ranNum4 - 20].classList.add('computerShip4')
  //     computerShip4.location.push(ranNum4 - 20)
  //   }
  //   console.log('comp Ship 1 length of 2', computerShip1.location)
  //   console.log('comp Ship 2 length of 3', computerShip2.location)
  //   console.log('comp Ship 3 length of 4', computerShip3.location)
  //   console.log('comp Ship 4 length of 5', computerShip4.location)
  // }
  // createShips()

  // SET-UP EVENTS

  // STAGE TWO: PLAYER MISSILE-FIRE

  // PLAYER MISSILE-FIRE FUNCTIONS

  // function fireMissile(i) {
  //   console.log(`ready to fire at ${i}!`)
  // }

  //a function that takes plaer missile fire and checks for a hit or a miss on the computer's board
  //does not check for "sunk" ships
  function fireMissile(i) {
    if (computerShip1.location.includes(i)) {
      computerGridCells[i].classList.add('hit')
      checkSunk()
    }
    // } else if (computerShip2.location.includes(i)) {
    //   computerGridCells[i].classList.add('hit')
    //   // checkSunk()
    // } else if (computerShip3.location.includes(i)) {
    //   computerGridCells[i].classList.add('hit')
    //   // checkSunk()
    // } else if (computerShip4.location.includes(i)) {
    //   computerGridCells[i].classList.add('hit')
    //   // checkSunk()
    // } else {
    //   computerGridCells[i].classList.add('miss')
    // }
  }

  function checkSunk() {
    if (computerShip1.location.every(l => computerGridCells[l].classList.contains('hit'))) {
      computerShip1.location.forEach(l => {
        computerGridCells[l].classList.remove('hit')
        computerGridCells[l].classList.add('sunk')
      })
    }
    //if every item in the array has a class of hit
    //use map instead of every? then use forEach to call this function?
    // if (computerShip1.location.every(checkShip)) {
    //   //change every item to have a class of sunk 
    //   //will this be an issue when a square changes class from ship1, ship2 etc to 'hit'? or does it retain class of ship1 if it is hit?
    //   computerGridCells.forEach(cell => cell.classList.remove('hit'))
    //   computerGridCells.classList.add('sunk')
    //   computerShip1.isSunk = true
    // }
    //repeat computerShip1 code for all ships
  }

  // function shipIsSunk() {
  //   computerGridCells.map((computerGridCells, index) => {
  //     if (index.contains('hit')) {
  //       return computerGridCells.classList.add('sunk')
  //     }
  //     return computerGridCells
  //   })
  // }

  //if every item in computerShip1.location array has a class of hit, change isSunk value to TRUE
  // function checkShip1() {
  //   if computerShip1.location.length
  // }

  // function checkShip1(computerShip1, classes) {
  //   return computerShip1.location.filter(function (cell, elem) {
  //     return classes.some(function () {
  //       return elem.classList.contains('hit');
  //     });
  //   }).length > 0
  // }
  // console.log(checkShip1())

  //use 'every' or 'forEach' instead of filter?
  // computerShip1.location.filter(computerGridCells => {
  //   computerGridCells.classList.contains('hit')
  // })
  // computerShip1.isSunk = true

  //if computerShip1.isSunk = true
  //execute shipIsSunk to transform all array items to have a class of 'sunk'
  //should only execute on a certain ship that is sunk, even though function loops though every grid cell



  //Reset Game Event
  clearBoard.addEventListener('click', () => {
    window.location.reload()
  })

}
window.addEventListener('DOMContentLoaded', init)
