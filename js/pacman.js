'use strict'

const PACMAN = '😁'
var gPacman
var gSuperPower=false

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        pos: { i: 5, j: 5 },
        isSuper: false,
    }
    board[gPacman.pos.i][gPacman.pos.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    // TODO: use getNextPos(), nextCell
    const currPos = gPacman.pos
    const nextPos = getNextPos(ev)
    if (!nextPos) return

    const nextCell = gBoard[nextPos.i][nextPos.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return
    
    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gSuperPower){
            renderCell(currPos,PACMAN)
        } 
        else gameOver()
        return
    }
    
    // TODO: hitting food? call updateScore
    if (nextCell === FOOD){
        updateScore(1)
        gGame.foodCount--
        checkWin()
    } 

    if (nextCell === SUPERFOOD){
        updateScore(1)
        gGame.foodCount--
        checkWin()
        for (var i=0;i<gGhosts.length;i++){
            gGhosts[i].color='blue'
        }
        gSuperPower=true
        console.log("SUPERFOOODDDDD")
        setTimeout(()=> {gSuperPower=false},5000)
    } 


    // TODO: moving from current pos:
    // TODO: update the model
    gBoard[currPos.i][currPos.j] = EMPTY

    // TODO: update the DOM
    renderCell(currPos, EMPTY)
    
    // TODO: Move the pacman to new pos:
    // TODO: update the model
    gPacman.pos = nextPos
    gBoard[gPacman.pos.i][gPacman.pos.j] = PACMAN
    
    // TODO: update the DOM
    renderCell(gPacman.pos, PACMAN)
}

function getNextPos(ev) {
    var nextPos = { i: gPacman.pos.i, j: gPacman.pos.j }
    // TODO: figure out nextPos
    switch (ev.key) {
        case 'ArrowUp':
            nextPos.i--
            break;
    
        case 'ArrowDown':
            nextPos.i++
            break;
    
        case 'ArrowLeft':
            nextPos.j--
            break;
    
        case 'ArrowRight':
            nextPos.j++
            break;

        default:
            return null
    }
    return nextPos
}