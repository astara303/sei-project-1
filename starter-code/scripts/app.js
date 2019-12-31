function init() {
  //  dom variables
  const playerGrid = document.querySelector('.playerGrid')
  const computerGrid = document.querySelector('.computerGrid')
 
  const gridCells = []
  const width = 10
  let lastCell

  const ship1 = {
    //made up of grid cells: 1 width x 2 height
    length: 2,
    //replace with a number 0-9
    locationNumber: null,
    //replace with a letter A-J
    locationLetter: null
  }

  const ship2 = {
    //made up of grid cells: 1 width x 3 height
    length: 3,
    //replace with a number 0-9
    locationNumber: null,
    //replace with a letter A-J
    locationLetter: null
  }

  const ship3 = {
    //made up of grid cells: 1 width x 4 height
    length: 4,
    //replace with a number 0-9
    locationNumber: null,
    //replace with a letter A-J
    locationLetter: null
  }

  const ship4 = {
    //made up of grid cells: 1 width x 5 height
    length: 5,
    //replace with a number 0-9. The verticle location
    cellNumber: null,
    //replace with a letter A-J. The horizonal location
    cellLetter: null
  }


  //player grid
  Array(width * width).join('.').split('.').forEach(() => {
    const cell = document.createElement('div')
    cell.classList.add('grid-item')
    gridCells.push(cell)
    playerGrid.appendChild(cell)
  })

  //computer grid. Will be hidden once game is finished testing.
  Array(width * width).join('.').split('.').forEach(() => {
    const cell = document.createElement('div')
    cell.classList.add('grid-item')
    gridCells.push(cell)
    computerGrid.appendChild(cell)
  })

  //first step is setup
  //randomly place different sized ships on player and computer grid
  //the ship cannot go off the board
  //the ship cannot intersect another ship
  
  //second step is player-chosen missile fire
  //a missle can MISS, HIT, and SINK a ship

  //a function that randomises a cellNumber (number between 0-9)
  function createNumber() {
    const idx = Math.floor(Math.random() * 10)
    if (idx === lastCell) {
      console.log('same cell was chosen')
      return createNumber()
    }
    lastCell = idx
    return idx
  }
  console.log(createNumber())

  //a function that randomises a cellLetter

  //a function that takes a cell number and cell letter to randomise placement
  // function placeShip(cellNumber, cellLetter) {
    
  // }
  
}
window.addEventListener('DOMContentLoaded', init)