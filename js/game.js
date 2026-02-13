'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const SUPERFOOD = '&#169;'
const EMPTY = ' '

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 0
}
var gBoard

function init() {
    console.log('hello')

    const elModal = document.querySelector(".modal ")
    elModal.style.display = 'none'
    const elWin = document.querySelector(".win ")
    elWin.style.display = 'none'

    gGame.score = 0



    gBoard = buildBoard()

    updateScore(0)

    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }

            else if (i === 1 && j === 1 ||
                i === 1 && j === size - 2 ||
                i === size - 2 && j === 1 ||
                i === size - 2 && j === size - 2)
                board[i][j] = SUPERFOOD

            else {
                gGame.foodCount++
            }
        }
    }
    gGame.foodCount--
    return board
}

function updateScore(diff) {
    // update model
    gGame.score += diff

    // update DOM
    const elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score

    //reduce food count

}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false

    clearInterval(gGhostsInterval)

    const elModal = document.querySelector(".modal ")
    elModal.style.display = 'block'
}

function checkWin() {
    if (gGame.foodCount <= 0) {
        handleWin()
    }
    console.log("CHECK WIN RUNNING, gCOUNTER is: " + gGame.foodCount)
}

function handleWin() {
    console.log('WINNER')
    gGame.isOn = false

    clearInterval(gGhostsInterval)

    const elModal = document.querySelector(".win")
    elModal.style.display = 'block'
}