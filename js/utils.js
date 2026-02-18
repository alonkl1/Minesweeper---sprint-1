'use strict'


function renderBoard(mat, selector) {

    var strHTML = '<img src="img/Pirateship.png" alt="" class="ship"><table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr> '
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            strHTML += `<td 
            class="${className}" 
            onclick="onCellClicked(this,${i},${j})"
            oncontextmenu="onCellMarked(event,this, ${i}, ${j})">
            <span></span>
             </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
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

function handleTime(){
    gTimerInterval = setInterval(()=> {
        gGame.secsPassed++; 
        
        const elTimer = document.querySelector('.timer span');
        elTimer.innerText = gGame.secsPassed; 
        
    }, 1000); 
}

function getFormatedTimePassed(timeDiff) {
	const seconds = Math.floor(timeDiff / 1000)
	const milliSeconds = (timeDiff - seconds * 1000 + '').padStart(3, '0')

	return `${(seconds + '').padStart(2, '0')}:${milliSeconds}`
}

