function init() {

  // DOM VARIABLES
  const clearBoard = document.querySelector('.clearBoard')
  const playerGrid = document.querySelector('.playerGrid')
  const computerGrid = document.querySelector('.computerGrid')
  const header = document.querySelector('h1')
  const instructions = document.querySelector('h2')
  const winnerLeft = document.querySelector('.yourMap')
  const winnerRight = document.querySelector('.radar')

  //GAME VARIABLES
  //grid variables
  const playerGridCells = []
  const computerGridCells = []
  const width = 10
  const computerMissiles = []
  const allComputerShips = []
  let allShipsPlaced = false
  let lastHit = ''

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
  //these ships do not appear for the user
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
    if (ranNum % width > 0 && (ranNum - 1) % width > 0) {
      console.log('ship1 chose to add to the left of', ranNum)
      computerShip1.location.push(ranNum)
      computerShip1.location.push(ranNum - 1)
      computerShip1.isPlaced = true
      if (checkForOverlap(computerShip1.location, allComputerShips)) {
        computerShip1.location = []
        ship1Horizontal()
      } else {
        computerGridCells[ranNum].classList.add('computerShip1')
        computerGridCells[ranNum - 1].classList.add('computerShip1')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum - 1)
        computerShip1.isPlaced = true
      }
    } else if (ranNum % width < width - 1 && (ranNum + 1) % width < width - 1) {
      console.log('ship1 chose to add to the right of', ranNum)
      computerShip1.location.push(ranNum)
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
      //dont need this anymore after moving where I add location to the array
      computerShip1.location = []
      ship1Horizontal()
    }
  }

  function ship1Vertical() {
    const ranNum = createNumber()
    if (ranNum + width < width * width && ranNum + (width * 2) < width * width) {
      console.log('ship1 chose to add to the bottom of', ranNum)
      computerShip1.location.push(ranNum)
      computerShip1.location.push(ranNum + width)
      if (checkForOverlap(computerShip1.location, allComputerShips)) {
        computerShip1.location = []
        ship1Vertical()
      } else {
        computerGridCells[ranNum].classList.add('computerShip1')
        computerGridCells[ranNum + width].classList.add('computerShip1')
        allComputerShips.push(ranNum)
        allComputerShips.push(ranNum + width)
        computerShip1.isPlaced = true
      }
    } else if (ranNum - width >= 0 && ranNum - (width * 2) >= 0) {
      console.log('ship1 chose to add to the top of', ranNum)
      computerShip1.location.push(ranNum)
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
      computerShip1.location = []
      ship1Vertical()
    }
  }

  function ship2Horizontal() {
    const ranNum = createNumber()
    if (ranNum % width > 0 && (ranNum - 1) % width > 0 && (ranNum - 2) % width > 0) {
      console.log('ship2 chose to add to the left of', ranNum)
      computerShip2.location.push(ranNum)
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
    } else if (ranNum % width < width - 1 && (ranNum + 1) % width < width - 1 && (ranNum + 2) % width < width - 1) {
      console.log('ship2 chose to add to the right of', ranNum)
      computerShip2.location.push(ranNum)
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
      computerShip2.location = []
      ship2Horizontal()
    }
  }

  function ship2Vertical() {
    const ranNum = createNumber()
    if (ranNum + width < width * width && ranNum + (width * 2) < width * width && ranNum + (width * 3) < width * width) {
      console.log('ship2 chose to add to the bottom of', ranNum)
      computerShip2.location.push(ranNum)
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
    } else if (ranNum - width >= 0 && ranNum - (width * 2) >= 0 && ranNum - (width * 3) >= 0) {
      console.log('ship2 chose to add to the top of', ranNum)
      computerShip2.location.push(ranNum)
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
      computerShip2.location = []
      ship2Vertical()
    }
  }

  function ship3Horizontal() {
    const ranNum = createNumber()
    if (ranNum % width > 0 && (ranNum - 1) % width > 0 && (ranNum - 2) % width > 0 && (ranNum - 3) % width > 0) {
      console.log('ship3 chose to add to the left of', ranNum)
      computerShip3.location.push(ranNum)
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
    } else if (ranNum % width < width - 1 && (ranNum + 1) % width < width - 1 && (ranNum + 2) % width < width - 1 && (ranNum + 3) % width < width - 1) {
      console.log('ship3 chose to add to the right of', ranNum)
      computerShip3.location.push(ranNum)
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
      computerShip3.location = []
      ship3Horizontal()
    }
  }

  function ship3Vertical() {
    const ranNum = createNumber()
    if (ranNum + width < width * width && ranNum + (width * 2) < width * width && ranNum + (width * 3) < width * width && ranNum + (width * 4) < width * width) {
      console.log('ship3 chose to add to the bottom of', ranNum)
      computerShip3.location.push(ranNum)
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
    } else if (ranNum - width >= 0 && ranNum - (width * 2) >= 0 && ranNum - (width * 3) >= 0 && ranNum - (width * 4) >= 0) {
      console.log('ship3 chose to add to the top of', ranNum)
      computerShip3.location.push(ranNum)
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
      computerShip3.location = []
      ship3Vertical()
    }
  }

  function ship4Horizontal() {
    const ranNum = createNumber()
    if (ranNum % width > 0 && (ranNum - 1) % width > 0 && (ranNum - 2) % width > 0 && (ranNum - 3) % width > 0 && (ranNum - 4) % width > 0) {
      console.log('ship4 chose to add to the left of', ranNum)
      computerGridCells[ranNum].classList.add('computerShip4')
      computerGridCells[ranNum - 1].classList.add('computerShip4')
      computerGridCells[ranNum - 2].classList.add('computerShip4')
      computerGridCells[ranNum - 3].classList.add('computerShip4')
      computerGridCells[ranNum - 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum)
      computerShip4.location.push(ranNum - 1)
      computerShip4.location.push(ranNum - 2)
      computerShip4.location.push(ranNum - 3)
      computerShip4.location.push(ranNum - 4)
      allComputerShips.push(ranNum)
      allComputerShips.push(ranNum - 1)
      allComputerShips.push(ranNum - 2)
      allComputerShips.push(ranNum - 3)
      allComputerShips.push(ranNum - 4)
      computerShip4.isPlaced = true
    } else if (ranNum % width < width - 1 && (ranNum + 1) % width < width - 1 && (ranNum + 2) % width < width - 1 && (ranNum + 3) % width < width - 1 && ranNum + 4 % width < width - 1) {
      console.log('ship4 chose to add to the right of', ranNum)
      computerGridCells[ranNum].classList.add('computerShip4')
      computerGridCells[ranNum + 1].classList.add('computerShip4')
      computerGridCells[ranNum + 2].classList.add('computerShip4')
      computerGridCells[ranNum + 3].classList.add('computerShip4')
      computerGridCells[ranNum + 4].classList.add('computerShip4')
      computerShip4.location.push(ranNum)
      computerShip4.location.push(ranNum + 1)
      computerShip4.location.push(ranNum + 2)
      computerShip4.location.push(ranNum + 3)
      computerShip4.location.push(ranNum + 4)
      allComputerShips.push(ranNum)
      allComputerShips.push(ranNum + 1)
      allComputerShips.push(ranNum + 2)
      allComputerShips.push(ranNum + 3)
      allComputerShips.push(ranNum + 4)
      computerShip4.isPlaced = true
    } else {
      ship4Horizontal()
    }
  }

  function ship4Vertical() {
    const ranNum = createNumber()
    if (ranNum + width < width * width && ranNum + (width * 2) < width * width && ranNum + (width * 3) < width * width && ranNum + (width * 4) < width * width && ranNum + (width * 5) < width * width) {
      console.log('ship4 chose to add to the bottom of', ranNum)
      computerGridCells[ranNum].classList.add('computerShip4')
      computerGridCells[ranNum + width].classList.add('computerShip4')
      computerGridCells[ranNum + (width * 2)].classList.add('computerShip4')
      computerGridCells[ranNum + (width * 3)].classList.add('computerShip4')
      computerGridCells[ranNum + (width * 4)].classList.add('computerShip4')
      computerShip4.location.push(ranNum)
      computerShip4.location.push(ranNum + width)
      computerShip4.location.push(ranNum + (width * 2))
      computerShip4.location.push(ranNum + (width * 3))
      computerShip4.location.push(ranNum + (width * 4))
      allComputerShips.push(ranNum)
      allComputerShips.push(ranNum + width)
      allComputerShips.push(ranNum + (width * 2))
      allComputerShips.push(ranNum + (width * 3))
      allComputerShips.push(ranNum + (width * 4))
      computerShip4.isPlaced = true
    } else if (ranNum - width >= 0 && ranNum - (width * 2) >= 0 && ranNum - (width * 3) >= 0 && ranNum - (width * 4) >= 0 && ranNum - (width * 5) >= 0) {
      console.log('ship4 chose to add to the top of', ranNum)
      computerGridCells[ranNum].classList.add('computerShip4')
      computerGridCells[ranNum - width].classList.add('computerShip4')
      computerGridCells[ranNum - (width * 2)].classList.add('computerShip4')
      computerGridCells[ranNum - (width * 3)].classList.add('computerShip4')
      computerGridCells[ranNum - (width * 4)].classList.add('computerShip4')
      computerShip4.location.push(ranNum)
      computerShip4.location.push(ranNum - width)
      computerShip4.location.push(ranNum - (width * 2))
      computerShip4.location.push(ranNum - (width * 3))
      computerShip4.location.push(ranNum - (width * 4))
      allComputerShips.push(ranNum)
      allComputerShips.push(ranNum - width)
      allComputerShips.push(ranNum - (width * 2))
      allComputerShips.push(ranNum - (width * 3))
      allComputerShips.push(ranNum - (width * 4))
      computerShip4.isPlaced = true
    } else {
      ship4Vertical()
    }
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
      winnerLeft.innerHTML = 'Computer sunk all your ships!'
      winnerRight.innerHTML = 'Try again?'
    } else if (computerShip1.isSunk === true && computerShip2.isSunk === true && computerShip3.isSunk === true && computerShip4.isSunk === true) {
      console.log('player won this time!')
      winnerLeft.innerHTML = 'YOU WON!!!'
      winnerRight.innerHTML = 'Play again?'
    } else {
      return
    }
  }

  // EVENTS
  /*
  clearBoard.addEventListener('click', () => {
    playerGridCells = []
    computerGridCells = []
    computerMissiles = []
    allComputerShips = []
    allShipsPlaced = false
    lastHit = ''
    winnerLeft.innerHTML = 'YOUR MAP'
    winnerRight.innerHTML = 'RADAR'
    playerShip1.location.forEach(l => {
      playerGridCells[l].classList.remove('hit')
      playerGridCells[l].classList.remove('sunk')
      playerGridCells[l].classList.remove('miss')
    })
    playerShip2.location.forEach(l => {
      playerGridCells[l].classList.remove('hit')
      playerGridCells[l].classList.remove('sunk')
      playerGridCells[l].classList.remove('miss')
    })
    playerShip3.location.forEach(l => {
      playerGridCells[l].classList.remove('hit')
      playerGridCells[l].classList.remove('sunk')
      playerGridCells[l].classList.remove('miss')
    })
    playerShip4.location.forEach(l => {
      playerGridCells[l].classList.remove('hit')
      playerGridCells[l].classList.remove('sunk')
      playerGridCells[l].classList.remove('miss')
    })
    computerShip1.location.forEach(l => {
      computerGridCells[l].classList.remove('hit')
      computerGridCells[l].classList.remove('sunk')
      computerGridCells[l].classList.remove('miss')
    })
    computerShip2.location.forEach(l => {
      computerGridCells[l].classList.remove('hit')
      computerGridCells[l].classList.remove('sunk')
      computerGridCells[l].classList.remove('miss')
    })
    computerShip3.location.forEach(l => {
      computerGridCells[l].classList.remove('hit')
      computerGridCells[l].classList.remove('sunk')
      computerGridCells[l].classList.remove('miss')
    })
    computerShip4.location.forEach(l => {
      computerGridCells[l].classList.remove('hit')
      computerGridCells[l].classList.remove('sunk')
      computerGridCells[l].classList.remove('miss')
    })
    playerShip1.location = []
    playerShip1.isSunk = false
    playerShip2.location = []
    playerShip2.isSunk = false
    playerShip3.location = []
    playerShip3.isSunk = false
    playerShip4.location = []
    playerShip4.isSunk = false
    computerShip1.location = []
    computerShip1.isPlaced = false
    computerShip1.isSunk = false
    computerShip2.location = []
    computerShip2.isPlaced = false
    computerShip2.isSunk = false
    computerShip3.location = []
    computerShip3.isPlaced = false
    computerShip3.isSunk = false
    computerShip4.location = []
    computerShip4.isPlaced = false
    computerShip4.isSunk = false
    if (!computerShip4.isPlaced) {
      makeShip4()
      makeShip3()
      makeShip2()
      makeShip1()
    }
  }) 
  */

  clearBoard.addEventListener('click', () => {
    window.location.reload()
  })

  window.addEventListener('load', () => {
    header.classList.add('fadeInDown')
  })

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 120) {
      instructions.classList.add('fadeOutUp')
    } else {
      instructions.classList.remove('fadeOutUp')
    }
  })

}
window.addEventListener('DOMContentLoaded', init)