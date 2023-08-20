const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");


let pause = true;
let start = false;

let seconds = 0;
let minutes = 0;
let hours = 0;

/**
 * disableButton
 *
 * @param button
 */
function disableButton(button) {
    button.classList.add('disabled');
    button.setAttribute('disabled', 'true');
}

/**
 * activateButton
 *
 * @param button
 */
function activateButton(button) {
    button.classList.remove('disabled');
    button.removeAttribute('disabled');
}

/**
 * startTimer
 */
function startTimer(){
    disableButton(startButton);

    activateButton(pauseButton);

    if(!start) {
        activateButton(stopButton)
        start = true;
    }

    pause = false;
}

/**
 * pauseTimer
 */
function pauseTimer() {
    activateButton(startButton);

    disableButton(pauseButton);

    pause = true;
}

/**
 * resetTimer
 */
function stopTimer() {
    timer.innerText = "00:00:00";

    seconds = 0;
    minutes = 0;
    hours = 0;

    disableButton(pauseButton);
    disableButton(stopButton);

    activateButton(startButton);

    pause = true;
    start = false;
}

/**
 * countTimer
 */
function countTimer() {
    if (pause) {
        return;
    }

    if (seconds + 1 === 60) {
        seconds = 0;
        if (minutes + 1 === 60) {
            minutes = 0;
            hours++;
        } else {
            minutes++;
        }
    } else {
        seconds++;
    }

    let strHours = hours.toString();
    strHours = strHours.length === 2 ? strHours : '0' + strHours;

    let strMinutes = minutes.toString();
    strMinutes = strMinutes.length === 2 ? strMinutes : '0' + strMinutes;

    let strSeconds = seconds.toString();
    strSeconds = strSeconds.length === 2 ? strSeconds : '0' + strSeconds;

    timer.innerText = strHours + ":" + strMinutes + ":" + strSeconds;
}

setInterval(countTimer, 1000);