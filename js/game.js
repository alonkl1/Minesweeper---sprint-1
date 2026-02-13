'use strict'

// const WALL = '&#8251;'
// const FOOD = '&middot;'
// const SUPERFOOD = '&#169;'
// const EMPTY = ' '

const MINE_IMG='<img src="img/flag.png" alt="mine">'
const BOMB_IMG='<img src="img/bomb.png" alt="bomb">'

const gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0
}

const gLevel = {
    SIZE: 4,
    MINES: 2
}


var gFirstclick
var gBoard


function onInit() {

    console.log('hello')

    const elModal = document.querySelector(".modal")
    elModal.style.display = 'none'
    // const elWin = document.querySelector(".win")
    // elWin.style.display = 'none'

    gFirstclick = true

    gGame.score = 0

    gBoard = buildBoard()
    console.table(gBoard)


    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = gLevel.SIZE
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()
        }
    }
    // var i = 0
    // while (i < gLevel.MINES) {
    //     var idxI = getRandomIntInclusive(0, board.length - 1)
    //     var idxJ = getRandomIntInclusive(0, board[0].length - 1)
    //     const currCell = board[idxI][idxJ]
    //     if (currCell.isMine) continue
    //     currCell.isMine = true
    //     i++
    // }

    // setMinesNegsCount(board)


    return board
}

function placeMines(board, i, j) {

    var loopCounter = 0

    while (loopCounter < gLevel.MINES) {
        var idxI = getRandomIntInclusive(0, board.length - 1)
        var idxJ = getRandomIntInclusive(0, board[0].length - 1)
        const currCell = board[idxI][idxJ]
        if (currCell.isMine || idxI === i && idxJ === j) continue
        currCell.isMine = true
        loopCounter++
    }

    // board[1][1].isMine=true
    // board[2][3].isMine=true
    gFirstclick = false
    setMinesNegsCount(board)



}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            const currCell = board[i][j]

            if (currCell.isMine) continue

            currCell.minesAroundCount = countMinesAround(board, i, j)
        }
    }
}

function countMinesAround(board, idxI, idxJ) {
    var count = 0
    for (var i = idxI - 1; i <= idxI + 1; i++) {

        if (i < 0 || i >= board.length) continue

        for (var j = idxJ - 1; j <= idxJ + 1; j++) {

            if (j < 0 || j >= board[i].length) continue

            if (i === idxI && j === idxJ) continue

            if (board[i][j].isMine) count++
        }
    }
    return count
}

function expandReveal(board, elCell, idxI, idxJ) {
    for (var i = idxI - 1; i <= idxI + 1; i++) {

        if (i < 0 || i >= board.length) continue

        for (var j = idxJ - 1; j <= idxJ + 1; j++) {

            if (j < 0 || j >= board[i].length) continue

            if (i === idxI && j === idxJ) continue

            const currCell = board[i][j]
            //If cell alreay revealed continues
            if (currCell.isRevealed) continue

            const elCurrCell = document.querySelector(`.cell-${i}-${j}`)
            currCell.isRevealed = true
            gGame.revealedCount++
            var strHTML = ''
            strHTML += `${(currCell.isMine) ? BOMB_IMG : currCell.minesAroundCount} `
            elCurrCell.innerHTML = strHTML

        }
    }

}

function checkGameOver(){
    
}

function createCell() {
    var cell = {}
    cell.minesAroundCount = 4
    cell.isRevealed = false
    cell.isMine = false
    cell.isMarked = false

    return cell
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

function checkGameOver() {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            currCell=gBoard[i][j]
            if (currCell.isMarked){
                if (!currCell.isMine) 
                    return false
            }
        }
    }
    return true
}

function checkGameOver() {

}