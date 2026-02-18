'use strict'

// const WALL = '&#8251;'
// const FOOD = '&middot;'
// const SUPERFOOD = '&#169;'
// const EMPTY = ' '

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return

    console.log("I: " + i + " J: " + j + " \n is clicked")
    const currCell = gBoard[i][j]
    if (currCell.isRevealed || currCell.isMarked) return

    if (gFirstclick) {
        placeMines(gBoard, i, j)
        startTimer()
        //handleTime()
    }
    gGame.revealedCount++
    currCell.isRevealed = true

    var strHTML = ''

    if (currCell.isMine) {
        console.log("MIIIIIIIIIINE")
        gGame.lives--
        renderLives()
        if (gGame.lives === 0) gameOver(false)
        strHTML += EXPLODED_IMG
        elCell.innerHTML = strHTML
    }

    else if (currCell.minesAroundCount === 0) {
        
        elCell.classList.add('revealed')
        expandReveal(gBoard, i, j)
    }

    else{
        strHTML += currCell.minesAroundCount
        elCell.innerHTML = strHTML
    }

    console.log("MARKED COUNT: " + gGame.markedCount + "REVEALED COUNT: " + gGame.revealedCount)

    if (gGame.markedCount + gGame.revealedCount === (gLevel.SIZE * gLevel.SIZE)) {
        console.log("I CHECK GAME OVER")
        if (checkGameOver()) gameOver(true)
        else gameOver(false)
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