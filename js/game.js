'use strict'

// const WALL = '&#8251;'
// const FOOD = '&middot;'
// const SUPERFOOD = '&#169;'
// const EMPTY = ' '

const FLAG_IMG = '<img src="img/flag.png" alt="mine">'
const BOMB_IMG = '<img src="img/bomb.png" alt="bomb">'

var gTimerInterval
var gIntervalId

const gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 2
}

const gLevel = {
    SIZE: 4,
    MINES: 2
}


var gFirstclick
var gBoard


function onInit() {

    console.log('hello')
    const elSmiley = document.querySelector('.smiley')
    elSmiley.src = 'img/normal.png'

    zeroGlobalStats()
    renderLives()


    console.log("CHANGED SMILEY")
    const elModal = document.querySelector(".modal")
    elModal.style.display = 'none'
    // const elWin = document.querySelector(".win")
    // elWin.style.display = 'none'

    gFirstclick = true

    gGame.score = 0
    console.log("updateing lives to 2!!!!")
    gGame.lives = 2
    renderLives()

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

    // while (loopCounter < gLevel.MINES) {
    //     var idxI = getRandomIntInclusive(0, board.length - 1)
    //     var idxJ = getRandomIntInclusive(0, board[0].length - 1)
    //     const currCell = board[idxI][idxJ]
    //     if (currCell.isMine || idxI === i && idxJ === j) continue
    //     currCell.isMine = true
    //     loopCounter++
    // }

    board[1][1].isMine = true
    board[2][3].isMine = true
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

function expandReveal(board, idxI, idxJ) {
    for (let i = idxI - 1; i <= idxI + 1; i++) {
        // skip if out of board
        if (i < 0 || i >= board.length) continue

        for (let j = idxJ - 1; j <= idxJ + 1; j++) {
            // skip if out of board
            if (j < 0 || j >= board[i].length) continue
            // skip if the same cell
            if (i === idxI && j === idxJ) continue

            const currCell = board[i][j]

            //If cell alreay revealed or is marked continues
            if (currCell.isRevealed || currCell.isMarked || currCell.isMine) continue
            currCell.isRevealed = true
            gGame.revealedCount++

            const elCurrCell = document.querySelector(`.cell-${i}-${j} span`)
            elCurrCell.innerText = (currCell.minesAroundCount === 0 ? '0' : currCell.minesAroundCount)

            if (currCell.minesAroundCount === 0) {
                expandReveal(board, i, j)
            }


            // var strHTML = ''
            // strHTML += `${(currCell.isMine) ? BOMB_IMG : currCell.minesAroundCount} `
            // elCurrCell.innerHTML = strHTML


        }
    }

}

function createCell() {
    var cell = {}
    cell.minesAroundCount = 0
    cell.isRevealed = false
    cell.isMine = false
    cell.isMarked = false

    return cell
}


function checkGameOver() {
    // for (var i = 0; i < gLevel.SIZE; i++) {
    //     for (var j = 0; j < gLevel.SIZE; j++) {
    //         const currCell = gBoard[i][j]
    //         if (!currCell.isMine && !currCell.isRevealed) {
    //             return false
    //         }
    //     }
    // }
    if (gGame.revealedCount + gGame.markedCount === gLevel.SIZE ** 2) return true

}

function GameOver(isWin) {
    const elSmiley = document.querySelector('.smiley')
    if (isWin) {
        elSmiley.src = 'img/happy.png'
        console.log("CHANGED SMILEY")
        gGame.isOn = false

    }
    else {

        elSmiley.src = 'img/sad.png'
        console.log("CHANGED SMILEY")
        gGame.isOn = false
    }
    clearInterval(gIntervalId)
}

function renderLives() {
    const elLives = document.querySelector('.lives span')
    // const strHTML='fsdafgsd'
    elLives.innerText = gGame.lives
}

function zeroGlobalStats() {
    gGame.markedCount = 0
    gGame.revealedCount = 0
    gGame.secsPassed = 0
}

function startTimer() {
    const elTimer = document.querySelector('.timer')
    const startTime = Date.now()

    gIntervalId = setInterval(() => {
        const timeDiff = Date.now() - startTime
        const timePassed = getFormatedTimePassed(timeDiff)
        elTimer.innerText = timePassed
    }, 37)
}


