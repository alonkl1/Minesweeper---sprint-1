'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            strHTML += `<td 
            class="${className}" 
            onclick="onCellClicked(${i},${j})">
            <span></span>
             </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function onCellClicked(i, j){
    //console.log ("I: " + i + " J: " +j +" \n is clicked")
    const currCell=gBoard[i][j]
    const elCell=document.querySelector(`.cell-${i}-${j} span`)

    var strHTML=''
    strHTML+=`${(currCell.isMine) ? '💣' :currCell.minesAroundCount} `
    elCell.innerText=strHTML
}

// pos is an object like this - { i: 2, j: 7 }
function renderCell(pos, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${pos.i}-${pos.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomHexColor() {
  // Generate a random number between 0 and 16777215 (FFFFFF in hex).
  // Convert it to a hexadecimal string.
  let color = Math.floor(Math.random() * 16777215).toString(16);

  // Pad the string with leading zeros if it's less than 6 characters long
  // to ensure a valid 6-digit hex code.
  return "#" + color.padStart(6, '0');
}