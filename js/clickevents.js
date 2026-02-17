'use strict'

// const WALL = '&#8251;'
// const FOOD = '&middot;'
// const SUPERFOOD = '&#169;'
// const EMPTY = ' '

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return

    //console.log ("I: " + i + " J: " +j +" \n is clicked")
    const currCell = gBoard[i][j]
    if (currCell.isRevealed || currCell.isMarked) return

    if (gFirstclick) {
        placeMines(gBoard, i, j)

        handleTime()
    }
     gGame.revealedCount++
        currCell.isRevealed = true
    if (currCell.minesAroundCount === 0) {

        expandReveal(gBoard, i, j)

    }
    // else {
       
    // }
    if (currCell.isMine) {
        console.log("MIIIIIIIIIINE")
        gGame.lives--
        renderLives()
        if (gGame.lives === 0) GameOver()

    }

    
    var strHTML = ''
    strHTML += `${(currCell.isMine) ? BOMB_IMG : currCell.minesAroundCount} `
    elCell.innerHTML = strHTML

    console.log("MARKED COUNT: " + gGame.markedCount + "REVEALED COUNT: " + gGame.revealedCount)

    if (gGame.markedCount + gGame.revealedCount === (gLevel.SIZE * gLevel.SIZE)) {
        console.log("I CHECK GAME OVER")
        if (checkGameOver()) console.log("WIN")
        else console.log("LOST")
    }


    //renderBoard(gBoard, '.board-container')
}



function onCellMarked(event, elCell, i, j) {
    if (!gGame.isOn) return

    console.log("RIGGGHT CLICK")
    event.preventDefault()

    const currCell = gBoard[i][j]
    if (currCell.isRevealed) return

    const elSpan = elCell.querySelector('span')

    if (!currCell.isMarked) {
        var strHTML = ''
        strHTML += `${FLAG_IMG}`

        elSpan.innerHTML = strHTML

        gGame.markedCount++
        currCell.isMarked = true
    }

    else {
        elSpan.innerHTML = ''
        currCell.isMarked = false
        gGame.markedCount--
    }

    checkGameOver()
}