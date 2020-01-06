function init() {

  /* **GAME STAGES**


  STAGE ONE: SET-UP

  Randomly place different sized ships on player and computer grid
  -the ship cannot go off the board
  -the ship cannot intersect another ship
  -the computer's grid is shown to record the player's missile-fires in stage two, but the ships are not displayed
  

  STAGE TWO: PLAYER MISSILE FIRE

  Player input is taken, such as A7 or B1
  This input in converted into a grid cell number in the grid array
  A missile can MISS, HIT, and SINK a ship. Player's turn is displayed on computer grid


  STAGE THREE: COMPUTER MISSILE FIRE

  The computer choice is generated once per turn, after the player has had their turn
  Randomised cell is chosen, such as 11 or 68
  A missile can MISS, HIT, and SINK a ship. Computer's turn is played on player grid (their hits and misses are shown on player board)


  **GAME LOGIC**


  SET-UP.) Create each ship's position and length on the grid

  Randomise a number 0-99 (This corresponds to an index in the array of grid cells)
  Use that random number (1, 22 etc) to add 1, 2, or more grid cells on to it to create horizonal or vertical length 
  (add grid cell 2 to 3 to create ship 1 horizontally) 
  (add grid cells C1 and D1 to B1 to create ship 2 vertically)


  SET-UP.) Visibly place the ships on the grid

  Create a function that uses the cells stored in ship length array to add a class to each cell
  Ship 1 can be blue, ship 2 can be green, etc.
  

  SET-UP.) How will the ships not intersect?

  I have to find a way for the function to recognise if previously placed ships occupy that grid cell already 


  SET-UP.) How will ships not go off the board?

  I should look to the pikachu grid in order to use this method to restrict the borders of the grid


  PLAYER MISSILE-FIRE.) Convert player input (A1), into its corresponding grid cell index ('A1' === gridCells[1])?
  
  Store the player input in a variable
  I could check this variable against a list that has each cell labelled as A1 = index 1, E8 = index 84 etc.


  PLAYER MISSILE-FIRE.) Display grid cell as MISS or HIT
  
  a function will convert the player's missile-fire input into a grid cell index
  a second function will check if this index corresponds to any computerShipLocation array grid cells
  if it does, a class of "HIT" will be added to the grid cell and displayed on the computer grid
  if it doesn't, a class of "MISS" will be added to the grid cell and displayed on the computer grid
  Create a class that adds a color to the grid to display on a missed or hit grid cell. Have a key on the page that shows that yellow = miss, red = hit etc.
  or Save an asset that is an image that says "MISS" or "HIT" and it fit into each grid cell when required


  PLAYER MISSILE-FIRE.) Display a ship as SUNK after all ship grid cells have been HIT
  
  Player's missile-fire input is converted into a grid cell index and a class of "HIT" has been added
  A function checks if a class of "hit" has been added to all grid cells in a computerShipLocation's array
  If all grid cells have been hit, change isSunk from false to true
  if isSunk = true, add a class of SUNK to the ship grid cells
  Create a class that adds a color to the grid to display on all sunk grid cells. Have a key on the page that shows that black = sunk
  or Save an asset that is an image that says "SUNK" and it fit into each grid cell when required


  COMPUTER MISSLE-FIRE.)
  Randomly generate a grid cell to target on the player's board
  Read if the
  */


  // DOM VARIABLES

  const setUpButton = document.querySelector('.setUp')
  const playerGrid = document.querySelector('.playerGrid')
  const computerGrid = document.querySelector('.computerGrid')
  const playerData = document.querySelector('.playerData')
  const fireButton = document.querySelector('#fire')


  // GAME VARIABLES
  const gridCells = []
  const width = 10
  //a changeable variable to check the last chosen grid cell so as not to choose it again, or to choose nearby cells
  // let lastCell


  // SHIP OBJECTS

  //length: 2
  const playerShip1 = {
    location: [],
    //might need this to change to false if every item in the array has a class of HIT in order to change them all to SUNK
    //could also store each grid index that makes length and location as its own variable if needed but the array should work
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
  const playerShip4  = {
    location: [],
    isSunk: false
  }

  //these ships will not have a class added to the cells, so that they do not appear
  //length: 2
  const computerShip1  = {
    location: [],
    isSunk: false
  }
  //length: 3
  const computerShip2  = {
    location: [],
    isSunk: false
  }
  //length: 4
  const computerShip3  = {
    location: [],
    isSunk: false
  }
  //length: 5
  const computerShip4  = {
    location: [],
    isSunk: false
  }


  //PLAYER GRID
  Array(width * width).join('.').split('.').forEach(() => {
    const cell = document.createElement('div')
    cell.classList.add('grid-item')
    gridCells.push(cell)
    playerGrid.appendChild(cell)
  })

  //COMPUTER GRID
  //Will be shown next to player's grid 
  //ships will not be shown, but MISS, and HIT, and SUNK will.
  Array(width * width).join('.').split('.').forEach(() => {
    const cell = document.createElement('div')
    cell.classList.add('grid-item')
    gridCells.push(cell)
    computerGrid.appendChild(cell)
  })

  //STAGE ONE: SET-UP FUNCTIONS

  //a function that randomly chooses a number between 0-99
  function createNumber() {
    //generate a random whole number 0-99
    const cellNumber = Math.floor(Math.random() * 100)
    return cellNumber
  }
  console.log(createNumber())

  //a function that calls createNumber and stores it in a globally declared var (the ship's length array)
  //Each ship will have its own version of the function that adds 1, 2 etc cell numbers to this array
  //the function will add nearby cells
  //so it must be able to determine that grid cell 13 is surrounded by 12 and 14 (current chosen cell number +1 (++) or -1 (--)) and 3 and 23 (current chosen cell number +10 or -10)
  

  //STAGE TWO: PLAYER MISSILE FIRE

  //a function that retreives the player data and turns it into an index of the computer grid

  //an event that, when the submit button is clicked, the playerData is console logged
  fireButton.addEventListener('click', e => {
    e.preventDefault()
    //this is logging the number of times its clicked, not logging the value of user input I saved as playerData
    console.log('player cell choice was', playerData.value)
    //this logs undefined
    //console.log(playerData.value)
  })
}
window.addEventListener('DOMContentLoaded', init)