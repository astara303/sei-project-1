//today I want to take some "ships" and put them on the board.
//I need to figure out how to make a ship appear to take up more than 1 square
//I think I need to use aspect ratios for this
//https://css-tricks.com/aspect-ratios-grid-items/
//then I want to be able to place and rotate them
//I would also like to try to place numbers and letters along the grid


function init() {
  //  dom variables
  const playerGrid = document.querySelector('.playerGrid')
  //the array to store the dom grid squares in
  const gridSquares = []

  // game variables
  const width = 11
  let playerIndex = 1

  //uppercase Array makes an empty array to be filled 
  //filled with the width squared to create an equal grid
  //loop as many times as width times the width to fill the grid
  Array(width * width).join('.').split('.').forEach(() => {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    gridSquares.push(square)
    playerGrid.appendChild(square)
  })
  // places player at the starting position when grid has finished building
  gridSquares[playerIndex].classList.add('player')
  
  //find key code for every keyboard item
  //call this on 'keydown' event
  function handleKeyDown(e) {
    switch (e.keyCode) {
      case 39:
        if (playerIndex % width < width - 1) {
          playerIndex++
        }
        break
      case 37:
        if (playerIndex % width > 0) {
          playerIndex--
        }
        break
      case 40:
        if (playerIndex + width < width * width) {
          playerIndex += width 
        }
        break
      case 38:
        if (playerIndex - width >= 0) {
          playerIndex -= width
        } 
        break
      default:
        console.log('player shouldnt move')
    }
    gridSquares.forEach(square => square.classList.remove('player'))
    gridSquares[playerIndex].classList.add('player')
    console.log('current player index is', playerIndex)
  }
  // event handlers
  window.addEventListener('keydown', handleKeyDown)
}
window.addEventListener('DOMContentLoaded', init)